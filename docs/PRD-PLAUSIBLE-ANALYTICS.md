# PRD: Plausible Analytics Integration
**Digital Driver's License - Analytics Implementation**

---

## 📋 Document Information

| Field | Value |
|-------|-------|
| **Version** | 1.0 |
| **Status** | Draft |
| **Author** | DevOps Team |
| **Created** | 2025-11-30 |
| **Branch** | `feature/plausible-analytics` |

---

## 🎯 Executive Summary

Implement Plausible Analytics (self-hosted) to track user behavior across both the marketing website and Pixelfed application. This will provide privacy-first analytics for understanding user engagement, conversion funnel, and product usage without compromising user privacy - critical for a child safety product.

---

## 🔍 Research Findings

### What is Plausible?

**Plausible Analytics** is an open-source, privacy-first web analytics platform that:
- ✅ **GDPR/CCPA compliant** - No cookies, no personal data collection
- ✅ **Lightweight** - <1KB script (45x smaller than Google Analytics)
- ✅ **Self-hosted** - Full data ownership and control
- ✅ **Simple UI** - All metrics on one page
- ✅ **Open source** - Transparent and auditable

### Why Plausible for Digital Driver's License?

1. **Privacy-First**: Essential for a child safety product
2. **No Cookies**: No consent banners needed
3. **Lightweight**: Won't slow down the site
4. **Professional**: Looks good for investors/stakeholders
5. **Self-Hosted**: Complete data control

### Event Tracking Capabilities

Plausible supports:

#### 1. **Automatic Tracking**
- Page views
- Unique visitors
- Bounce rate
- Visit duration
- Traffic sources
- Device types
- Geographic location (country/region/city)
- UTM parameters

#### 2. **Custom Events** (via JavaScript)
```javascript
plausible('Event Name', {
  props: {
    key1: 'value1',
    key2: 'value2'
  }
})
```

**Limitations:**
- Max 30 custom properties per event
- Properties are key-value pairs (strings)

#### 3. **Server-Side Events** (via API)
```bash
POST /api/event
{
  "domain": "digitaldriverlicence.com",
  "name": "Custom Event",
  "url": "https://app.digitaldriverlicence.com/path",
  "props": {
    "user_type": "parent",
    "license_level": "L"
  }
}
```

**Use cases:**
- Backend actions (post creation, chore completion)
- Server-side conversions
- API interactions

#### 4. **Revenue Tracking**
```javascript
plausible('Purchase', {
  revenue: {
    currency: 'USD',
    amount: '29.99'
  }
})
```

---

## 📊 Events to Track

### Frontend (Marketing Website)

| Event Name | Trigger | Properties | Priority |
|------------|---------|------------|----------|
| `Waitlist Signup` | Form submission | `age_group`, `source` | P0 |
| `Video Play` | Video starts | `video_id`, `position` | P1 |
| `Video Complete` | Video ends | `video_id`, `watch_time` | P1 |
| `CTA Click` | Button clicks | `cta_type`, `location` | P1 |
| `Pitch Deck Download` | PDF download | `source` | P2 |
| `FAQ Expand` | FAQ interaction | `question_id` | P2 |
| `Simulator Interaction` | Demo usage | `action`, `step` | P1 |

### Pixelfed (App)

| Event Name | Trigger | Properties | Priority |
|------------|---------|------------|----------|
| `User Signup` | Account created | `user_type`, `source` | P0 |
| `User Login` | Successful login | `user_type` | P1 |
| `Post Created` | New post | `post_type`, `license_level` | P0 |
| `Post Approved` | Parent approval | `post_id`, `approval_time` | P1 |
| `Comment Posted` | Comment created | `is_ai_agent`, `license_level` | P1 |
| `Chore Completed` | Chore verified | `chore_type`, `tokens_earned` | P0 |
| `Tokens Spent` | Token redemption | `item_type`, `amount` | P1 |
| `License Upgraded` | Level change | `from_level`, `to_level` | P0 |
| `Agent Subscribed` | Agent added | `agent_type` | P1 |
| `Report Submitted` | Safety report | `report_type`, `target_type` | P0 |

