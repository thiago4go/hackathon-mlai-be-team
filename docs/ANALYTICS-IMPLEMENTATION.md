# Plausible Analytics - Implementation Guide

## 🚀 Quick Start for Developers

This guide provides step-by-step instructions for implementing Plausible Analytics across the Digital Driver's License platform.

---

## Prerequisites

- Docker and Docker Compose installed
- Access to the repository
- Basic knowledge of React, Laravel, and n8n
- Plausible PRD reviewed and approved

---

## Phase 1: Infrastructure Setup

### Step 1.1: Add Plausible to Docker Compose

Edit `docker-compose.yml`:

```yaml
  # Plausible Analytics
  plausible:
    image: plausible/analytics:latest
    container_name: mlai-plausible
    restart: unless-stopped
    ports:
      - "8001:8000"
    environment:
      - BASE_URL=https://analytics.digitaldriverlicence.com
      - SECRET_KEY_BASE=${PLAUSIBLE_SECRET_KEY}
      - DATABASE_URL=postgres://postgres:hackathon2025@postgres:5432/plausible
      - DISABLE_REGISTRATION=true
    depends_on:
      - postgres
    networks:
      - mlai-network
      - proxy
```

### Step 1.2: Generate Secret Key

```bash
openssl rand -base64 64
```

Add to `.env.production`:
```env
PLAUSIBLE_SECRET_KEY=your_generated_key_here
```

### Step 1.3: Create Database

```bash
docker exec mlai-postgres psql -U postgres -c "CREATE DATABASE plausible;"
```

### Step 1.4: Deploy

```bash
cd /home/ubuntu/mlai-hackathon
docker compose up -d plausible
```

### Step 1.5: Configure NPM

- Domain: `analytics.digitaldriverlicence.com`
- Forward to: `mlai-plausible:8000`
- SSL: Let's Encrypt

### Step 1.6: Initial Setup

1. Access https://analytics.digitaldriverlicence.com
2. Create admin account
3. Add sites:
   - `digitaldriverlicence.com` (marketing)
   - `app.digitaldriverlicence.com` (Pixelfed)

---

## Phase 2: Frontend Integration

### Step 2.1: Add Plausible Script

Edit `website/safety-lane-ui/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Digital Driver's License</title>
    
    <!-- Plausible Analytics -->
    <script defer data-domain="digitaldriverlicence.com" 
      src="https://analytics.digitaldriverlicence.com/js/script.js">
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Step 2.2: Create Analytics Utility

Create `website/safety-lane-ui/src/utils/analytics.js`:

```javascript
/**
 * Analytics utility for Plausible
 */

/**
 * Track custom event
 * @param {string} eventName - Name of the event
 * @param {object} props - Event properties (max 30 key-value pairs)
 */
export const trackEvent = (eventName, props = {}) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props })
  } else {
    console.warn('Plausible not loaded:', eventName, props)
  }
}

/**
 * Track waitlist signup
 */
export const trackWaitlistSignup = (ageGroup, source = 'website') => {
  trackEvent('Waitlist Signup', {
    age_group: ageGroup,
    source: source
  })
}

/**
 * Track video interaction
 */
export const trackVideoPlay = (videoId, position = 'hero') => {
  trackEvent('Video Play', {
    video_id: videoId,
    position: position
  })
}

export const trackVideoComplete = (videoId, watchTime) => {
  trackEvent('Video Complete', {
    video_id: videoId,
    watch_time: Math.round(watchTime) + 's'
  })
}

/**
 * Track CTA clicks
 */
export const trackCTAClick = (ctaType, location) => {
  trackEvent('CTA Click', {
    cta_type: ctaType,
    location: location
  })
}

/**
 * Track simulator interaction
 */
export const trackSimulatorAction = (action, step) => {
  trackEvent('Simulator Interaction', {
    action: action,
    step: step
  })
}
```

### Step 2.3: Update WaitlistModal

Edit `website/safety-lane-ui/src/components/WaitlistModal.jsx`:

```javascript
import { trackWaitlistSignup } from '../utils/analytics'

// In handleSubmit, after successful submission:
if (!supabaseError) {
  setSuccess(true);
  
  // Track analytics
  trackWaitlistSignup(formData.childrenAges, 'modal');
  
  setTimeout(() => {
    // ... rest of code
  }, 2000);
}
```

### Step 2.4: Test Frontend Tracking

```bash
# Rebuild frontend
cd /home/ubuntu/mlai-hackathon
./scripts/deploy.sh

# Test in browser
# 1. Open https://digitaldriverlicence.com
# 2. Check Plausible dashboard for pageview
# 3. Submit waitlist form
# 4. Check dashboard for "Waitlist Signup" event
```

---

## Phase 3: Pixelfed Integration

### Step 3.1: Install Laravel Package

```bash
docker exec mlai-pixelfed composer require vincentbean/laravel-plausible
```

### Step 3.2: Publish Config

```bash
docker exec mlai-pixelfed php artisan vendor:publish --tag=plausible-config
```

### Step 3.3: Configure Plausible

Edit `digital-drive-license/config/plausible.php`:

```php
<?php

