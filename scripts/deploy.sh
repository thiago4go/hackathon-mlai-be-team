#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /home/ubuntu/mlai-hackathon

# Pull latest changes
echo "📥 Pulling latest changes from main..."
git pull origin main

# Rebuild and restart containers
echo "🔨 Rebuilding containers..."
docker compose build

echo "🔄 Restarting containers..."
docker compose up -d

# Wait for containers to be healthy
echo "⏳ Waiting for containers to start..."
sleep 10

# Reconnect to proxy network (if needed)
echo "🔗 Ensuring proxy network connections..."
docker network connect proxy mlai-pixelfed 2>/dev/null || true
docker network connect proxy mlai-n8n 2>/dev/null || true
docker network connect proxy mlai-frontend 2>/dev/null || true

# Clear Pixelfed cache
echo "🧹 Clearing Pixelfed cache..."
docker exec mlai-pixelfed php artisan config:cache 2>/dev/null || true
docker exec mlai-pixelfed php artisan cache:clear 2>/dev/null || true

# Show status
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Container Status:"
docker ps --filter "name=mlai" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "🌐 Services:"
echo "  - Pixelfed: https://app.digitaldriverlicence.com"
echo "  - n8n: https://n8n.digitaldriverlicence.com"
echo "  - Website: https://digitaldriverlicence.com"
