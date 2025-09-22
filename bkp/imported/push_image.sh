#!/bin/bash

# Exit on any error
set -e

# Configuration
ACCOUNT_ID="509399609859"
AWS_REGION="us-east-1"
IMAGE_NAME="oriane-app-bun"
ECR_REPO="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_NAME}"
ROLE="OrianeCollector"

# Colors for output (only if terminal supports it)
if [ -t 1 ]; then
  GREEN='\033[0;32m'
  YELLOW='\033[1;33m'
  NC='\033[0m' # No Color
else
  GREEN=''
  YELLOW=''
  NC=''
fi

# Cleanup function
cleanup() {
  echo -e "${YELLOW}Cleaning up temporary files...${NC}"
  rm -f "${IMAGE_NAME}.tar"
  echo -e "${GREEN}Cleanup complete${NC}"
}

echo -e "${YELLOW}Starting deployment process...${NC}"

# Create ECR repository if it doesn't exist
if ! aws ecr describe-repositories --repository-names "${IMAGE_NAME}" 2>/dev/null; then
  echo -e "${YELLOW}Creating ECR repository...${NC}"
  aws ecr create-repository --repository-name "${IMAGE_NAME}"
fi

# Authenticate Docker to ECR
echo -e "${YELLOW}Authenticating with ECR...${NC}"
aws ecr get-login-password --region "${AWS_REGION}" | docker login --username AWS --password-stdin "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

# Force Docker to build in the right AWS ECR format
export DOCKER_BUILDKIT=0
export DOCKER_CLI_EXPERIMENTAL=enabled

# Build Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
if ! docker build --platform linux/amd64 --tag "${IMAGE_NAME}" .; then
  echo "Error: Docker build failed"
  exit 1
fi

# Save Docker image to tar file
echo -e "${YELLOW}Saving Docker image to tar file...${NC}"
if ! docker save -o "${IMAGE_NAME}.tar" "${IMAGE_NAME}:latest"; then
  echo "Error: Failed to save Docker image"
  exit 1
fi

# Remove local Docker image to ensure a clean load
echo -e "${YELLOW}Removing local Docker image...${NC}"
docker rmi "${IMAGE_NAME}:latest" || true

# Load Docker image from tar file
echo -e "${YELLOW}Loading Docker image from tar file...${NC}"
if ! docker load -i "${IMAGE_NAME}.tar"; then
  echo "Error: Failed to load Docker image"
  exit 1
fi

# Tag and push image to ECR
echo -e "${YELLOW}Tagging and pushing image to ECR...${NC}"
echo -e "${YELLOW}Source image: ${IMAGE_NAME}:latest${NC}"
echo -e "${YELLOW}Target image: ${ECR_REPO}:latest${NC}"

# Ensure the source image exists
if ! docker image inspect "${IMAGE_NAME}:latest" >/dev/null 2>&1; then
  echo "Error: Source image ${IMAGE_NAME}:latest does not exist"
  exit 1
fi

# Remove any existing tags for the target image
docker rmi "${ECR_REPO}:latest" 2>/dev/null || true

# Tag the image
if ! docker tag "${IMAGE_NAME}:latest" "${ECR_REPO}:latest"; then
  echo "Error: Failed to tag image"
  exit 1
fi

# Push with timeout (use `timeout` if available)
echo -e "${YELLOW}Pushing image to ECR (this may take a few minutes)...${NC}"
if command -v timeout &>/dev/null; then
  timeout 3000 docker push "${ECR_REPO}:latest"
  status=$?
  if [ $status -eq 124 ]; then
    echo "Error: Docker push timed out after 50 minutes"
    exit 1
  elif [ $status -ne 0 ]; then
    echo "Error: Failed to push image to ECR"
    exit $status
  fi
else
  echo -e "${YELLOW}Warning: 'timeout' command not found. Proceeding without timeout...${NC}"
  if ! docker push "${ECR_REPO}:latest"; then
    echo "Error: Failed to push image to ECR"
    exit 1
  fi
fi

# Clean up temporary files
cleanup

echo -e "${GREEN}Image deployment completed successfully!${NC}"
