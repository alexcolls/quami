#!/bin/bash
set -e

echo "==> Starting Render build process..."

# Clean everything to fix npm optional deps bug
echo "==> Cleaning node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

# Install dependencies with force to ensure optional deps are properly installed
echo "==> Installing dependencies (with force)..."
npm install --force --include=optional

# Verify oxc-parser binding is installed
echo "==> Verifying oxc-parser binding..."
if [ ! -f "node_modules/@oxc-parser/binding-linux-x64-gnu/parser.linux-x64-gnu.node" ]; then
  echo "==> oxc-parser binding not found, reinstalling..."
  npm install --force @oxc-parser/binding-linux-x64-gnu
fi

# Rebuild native bindings for the Linux platform
echo "==> Rebuilding native bindings for Linux platform..."
npm rebuild sharp @oxc-parser/binding-linux-x64-gnu @oxc-transform/binding-linux-x64-gnu --force

# Build the application
echo "==> Building application..."
npm run build

echo "==> Build completed successfully!"