### Goals (Conversion Tracking)

| Goal | Definition | Business Impact |
|------|------------|-----------------|
| **Waitlist Conversion** | Waitlist signup completed | Lead generation |
| **Video Engagement** | >50% video watched | Content effectiveness |
| **App Signup** | Account created | User acquisition |
| **First Post** | User creates first post | Activation |
| **Chore Completion** | First chore verified | Engagement |
| **License Progression** | L → P1 upgrade | Product validation |

---

## 🏗️ Technical Architecture

### Components

```
┌─────────────────────────────────────────────────────────┐
│                    Plausible Server                      │
│                  (Docker Container)                      │
│                                                          │
│  - Analytics Dashboard                                   │
│  - Events API (/api/event)                              │
│  - PostgreSQL Database                                   │
└─────────────────────────────────────────────────────────┘
                          ▲
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        │                 │                 │
┌───────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
│   Frontend   │  │   Pixelfed  │  │     n8n     │
│  (React/JS)  │  │ (Laravel/PHP)│  │  (Webhooks) │
│              │  │              │  │             │
│ - JS Script  │  │ - Server API │  │ - Events    │
│ - Custom     │  │ - Middleware │  │             │
│   Events     │  │              │  │             │
└──────────────┘  └──────────────┘  └─────────────┘
```

### Integration Methods

#### 1. **Frontend (React)**
```javascript
// Install Plausible script
<script defer data-domain="digitaldriverlicence.com" 
  src="https://analytics.digitaldriverlicence.com/js/script.js">
</script>

// Track custom events
window.plausible('Waitlist Signup', {
  props: { age_group: '13-15' }
})
```

#### 2. **Pixelfed (Laravel)**
```php
// Install package
composer require vincentbean/laravel-plausible

// Track server-side events
use VincentBean\Plausible\Facades\Plausible;

Plausible::event('Post Created', [
  'post_type' => 'chore',
  'license_level' => 'L'
]);
```

#### 3. **n8n (Webhooks)**
```javascript
// HTTP Request node
POST https://analytics.digitaldriverlicence.com/api/event
{
  "domain": "app.digitaldriverlicence.com",
  "name": "AI Agent Response",
  "url": "app://pixelfed/ai-interaction",
  "props": {
    "agent_type": "hype-man",
    "response_time": "2.3s"
  }
}
```

---

## 📁 File Structure

```
mlai-hackathon/
├── docker-compose.yml                    # Add Plausible service
├── website/safety-lane-ui/
│   ├── index.html                        # Add Plausible script
│   ├── src/
│   │   ├── utils/
│   │   │   └── analytics.js              # Analytics helper
│   │   └── components/
│   │       ├── WaitlistModal.jsx         # Track signup
│   │       └── VideoPlayer.jsx           # Track video events
├── digital-drive-license/
│   ├── composer.json                     # Add laravel-plausible
│   ├── config/
│   │   └── plausible.php                 # Plausible config
│   ├── app/
│   │   ├── Services/
│   │   │   └── AnalyticsService.php      # Analytics service
│   │   └── Http/
│   │       └── Middleware/
│   │           └── TrackPageView.php     # Auto-track middleware
└── docs/
    ├── PRD-PLAUSIBLE-ANALYTICS.md        # This file
    └── ANALYTICS-IMPLEMENTATION.md       # Implementation guide
```

---

## 🛠️ Implementation Plan

### Phase 1: Infrastructure Setup (2-3 hours)

**Tasks:**
1. Add Plausible to docker-compose.yml
2. Create PostgreSQL database for Plausible
3. Configure environment variables
4. Deploy Plausible container
5. Configure NPM proxy (analytics.digitaldriverlicence.com)
6. Verify Plausible dashboard access

**Deliverables:**
- Plausible running at https://analytics.digitaldriverlicence.com
- Admin account created
- Sites configured (digitaldriverlicence.com, app.digitaldriverlicence.com)

---

### Phase 2: Frontend Integration (3-4 hours)

