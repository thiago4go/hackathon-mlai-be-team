# Analytics Setup - Digital Driver's License

## Option 1: Plausible Analytics (Self-Hosted) ⭐ Recommended

### Why Plausible?
- ✅ Privacy-first (no cookies, GDPR compliant)
- ✅ Lightweight (~1KB script)
- ✅ Self-hosted (full control)
- ✅ Open source
- ✅ Simple, beautiful UI
- ✅ No personal data collection

### Quick Setup

1. **Add to docker-compose.yml:**
```yaml
  plausible:
    image: plausible/analytics:latest
    container_name: mlai-plausible
    restart: unless-stopped
    ports:
      - "8001:8000"
    environment:
      - BASE_URL=https://analytics.digitaldriverlicence.com
      - SECRET_KEY_BASE=your-secret-key-here
      - DATABASE_URL=postgres://postgres:hackathon2025@postgres:5432/plausible
    depends_on:
      - postgres
    networks:
      - mlai-network
      - proxy
```

2. **Create database:**
```bash
docker exec mlai-postgres psql -U postgres -c "CREATE DATABASE plausible;"
```

3. **Deploy:**
```bash
docker compose up -d plausible
```

4. **Add to website:**
```html
<!-- In website/safety-lane-ui/index.html -->
<script defer data-domain="digitaldriverlicence.com" 
  src="https://analytics.digitaldriverlicence.com/js/script.js">
</script>
```

5. **Configure NPM:**
- Domain: `analytics.digitaldriverlicence.com`
- Forward to: `mlai-plausible:8000`

---

## Option 2: PostHog (Cloud - Free Tier)

### Why PostHog?
- ✅ 1M events/month free
- ✅ Product analytics
- ✅ Session recording
- ✅ Feature flags
- ✅ No setup needed

### Quick Setup

1. **Sign up:** https://posthog.com
2. **Get API key**
3. **Install:**
```bash
cd website/safety-lane-ui
npm install posthog-js
```

4. **Add to App.jsx:**
```javascript
import posthog from 'posthog-js'

posthog.init('YOUR_API_KEY', {
  api_host: 'https://app.posthog.com'
})
```

---

## Option 3: Umami (Self-Hosted)

### Quick Setup

1. **Add to docker-compose.yml:**
```yaml
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    container_name: mlai-umami
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:hackathon2025@postgres:5432/umami
      - DATABASE_TYPE=postgresql
      - APP_SECRET=your-secret-here
    depends_on:
      - postgres
    networks:
      - mlai-network
      - proxy
```

2. **Create database:**
```bash
docker exec mlai-postgres psql -U postgres -c "CREATE DATABASE umami;"
```

3. **Deploy:**
```bash
docker compose up -d umami
```

---

## Option 4: Simple Server-Side Analytics

### Using Nginx Logs + GoAccess

**Pros:**
- ✅ No external scripts
- ✅ No privacy concerns
- ✅ Already have the data

**Setup:**
```bash
# Install GoAccess
apt-get install goaccess

# Generate report
docker logs mlai-frontend 2>&1 | \
  goaccess --log-format=COMBINED -o /tmp/report.html

# View report
cat /tmp/report.html
```

---

## Comparison Table

| Tool | Privacy | Setup | Features | Cost |
|------|---------|-------|----------|------|
| **Plausible** | ⭐⭐⭐⭐⭐ | Medium | Basic | Free (self-hosted) |
| **PostHog** | ⭐⭐⭐⭐ | Easy | Advanced | Free (1M events) |
| **Umami** | ⭐⭐⭐⭐⭐ | Medium | Basic | Free (self-hosted) |
| **GoAccess** | ⭐⭐⭐⭐⭐ | Easy | Basic | Free |
| **Matomo** | ⭐⭐⭐⭐ | Hard | Advanced | Free (self-hosted) |

---

## Recommended: Plausible

**For Digital Driver's License, I recommend Plausible because:**

1. **Privacy-first** - Important for a child safety product
2. **Lightweight** - Won't slow down your site
3. **Self-hosted** - Full control of data
4. **Simple** - Easy to understand metrics
5. **Professional** - Looks good for investors

---

## Quick Start (Plausible)

```bash
# 1. Add to docker-compose
nano /home/ubuntu/mlai-hackathon/docker-compose.yml

# 2. Create database
docker exec mlai-postgres psql -U postgres -c "CREATE DATABASE plausible;"

# 3. Deploy
cd /home/ubuntu/mlai-hackathon
docker compose up -d plausible

# 4. Add script to website
nano website/safety-lane-ui/index.html

# 5. Rebuild frontend
./scripts/deploy.sh
```

---

## What to Track

### Essential Metrics:
- Page views
- Unique visitors
- Bounce rate
- Time on site
- Traffic sources
- Device types

### Custom Events (for waitlist):
```javascript
// Track waitlist signup
plausible('Waitlist Signup', {
  props: { ageGroup: '13-15' }
})

// Track video play
plausible('Video Play', {
  props: { video: 'demo' }
})
```

---

## Privacy Compliance

All recommended tools are:
- ✅ GDPR compliant
- ✅ No cookies needed
- ✅ No personal data collection
- ✅ No tracking across sites

Perfect for a child safety product! 🔒
