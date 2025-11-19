#!/bin/bash
set -e

# Ensure submodules are initialized and updated
echo "==> Initializing git submodules..."
git submodule update --init --recursive

# Clean and install dependencies
echo "==> Cleaning node_modules..."
rm -rf node_modules

echo "==> Installing dependencies..."
npm i --legacy-peer-deps

# Build the application
echo "==> Building application..."
npm run build
