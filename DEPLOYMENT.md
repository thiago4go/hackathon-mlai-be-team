# Deployment Guide

## 🚀 Quick Deploy Scripts

### Full Deployment (Rebuild Everything)
```bash
cd /home/ubuntu/mlai-hackathon
./scripts/deploy.sh
```

**What it does:**
1. Pulls latest from `main` branch
2. Rebuilds all containers
3. Restarts all services
4. Reconnects to proxy network
5. Clears Pixelfed cache
6. Shows status

**Use when:**
- Major changes
- First deployment
- Multiple services changed
- Docker config changed

---

### Quick Deploy (Smart Rebuild)
```bash
cd /home/ubuntu/mlai-hackathon
./scripts/quick-deploy.sh
```

**What it does:**
1. Pulls latest from `main` branch
2. Detects what changed
3. Rebuilds only changed services
4. Faster than full deploy

**Use when:**
- Only frontend changed
- Only Pixelfed changed
- Quick iterations

---

## 📋 Manual Deployment

### Frontend Only
```bash
cd /home/ubuntu/mlai-hackathon
git pull
docker compose build frontend
docker compose up -d frontend
docker network connect proxy mlai-frontend
```

### Pixelfed Only
```bash
cd /home/ubuntu/mlai-hackathon
git pull
docker compose build pixelfed
docker compose up -d pixelfed
docker network connect proxy mlai-pixelfed
docker exec mlai-pixelfed php artisan config:cache
```

### n8n (No rebuild needed usually)
```bash
docker compose restart n8n
```

---

## 🔍 Check Status

### View all containers
```bash
docker ps --filter "name=mlai"
```

### View logs
```bash
# All services
docker compose logs -f

# Specific service
docker logs mlai-frontend -f
docker logs mlai-pixelfed -f
docker logs mlai-n8n -f
```

### Check networks
```bash
docker network inspect proxy | grep -A 3 "mlai"
```

---

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker logs mlai-frontend --tail 50

# Restart
docker compose restart frontend
```

### Images not showing (Pixelfed)
```bash
# Recreate storage link
docker exec mlai-pixelfed php artisan storage:link

# Check permissions
docker exec mlai-pixelfed ls -la /var/www/html/storage/app/public/
```

### Cache issues (Pixelfed)
```bash
docker exec mlai-pixelfed php artisan config:clear
docker exec mlai-pixelfed php artisan cache:clear
docker exec mlai-pixelfed php artisan route:clear
docker exec mlai-pixelfed php artisan view:clear
```

### Network issues
```bash
# Reconnect to proxy
docker network connect proxy mlai-pixelfed
docker network connect proxy mlai-n8n
docker network connect proxy mlai-frontend
```

---

## 🔄 Rollback

### Rollback to previous commit
```bash
cd /home/ubuntu/mlai-hackathon
git log --oneline -5  # Find commit hash
git reset --hard <commit-hash>
./scripts/deploy.sh
```

### Rollback specific service
```bash
# Example: rollback frontend
cd /home/ubuntu/mlai-hackathon
git checkout HEAD~1 -- website/safety-lane-ui/
docker compose build frontend
docker compose up -d frontend
```

---

## 📊 Monitoring

### Check disk space
```bash
df -h
docker system df
```

### Check memory
```bash
free -h
docker stats --no-stream
```

### Check container health
```bash
docker inspect mlai-pixelfed | grep -A 5 "Health"
```

---

## 🔐 Security

### Update secrets
```bash
# Edit environment files
nano /home/ubuntu/mlai-hackathon/digital-drive-license/.env.production

# Apply changes
./scripts/deploy.sh
```

### Check exposed ports
```bash
docker ps --format "table {{.Names}}\t{{.Ports}}"
```

---

## 📝 Best Practices

1. **Always test locally first** (if possible)
2. **Use quick-deploy for iterations**
3. **Use full deploy for major changes**
4. **Check logs after deployment**
5. **Monitor for 5 minutes after deploy**
6. **Keep backups of .env files**
7. **Document any manual changes**

---

## 🆘 Emergency Procedures

### Complete restart
```bash
cd /home/ubuntu/mlai-hackathon
docker compose down
docker compose up -d
./scripts/deploy.sh
```

### Nuclear option (rebuild from scratch)
```bash
cd /home/ubuntu/mlai-hackathon
docker compose down -v  # WARNING: Deletes volumes!
git pull
docker compose build --no-cache
docker compose up -d
```

**⚠️ WARNING:** This will delete all data in volumes!