return [
    'domain' => env('PLAUSIBLE_DOMAIN', 'app.digitaldriverlicence.com'),
    'api_host' => env('PLAUSIBLE_API_HOST', 'https://analytics.digitaldriverlicence.com'),
    'enabled' => env('PLAUSIBLE_ENABLED', true),
];
```

Add to `.env.production`:
```env
PLAUSIBLE_DOMAIN=app.digitaldriverlicence.com
PLAUSIBLE_API_HOST=https://analytics.digitaldriverlicence.com
PLAUSIBLE_ENABLED=true
```

### Step 3.4: Create Analytics Service

Create `digital-drive-license/app/Services/AnalyticsService.php`:

```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AnalyticsService
{
    protected $domain;
    protected $apiHost;
    protected $enabled;

    public function __construct()
    {
        $this->domain = config('plausible.domain');
        $this->apiHost = config('plausible.api_host');
        $this->enabled = config('plausible.enabled');
    }

    /**
     * Track custom event
     */
    public function trackEvent(string $eventName, array $props = [], ?string $url = null)
    {
        if (!$this->enabled) {
            return;
        }

        try {
            $payload = [
                'domain' => $this->domain,
                'name' => $eventName,
                'url' => $url ?? request()->fullUrl(),
                'props' => $props,
            ];

            Http::post("{$this->apiHost}/api/event", $payload);
        } catch (\Exception $e) {
            Log::warning('Analytics tracking failed', [
                'event' => $eventName,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Track user signup
     */
    public function trackUserSignup(string $userType, string $source = 'web')
    {
        $this->trackEvent('User Signup', [
            'user_type' => $userType,
            'source' => $source,
        ]);
    }

    /**
     * Track post creation
     */
    public function trackPostCreated(string $postType, string $licenseLevel)
    {
        $this->trackEvent('Post Created', [
            'post_type' => $postType,
            'license_level' => $licenseLevel,
        ]);
    }

    /**
     * Track chore completion
     */
    public function trackChoreCompleted(string $choreType, int $tokensEarned)
    {
        $this->trackEvent('Chore Completed', [
            'chore_type' => $choreType,
            'tokens_earned' => (string)$tokensEarned,
        ]);
    }

    /**
     * Track license upgrade
     */
    public function trackLicenseUpgrade(string $fromLevel, string $toLevel)
    {
        $this->trackEvent('License Upgraded', [
            'from_level' => $fromLevel,
            'to_level' => $toLevel,
        ]);
    }
}
```

### Step 3.5: Update Controllers

Example: `digital-drive-license/app/Http/Controllers/StatusController.php`:

```php
use App\Services\AnalyticsService;

class StatusController extends Controller
{
    protected $analytics;

    public function __construct(AnalyticsService $analytics)
    {
        $this->analytics = $analytics;
    }

    public function store(Request $request)
    {
        // ... existing code to create status ...

        // Track analytics
        $this->analytics->trackPostCreated(
            $status->type ?? 'photo',
            auth()->user()->gamification->license_level ?? 'L'
        );

        return response()->json($status);
    }
}
```

### Step 3.6: Test Pixelfed Tracking

```bash
# Rebuild Pixelfed
cd /home/ubuntu/mlai-hackathon
docker compose build pixelfed
docker compose up -d pixelfed

# Test
# 1. Create a post in Pixelfed
# 2. Check Plausible dashboard for "Post Created" event
```

---

## Phase 4: Configure Goals

### In Plausible Dashboard

1. Go to Site Settings
2. Click "Goals"
3. Add custom event goals:
   - `Waitlist Signup`
   - `Video Complete`
   - `User Signup`
   - `Post Created`
   - `Chore Completed`
   - `License Upgraded`

---

## Testing Checklist

### Frontend
- [ ] Pageviews tracked
- [ ] Waitlist signup event
- [ ] Video play event
- [ ] CTA click event
- [ ] Events appear in dashboard
- [ ] Properties visible in dashboard

### Pixelfed
- [ ] Pageviews tracked
- [ ] User signup event
- [ ] Post creation event
- [ ] Chore completion event
- [ ] Events appear in dashboard
- [ ] Properties visible in dashboard

### Privacy
- [ ] No PII in events
- [ ] No cookies set
- [ ] IP not stored
- [ ] GDPR compliant

---

## Troubleshooting

### Events not appearing

```bash
# Check Plausible logs
docker logs mlai-plausible

# Test API directly
curl -X POST https://analytics.digitaldriverlicence.com/api/event \
  -H 'Content-Type: application/json' \
  -d '{
    "domain": "digitaldriverlicence.com",
    "name": "Test Event",
    "url": "https://digitaldriverlicence.com/test"
  }'
```

### Script blocked by ad blocker

Use custom domain and proxy through your own server.

---

## Performance Monitoring

### Metrics to Watch

```bash
# Container resources
docker stats mlai-plausible

# Database size
docker exec mlai-postgres psql -U postgres -d plausible -c "
  SELECT pg_size_pretty(pg_database_size('plausible'));
"

# Event count
docker exec mlai-postgres psql -U postgres -d plausible -c "
  SELECT COUNT(*) FROM events;
"
```

---

## Maintenance

### Backup

```bash
# Backup Plausible database
docker exec mlai-postgres pg_dump -U postgres plausible > plausible_backup.sql
```

### Update Plausible

```bash
docker compose pull plausible
docker compose up -d plausible
```

---

## Support

- **Plausible Docs:** https://plausible.io/docs
- **GitHub Issues:** https://github.com/plausible/analytics/issues
- **Community Forum:** https://github.com/plausible/analytics/discussions
