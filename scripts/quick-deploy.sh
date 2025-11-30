#!/bin/bash
# Quick deploy - only rebuild changed services

set -e

echo "⚡ Quick deployment..."

cd /home/ubuntu/mlai-hackathon

# Pull latest
git pull origin main

# Check what changed
CHANGED_FILES=$(git diff HEAD@{1} --name-only)

# Determine what to rebuild
REBUILD_PIXELFED=false
REBUILD_FRONTEND=false

if echo "$CHANGED_FILES" | grep -q "digital-drive-license/"; then
    REBUILD_PIXELFED=true
fi

if echo "$CHANGED_FILES" | grep -q "website/safety-lane-ui/"; then
    REBUILD_FRONTEND=true
fi

# Rebuild only what changed
if [ "$REBUILD_PIXELFED" = true ]; then
    echo "🔨 Rebuilding Pixelfed..."
    docker compose build pixelfed
    docker compose up -d pixelfed
    docker network connect proxy mlai-pixelfed 2>/dev/null || true
    docker exec mlai-pixelfed php artisan config:cache
fi

if [ "$REBUILD_FRONTEND" = true ]; then
    echo "🔨 Rebuilding Frontend..."
    docker compose build frontend
    docker compose up -d frontend
    docker network connect proxy mlai-frontend 2>/dev/null || true
fi

if [ "$REBUILD_PIXELFED" = false ] && [ "$REBUILD_FRONTEND" = false ]; then
    echo "ℹ️  No changes detected in Pixelfed or Frontend"
    echo "   Running full deploy instead..."
    ./scripts/deploy.sh
    exit 0
fi

echo "✅ Quick deploy complete!"
docker ps --filter "name=mlai" --format "table {{.Names}}\t{{.Status}}"
