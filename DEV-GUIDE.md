# Development Guide - Digital Driver's License

## 🚀 Quick Development Workflow

### Method 1: Direct Server Development (Recommended for Hackathon)

**1. Edit files directly on server:**
```bash
cd /home/ubuntu/mlai-hackathon/digital-drive-license
# Edit any file (Controllers, Models, Views, etc.)
```

**2. Apply changes without rebuild:**
```bash
# For PHP/Laravel changes (Controllers, Models, Routes)
docker exec mlai-pixelfed php artisan config:clear
docker exec mlai-pixelfed php artisan cache:clear
docker exec mlai-pixelfed php artisan route:clear

# For database changes
docker exec mlai-pixelfed php artisan migrate

# For view changes (Blade templates)
docker exec mlai-pixelfed php artisan view:clear
```

**3. Hot reload (no restart needed):**
- PHP files: Auto-reload on next request
- Blade views: Auto-reload on next request
- Config/Routes: Need cache clear (above)

**4. Full restart (if needed):**
```bash
cd /home/ubuntu/mlai-hackathon
docker compose restart pixelfed
```

---

### Method 2: Local Development → Git Push → Server Pull

**On your local machine:**
```bash
# 1. Clone repo
git clone git@github.com:thiago4go/hackathon-mlai-be-team.git
cd hackathon-mlai-be-team

# 2. Make changes
# Edit files in digital-drive-license/

# 3. Commit and push
git add .
git commit -m "feat: your changes"
git push
```

**On server:**
```bash
# 1. Pull changes
cd /home/ubuntu/mlai-hackathon
git pull

# 2. Rebuild if Dockerfile changed
docker compose build pixelfed
docker compose up -d pixelfed

# 3. Or just restart if only code changed
docker compose restart pixelfed
```

---

## 📁 Key Files to Edit

### **Backend (Laravel/PHP)**
```
digital-drive-license/
├── app/
│   ├── Http/Controllers/     # Add new endpoints
│   │   ├── Api/              # API controllers
│   │   └── ParentalControlsController.php  # Modify for MVP
│   ├── Models/               # Database models
│   └── Services/             # Business logic
├── routes/
│   ├── web.php               # Web routes
│   └── api.php               # API routes
├── database/
│   └── migrations/           # Database schema
└── config/
    └── pixelfed.php          # App config
```

### **Frontend (Blade/Vue)**
```
digital-drive-license/resources/
├── views/                    # Blade templates
│   ├── layouts/
│   │   └── app.blade.php     # Add gamification HUD here
│   └── settings/
│       └── parental-controls/ # Modify for MVP
└── assets/
    ├── js/components/        # Vue components
    └── sass/                 # Styles
```

---

## 🔧 Common Development Tasks

### **Add New Database Table (Gamification)**
```bash
# 1. Create migration
docker exec mlai-pixelfed php artisan make:migration create_user_gamification_table

# 2. Edit migration file
# digital-drive-license/database/migrations/YYYY_MM_DD_HHMMSS_create_user_gamification_table.php

# 3. Run migration
docker exec mlai-pixelfed php artisan migrate
```

### **Add New Controller**
```bash
# 1. Create controller
docker exec mlai-pixelfed php artisan make:controller GamificationController

# 2. Edit controller
# digital-drive-license/app/Http/Controllers/GamificationController.php

# 3. Add route
# digital-drive-license/routes/web.php or api.php
```

### **Add Webhook to n8n**
```php
// In StatusController.php (after post creation)
use Illuminate\Support\Facades\Http;

Http::post(config('services.n8n.webhook_url'), [
    'post_id' => $status->id,
    'user_id' => $status->profile_id,
    'image_url' => $status->firstMedia()?->url,
    'caption' => $status->caption
]);
```

---

## 🐛 Debugging

### **View Logs**
```bash
# Pixelfed logs
docker logs mlai-pixelfed -f

# Laravel logs
docker exec mlai-pixelfed tail -f storage/logs/laravel.log

# Nginx logs
docker exec mlai-pixelfed tail -f /var/log/nginx/error.log
```

### **Access Container Shell**
```bash
docker exec -it mlai-pixelfed bash
```

### **Run Artisan Commands**
```bash
docker exec mlai-pixelfed php artisan [command]

# Examples:
docker exec mlai-pixelfed php artisan route:list
docker exec mlai-pixelfed php artisan tinker
docker exec mlai-pixelfed php artisan queue:work
```

---

## 🔄 Quick Iteration Cycle

**For MVP Development (fastest):**

1. **Edit file on server** (via SSH or code-server)
2. **Clear cache** (if needed)
3. **Test immediately** at https://esafety.projects.hitl.cloud
4. **Commit when working**

**Example:**
```bash
# Edit controller
nano /home/ubuntu/mlai-hackathon/digital-drive-license/app/Http/Controllers/StatusController.php

# Clear cache
docker exec mlai-pixelfed php artisan cache:clear

# Test in browser
curl https://esafety.projects.hitl.cloud/api/v1/statuses

# Commit
cd /home/ubuntu/mlai-hackathon
git add .
git commit -m "feat: add webhook to n8n"
git push
```

---

## 🎯 MVP Development Priority

1. **Database migrations** (gamification tables)
2. **Webhook integration** (Pixelfed → n8n)
3. **UI modifications** (gamification HUD)
4. **n8n workflows** (AI agents)
5. **Testing** (end-to-end flow)

---

## 🚨 Important Notes

- **No rebuild needed** for most PHP/Blade changes
- **Rebuild needed** only if:
  - Dockerfile changes
  - Composer dependencies change
  - System packages change
- **Always test** after changes
- **Commit frequently** (every working feature)
- **Use branches** for experimental features

---

## 📚 Useful Commands

```bash
# Status
docker ps
docker logs mlai-pixelfed

# Restart
docker compose restart pixelfed

# Rebuild
docker compose build pixelfed
docker compose up -d pixelfed

# Database
docker exec mlai-pixelfed php artisan migrate
docker exec mlai-pixelfed php artisan db:seed

# Cache
docker exec mlai-pixelfed php artisan optimize:clear

# Git
git pull
git add .
git commit -m "message"
git push
```
