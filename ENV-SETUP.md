# Environment Configuration Guide

## 📁 Environment Files

| File | Purpose | Git Tracked |
|------|---------|-------------|
| `.env.local` | Local development | ✅ Yes (template) |
| `.env.production` | Production server | ✅ Yes (template) |
| `.env` | Active config | ❌ No (gitignored) |

## 🔄 Switching Environments

### **Production (Current)**
```bash
cd /home/ubuntu/mlai-hackathon
./scripts/switch-env.sh production
```

### **Local Development**
```bash
cd /home/ubuntu/mlai-hackathon
./scripts/switch-env.sh local
```

## 🌐 Environment Differences

### **Production**
- **Domain:** https://esafety.projects.hitl.cloud
- **n8n:** https://n8n.esafety.projects.hitl.cloud
- **Debug:** OFF
- **Cache:** ON
- **Logs:** INFO level

### **Local**
- **Domain:** http://localhost:8080
- **n8n:** http://mlai-n8n:5678
- **Debug:** ON
- **Cache:** OFF
- **Logs:** DEBUG level

## 🔧 Configuration Values

### **Pixelfed URLs**
```env
# Production
APP_URL="https://esafety.projects.hitl.cloud"
APP_DOMAIN="esafety.projects.hitl.cloud"

# Local
APP_URL="http://localhost:8080"
APP_DOMAIN="localhost:8080"
```

### **n8n Integration**
```env
# Production
N8N_WEBHOOK_URL="https://n8n.esafety.projects.hitl.cloud/webhook/new-post"
N8N_API_URL="https://n8n.esafety.projects.hitl.cloud/api/v1"

# Local
N8N_WEBHOOK_URL="http://mlai-n8n:5678/webhook/new-post"
N8N_API_URL="http://mlai-n8n:5678/api/v1"
```

## 📝 Usage in Code

```php
// Get n8n webhook URL
$webhookUrl = config('services.n8n.webhook_url');

// Send webhook
use Illuminate\Support\Facades\Http;

Http::post(config('services.n8n.webhook_url'), [
    'post_id' => $status->id,
    'user_id' => $status->profile_id,
    'image_url' => $status->firstMedia()?->url,
    'caption' => $status->caption
]);
```

## 🚨 Important Notes

1. **Never commit `.env`** - It's gitignored
2. **Always use templates** - Edit `.env.local` or `.env.production`
3. **Switch before testing** - Use the script to ensure consistency
4. **Verify after switch** - Check the output to confirm URLs

## 🔍 Verify Current Environment

```bash
docker exec mlai-pixelfed php artisan tinker --execute="
echo 'Environment: ' . config('app.env') . PHP_EOL;
echo 'APP_URL: ' . config('app.url') . PHP_EOL;
echo 'N8N_WEBHOOK: ' . config('services.n8n.webhook_url') . PHP_EOL;
echo 'Debug: ' . (config('app.debug') ? 'ON' : 'OFF') . PHP_EOL;
"
```

## 🎯 Setup for New Developers

1. **Clone repo**
2. **Choose environment:**
   ```bash
   ./scripts/switch-env.sh local  # or production
   ```
3. **Start containers:**
   ```bash
   docker compose up -d
   ```
4. **Verify:**
   ```bash
   docker exec mlai-pixelfed php artisan config:cache
   ```
