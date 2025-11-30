#!/bin/bash
# Switch between local and production environments

ENV=$1

if [ -z "$ENV" ]; then
    echo "Usage: ./scripts/switch-env.sh [local|production]"
    exit 1
fi

if [ "$ENV" != "local" ] && [ "$ENV" != "production" ]; then
    echo "Error: Environment must be 'local' or 'production'"
    exit 1
fi

echo "Switching to $ENV environment..."

# Copy environment file
cp digital-drive-license/.env.$ENV digital-drive-license/.env

# Restart Pixelfed
docker compose restart pixelfed

# Clear cache
sleep 5
docker exec mlai-pixelfed php artisan config:cache
docker exec mlai-pixelfed php artisan cache:clear

echo "✅ Switched to $ENV environment"
echo "📝 Active config:"
docker exec mlai-pixelfed php artisan tinker --execute="echo 'APP_URL: ' . config('app.url') . PHP_EOL; echo 'N8N_WEBHOOK: ' . config('services.n8n.webhook_url', 'Not set');"
