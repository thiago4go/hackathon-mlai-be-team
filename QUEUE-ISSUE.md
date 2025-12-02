# Queue Configuration Issue

**Problem**: Automatic webhook trigger not working  
**Root Cause**: `QUEUE_DRIVER=redis` set in Docker environment variables  
**Status**: Identified but not fixed (requires docker-compose change)

---

## Investigation

### What We Found

1. ✅ NewStatusPipeline is dispatched correctly
2. ✅ Webhook service code is correct
3. ❌ Jobs are queued to Redis but not processed
4. ❌ QUEUE_DRIVER environment variable overrides .env file

### Evidence

```bash
# Check shows Redis is default
$ docker exec mlai-pixelfed php artisan config:show queue | grep default
default .............................................................. redis

# But .env has sync
$ docker exec mlai-pixelfed grep QUEUE /var/www/html/.env
QUEUE_CONNECTION=sync
QUEUE_DRIVER=sync

# Docker env overrides it
$ docker exec mlai-pixelfed env | grep QUEUE
QUEUE_DRIVER=redis
```

---

## Solution

### Option 1: Change docker-compose.yml (Recommended)
```yaml
pixelfed:
  environment:
    - QUEUE_DRIVER=sync
```

### Option 2: Use Manual Trigger (Current Workaround)
```bash
sudo docker exec mlai-pixelfed php artisan tinker --execute="
\$status = App\Status::latest()->first();
\App\Services\N8nWebhookService::notifyNewPost(\$status);
"
```

---

## Why Manual Trigger Works

The manual trigger bypasses the queue system entirely and calls the webhook service directly, which is why it has 100% success rate.

---

## Next Steps

1. Update docker-compose.yml with `QUEUE_DRIVER=sync`
2. Rebuild container: `docker compose up -d --build pixelfed`
3. Test automatic trigger

OR

Keep using manual trigger for demo (works perfectly)
