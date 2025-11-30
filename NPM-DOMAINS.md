# NPM Domain Configuration - Digital Driver's License

## 🌐 New Domains

### **Pixelfed (App)**
- **Domain:** `app.digitaldriverlicence.com`
- **Container:** `mlai-pixelfed`
- **Forward to:** `mlai-pixelfed:8080` or `172.18.0.17:8080`
- **SSL:** Let's Encrypt
- **Force SSL:** Yes

### **n8n (Workflows)**
- **Domain:** `n8n.digitaldriverlicence.com`
- **Container:** `mlai-n8n`
- **Forward to:** `mlai-n8n:5678` or `172.18.0.18:5678`
- **SSL:** Let's Encrypt
- **Force SSL:** Yes

### **Website (Marketing)**
- **Domain:** `digitaldriverlicence.com` or `www.digitaldriverlicence.com`
- **Container:** `mlai-frontend`
- **Forward to:** `mlai-frontend:80` or `172.18.0.19:80`
- **SSL:** Let's Encrypt
- **Force SSL:** Yes

## 📝 NPM Configuration Steps

### 1. Pixelfed App
```
Domain Names: app.digitaldriverlicence.com
Scheme: http
Forward Hostname/IP: mlai-pixelfed
Forward Port: 8080
Cache Assets: Yes
Block Common Exploits: Yes
Websockets Support: Yes

SSL:
☑ Force SSL
☑ HTTP/2 Support
☑ HSTS Enabled
SSL Certificate: Request New (Let's Encrypt)
Email: your@email.com
```

### 2. n8n Workflows
```
Domain Names: n8n.digitaldriverlicence.com
Scheme: http
Forward Hostname/IP: mlai-n8n
Forward Port: 5678
Cache Assets: No
Block Common Exploits: Yes
Websockets Support: Yes

SSL:
☑ Force SSL
☑ HTTP/2 Support
☑ HSTS Enabled
SSL Certificate: Request New (Let's Encrypt)
```

### 3. Marketing Website
```
Domain Names: digitaldriverlicence.com, www.digitaldriverlicence.com
Scheme: http
Forward Hostname/IP: mlai-frontend
Forward Port: 80
Cache Assets: Yes
Block Common Exploits: Yes
Websockets Support: No

SSL:
☑ Force SSL
☑ HTTP/2 Support
☑ HSTS Enabled
SSL Certificate: Request New (Let's Encrypt)
```

## 🔍 Verify Containers

```bash
# Check all containers are in proxy network
docker network inspect proxy | grep -A 3 "mlai-pixelfed\|mlai-n8n\|mlai-frontend"

# Check container IPs
docker inspect mlai-pixelfed -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
docker inspect mlai-n8n -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
docker inspect mlai-frontend -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
```

## 🧪 Test After NPM Setup

```bash
# Test Pixelfed
curl -I https://app.digitaldriverlicence.com

# Test n8n
curl -I https://n8n.digitaldriverlicence.com

# Test Website
curl -I https://digitaldriverlicence.com
```

## ⚠️ Important Notes

1. **DNS Records Required:**
   - `app.digitaldriverlicence.com` → A record → `158.179.180.165`
   - `n8n.digitaldriverlicence.com` → A record → `158.179.180.165`
   - `digitaldriverlicence.com` → A record → `158.179.180.165`
   - `www.digitaldriverlicence.com` → CNAME → `digitaldriverlicence.com`

2. **After NPM Setup:**
   - Update Supabase frontend config with new domain
   - Test waitlist form submission
   - Test Pixelfed login
   - Test n8n webhook endpoint

3. **Environment Variables:**
   - Pixelfed: Already updated to `app.digitaldriverlicence.com`
   - n8n webhook: Already updated to `n8n.digitaldriverlicence.com`

## 🔄 Rollback (if needed)

```bash
cd /home/ubuntu/mlai-hackathon
./scripts/switch-env.sh local
```

Or manually edit `.env` and restart:
```bash
docker compose restart pixelfed
```
