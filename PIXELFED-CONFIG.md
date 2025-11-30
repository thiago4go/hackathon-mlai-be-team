# Pixelfed Configuration Guide

## Media Upload Fix

### Issue
Media upload was failing with HTTP 500 error due to S3 configuration.

### Solution
Change filesystem configuration in `digital-drive-license/.env`:

```env
# Before (causes error):
FILESYSTEM_CLOUD="s3"

# After (working):
FILESYSTEM_CLOUD="local"
```

### Steps to Apply

1. Edit `.env` file:
```bash
cd digital-drive-license
nano .env
```

2. Find and change:
```env
PF_ENABLE_CLOUD="false"
FILESYSTEM_CLOUD="local"  # Change from "s3" to "local"
```

3. Restart Pixelfed:
```bash
docker restart mlai-pixelfed
docker exec mlai-pixelfed php artisan config:clear
docker exec mlai-pixelfed php artisan cache:clear
```

### Verification

Test media upload:
1. Login to Pixelfed
2. Click "New" post
3. Upload an image
4. Should work without 500 error

---

## Other Important Settings

### Storage Permissions
```bash
docker exec mlai-pixelfed chown -R www-data:www-data /var/www/html/storage
docker exec mlai-pixelfed chmod -R 775 /var/www/html/storage
```

### N8N Webhook
```env
N8N_WEBHOOK_URL="http://mlai-n8n:5678/webhook/chore-webhook"
```

---

## Environment Variables Reference

### Required for MVP
- `FILESYSTEM_CLOUD="local"` - Use local storage
- `PF_ENABLE_CLOUD="false"` - Disable cloud storage
- `N8N_WEBHOOK_URL` - Webhook endpoint for AI agent

### Database
- `DB_HOST="mlai-postgres"`
- `DB_DATABASE="pixelfed"`
- `DB_USERNAME="postgres"`
- `DB_PASSWORD="hackathon2025"`

### Redis
- `REDIS_HOST="mlai-redis"`
- `REDIS_PORT="6379"`