**Tasks:**
1. Add Plausible script to index.html
2. Create analytics utility helper
3. Implement custom events:
   - Waitlist signup
   - Video play/complete
   - CTA clicks
   - Simulator interactions
4. Test events in Plausible dashboard
5. Configure goals in Plausible

**Files to modify:**
- `website/safety-lane-ui/index.html`
- `website/safety-lane-ui/src/utils/analytics.js` (new)
- `website/safety-lane-ui/src/components/WaitlistModal.jsx`
- `website/safety-lane-ui/src/components/Hero.jsx`

**Testing:**
- Verify pageviews tracked
- Verify custom events appear in dashboard
- Test with ad blockers
- Test on mobile devices

---

### Phase 3: Pixelfed Integration (4-6 hours)

**Tasks:**
1. Install laravel-plausible package
2. Configure Plausible in Laravel
3. Create AnalyticsService
4. Add middleware for automatic pageview tracking
5. Implement server-side events:
   - User signup/login
   - Post creation/approval
   - Comment posting
   - Chore completion
   - Token transactions
   - License upgrades
6. Test events

**Files to create/modify:**
- `digital-drive-license/composer.json`
- `digital-drive-license/config/plausible.php` (new)
- `digital-drive-license/app/Services/AnalyticsService.php` (new)
- `digital-drive-license/app/Http/Middleware/TrackPageView.php` (new)
- `digital-drive-license/app/Http/Controllers/StatusController.php`
- `digital-drive-license/app/Http/Controllers/CommentController.php`

**Testing:**
- Create test user and verify signup event
- Create test post and verify event
- Complete test chore and verify event
- Check dashboard for all events

---

### Phase 4: n8n Integration (2-3 hours)

**Tasks:**
1. Create Plausible HTTP Request template in n8n
2. Add analytics to AI agent workflows
3. Track agent interactions
4. Track webhook events

**Events to track:**
- AI agent responses
- Webhook triggers
- Workflow executions
- Error events

---

### Phase 5: Dashboard Configuration (1-2 hours)

**Tasks:**
1. Configure goals in Plausible
2. Set up custom properties
3. Create shared links for stakeholders
4. Document dashboard usage
5. Set up email reports (if needed)

**Goals to configure:**
- Waitlist Signup
- Video Complete
- User Signup
- First Post
- Chore Completion
- License Upgrade

---

### Phase 6: Testing & Documentation (2-3 hours)

**Tasks:**
1. End-to-end testing of all events
2. Verify data accuracy
3. Test privacy compliance
4. Create user documentation
5. Create developer documentation
6. Performance testing

**Deliverables:**
- Test report
- User guide for dashboard
- Developer guide for adding new events
- Privacy compliance checklist

---

## 🔒 Privacy & Compliance

### Data Collected

**Automatically:**
- Page URLs (no query parameters with PII)
- Referrer sources
- Device type (desktop/mobile/tablet)
- Browser type
- Operating system
- Country/Region/City (from IP, not stored)
- Visit duration

**NOT Collected:**
- Personal identifiable information (PII)
- IP addresses (used for counting, not stored)
- Cookies
- Cross-site tracking
- User IDs (unless explicitly sent in props)

### Compliance Checklist

- ✅ GDPR compliant (no personal data)
- ✅ CCPA compliant (no selling of data)
- ✅ COPPA compliant (no tracking of children)
- ✅ No cookies (no consent banner needed)
- ✅ Self-hosted (full data control)
- ✅ Open source (transparent)

### Best Practices

1. **Never send PII in event properties**
   - ❌ Bad: `{ email: 'user@example.com' }`
   - ✅ Good: `{ user_type: 'parent' }`

2. **Use generic identifiers**
   - ❌ Bad: `{ user_id: '12345' }`
   - ✅ Good: `{ license_level: 'L' }`

3. **Aggregate data only**
   - Track counts, not individuals
   - Use categories, not specific values

---

## 📊 Success Metrics

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Script Load Time** | <100ms | Browser DevTools |
| **Event Delivery** | >99% | Plausible API logs |
| **Dashboard Load** | <2s | Manual testing |
| **Data Accuracy** | >95% | Spot checks |

