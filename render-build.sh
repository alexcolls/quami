#!/bin/bash
set -e

# Clean and install dependencies (fix npm optional deps bug)
echo "==> Cleaning node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "==> Installing dependencies (skipping postinstall)..."
npm install --ignore-scripts --legacy-peer-deps

# Reinstall to get optional deps properly
echo "==> Reinstalling to fix optional dependencies..."
npm install --legacy-peer-deps

# Run nuxt prepare manually
echo "==> Preparing Nuxt..."
npx nuxt prepare

# Build the application
echo "==> Building application..."
npm run build
