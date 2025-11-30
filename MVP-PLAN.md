# Digital Driver's License - MVP Implementation Plan

## 🎯 MVP Goal (Hackathon)
**Prove the "Chore → Post → AI Response → Reward" loop in 48 hours**

---

## 📊 Core Components

### 1. **Platform Stack**
```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Pixelfed   │─────▶│     n8n     │─────▶│  Vision AI  │
│  (Laravel)  │      │ (Workflows) │      │  (GPT-4o)   │
└─────────────┘      └─────────────┘      └─────────────┘
       │                     │
       └──────┬──────────────┘
              ▼
       ┌─────────────┐
       │ PostgreSQL  │
       └─────────────┘
```

### 2. **Stakeholders**

| Role | User Type | MVP Actions |
|------|-----------|-------------|
| **Child** | Primary User | Post chore photos, receive feedback |
| **Parent** | Admin | Approve posts, configure agents |
| **AI Agent** | Bot Account | Comment on posts, validate chores |

---

## 🎮 MVP Features (Phase 1)

### ✅ Must Have (Core Loop)
1. **Closed Network**
   - Child account locked (no federation)
   - Can only see: Parents + AI Agents
   
2. **Chore Posting**
   - Upload photo with caption
   - Mark as "Chore" type
   - Pending approval state

3. **AI Agent: "The Hype-Man"**
   - Receives webhook on new post
   - Analyzes image (Vision AI)
   - Posts encouraging comment
   - Awards XP/Tokens

4. **Basic Gamification**
   - Token counter in UI
   - XP bar display
   - License level badge (L-Plate)

### 🔄 Nice to Have (If Time)
- Parent approval workflow
- Token spending (screen time)
- Second agent ("The Moderator")

---

## 🔧 Technical Implementation

### Database Changes

**New Table: `user_gamification`**
```sql
CREATE TABLE user_gamification (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    license_level VARCHAR(10) DEFAULT 'L',
    tokens INT DEFAULT 0,
    xp INT DEFAULT 0,
    safety_score INT DEFAULT 100,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**Modify: `users` table**
```sql
ALTER TABLE users ADD COLUMN is_agent BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN agent_type VARCHAR(50);
```

### Pixelfed Modifications

**1. Webhook Event (StatusController.php)**
```php
// After post creation
Event::dispatch(new NewChildPost($status));
```

**2. Webhook Listener**
```php
// Send to n8n
Http::post(env('N8N_WEBHOOK_URL'), [
    'post_id' => $status->id,
    'image_url' => $status->firstMedia()->url,
    'caption' => $status->caption,
    'user_id' => $status->profile_id
]);
```

**3. Gamification Display (layouts/app.blade.php)**
```html
<div class="gamification-hud">
    <span>🪙 {{ auth()->user()->gamification->tokens }}</span>
    <span>⭐ {{ auth()->user()->gamification->xp }} XP</span>
    <span>🚗 L-Plate</span>
</div>
```

### n8n Workflow: "The Hype-Man"

**Workflow Steps:**
1. **Webhook Trigger** - Receive post data
2. **HTTP Request** - Send image to GPT-4o Vision
3. **Function** - Parse AI response
4. **Condition** - Is chore valid?
5. **HTTP Request** - Post comment via Pixelfed API
6. **HTTP Request** - Update user tokens/XP

**Payload Example:**
```json
{
  "post_id": 123,
  "image_url": "https://cdn/img.jpg",
  "caption": "Cleaned my room!",
  "user_id": 456
}
```

---

## 🗓️ Hackathon Timeline (48h)

### Day 1 (24h)
**Hours 0-8: Infrastructure**
- ✅ Pixelfed containerized
- ✅ n8n running
- ✅ PostgreSQL configured
- Database migrations
- Create agent accounts

**Hours 9-16: Core Integration**
- Webhook implementation
- n8n workflow creation
- Vision AI integration
- Basic comment posting

**Hours 17-24: UI/UX**
- Gamification HUD
- License badge display
- Post type selector

### Day 2 (24h)
**Hours 25-32: Testing & Polish**
- End-to-end testing
- Bug fixes
- UI refinements

**Hours 33-40: Demo Prep**
- Demo script
- Test accounts
- Presentation slides

**Hours 41-48: Buffer**
- Final testing
- Documentation
- Deployment verification

---

## 🔗 Integration Points

### Pixelfed → n8n
```
POST https://n8n.mlai-hackathon.local/webhook/new-post
Content-Type: application/json

{
  "event": "post.created",
  "post_id": 123,
  "user_id": 456,
  "image_url": "...",
  "caption": "..."
}
```

### n8n → Pixelfed API
```
POST https://pixelfed.mlai-hackathon.local/api/v1/statuses
Authorization: Bearer {agent_token}

{
  "status": "Great job! 🌟 +50 XP",
  "in_reply_to_id": 123
}
```

### n8n → Vision AI
```
POST https://api.openai.com/v1/chat/completions

{
  "model": "gpt-4o",
  "messages": [{
    "role": "user",
    "content": [
      {"type": "text", "text": "Is this a clean room?"},
      {"type": "image_url", "image_url": {"url": "..."}}
    ]
  }]
}
```

---

## 📝 Demo Script

**Scenario: "Clean Room Challenge"**

1. **Parent Setup**
   - Login as parent
   - Create child account (L-Plate)
   - Enable "Hype-Man" agent

2. **Child Action**
   - Login as child
   - Upload photo: "Cleaned my room!"
   - Mark as "Chore"

3. **System Response**
   - n8n receives webhook
   - Vision AI validates room is clean
   - Agent comments: "Wow! So tidy! 🌟 +50 XP"
   - Tokens updated: 0 → 50

4. **Parent View**
   - See child's post
   - See agent interaction
   - View gamification stats

---

## 🚨 Critical Success Factors

1. **Webhook Reliability**
   - Test webhook delivery
   - Implement retry logic
   - Log all events

2. **AI Response Quality**
   - Prompt engineering for Vision AI
   - Fallback responses
   - Rate limiting

3. **User Experience**
   - Fast response time (<5s)
   - Clear visual feedback
   - Mobile-friendly UI

---

## 🎯 Success Metrics (MVP)

- [ ] Child can post photo
- [ ] Webhook triggers n8n
- [ ] AI analyzes image
- [ ] Agent posts comment
- [ ] Tokens/XP updated
- [ ] UI displays gamification
- [ ] Demo runs end-to-end

---

## 🔐 Environment Variables

```env
# Pixelfed
APP_URL=http://pixelfed.mlai-hackathon.local
DB_HOST=postgres
DB_DATABASE=pixelfed
DB_USERNAME=postgres
DB_PASSWORD=hackathon2025

# n8n Integration
N8N_WEBHOOK_URL=http://mlai-n8n:5678/webhook/new-post
N8N_API_KEY=your_api_key

# AI Services
OPENAI_API_KEY=your_openai_key
VISION_MODEL=gpt-4o
```

---

## 📚 Next Steps After MVP

**Phase 2 Features:**
- Parent approval workflow
- Token marketplace (screen time)
- Second agent: "The Moderator"
- License progression (L → P1)
- Safety score tracking

**Phase 3 Features:**
- "The Tester" agent (mild conflict)
- "The Scammer" agent (safety training)
- License exams
- Analytics dashboard