### Business Metrics

| Metric | Purpose |
|--------|---------|
| **Waitlist Conversion Rate** | Lead generation effectiveness |
| **Video Completion Rate** | Content engagement |
| **Signup Conversion** | Funnel optimization |
| **Chore Completion Rate** | Product engagement |
| **License Progression** | Product validation |
| **Bounce Rate** | Site quality |
| **Traffic Sources** | Marketing effectiveness |

---

## 🚨 Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Ad blockers** | Medium | High | Use custom domain, server-side tracking |
| **Performance impact** | Low | Low | Lightweight script, async loading |
| **Data privacy concerns** | High | Low | Clear privacy policy, no PII |
| **Plausible downtime** | Low | Low | Self-hosted, monitoring |
| **Event tracking bugs** | Medium | Medium | Comprehensive testing, logging |

---

## 💰 Cost Analysis

### Infrastructure

| Resource | Cost | Notes |
|----------|------|-------|
| **Plausible Container** | $0 | Self-hosted, open source |
| **PostgreSQL Storage** | ~$0.50/month | ~500MB estimated |
| **CPU/Memory** | Included | Minimal overhead |
| **Domain** | $0 | Using subdomain |

**Total: ~$0.50/month** (negligible)

### Development Time

| Phase | Hours | Cost (@ $50/hr) |
|-------|-------|-----------------|
| Infrastructure | 3 | $150 |
| Frontend | 4 | $200 |
| Pixelfed | 6 | $300 |
| n8n | 3 | $150 |
| Dashboard | 2 | $100 |
| Testing | 3 | $150 |
| **Total** | **21** | **$1,050** |

---

## 📚 Resources

### Documentation
- [Plausible Docs](https://plausible.io/docs)
- [Events API](https://plausible.io/docs/events-api)
- [Custom Events](https://plausible.io/docs/custom-event-goals)
- [Laravel Package](https://github.com/VincentBean/laravel-plausible)

### Tools
- [Plausible GitHub](https://github.com/plausible/analytics)
- [Self-Hosting Guide](https://plausible.io/docs/self-hosting)
- [Docker Compose](https://github.com/plausible/hosting)

---

## ✅ Acceptance Criteria

### Must Have (P0)

- [ ] Plausible deployed and accessible
- [ ] Frontend pageviews tracked
- [ ] Pixelfed pageviews tracked
- [ ] Waitlist signup events tracked
- [ ] Post creation events tracked
- [ ] Chore completion events tracked
- [ ] Dashboard accessible to stakeholders
- [ ] Privacy policy updated
- [ ] No PII collected
- [ ] All tests passing

### Should Have (P1)

- [ ] Video engagement tracked
- [ ] CTA clicks tracked
- [ ] User login events tracked
- [ ] Comment events tracked
- [ ] Token transaction events tracked
- [ ] License upgrade events tracked
- [ ] Goals configured in dashboard
- [ ] Email reports configured

### Nice to Have (P2)

- [ ] n8n events tracked
- [ ] AI agent interaction events
- [ ] FAQ interaction tracked
- [ ] Simulator events tracked
- [ ] Custom dashboard views
- [ ] Automated alerts

---

## 🎯 Next Steps

1. **Review this PRD** with team
2. **Approve implementation plan**
3. **Assign tasks** to developers
4. **Create tickets** in project management tool
5. **Start Phase 1** (Infrastructure)

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-11-30 | Initial PRD | DevOps Team |

---

## 🤝 Stakeholders

| Role | Name | Responsibility |
|------|------|----------------|
| **Product Owner** | TBD | Approve PRD, define priorities |
| **Tech Lead** | TBD | Review architecture, approve implementation |
| **Frontend Dev** | TBD | Implement frontend tracking |
| **Backend Dev** | TBD | Implement Pixelfed tracking |
| **DevOps** | TBD | Deploy infrastructure |
| **QA** | TBD | Test and validate |

---

**Status:** ✅ Ready for Review
**Branch:** `feature/plausible-analytics`
**Estimated Effort:** 21 hours
**Estimated Cost:** $1,050
