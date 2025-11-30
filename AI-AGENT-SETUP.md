# AI Agent "The Hype-Man" - Setup Guide

## Overview
This integration connects Pixelfed with n8n to create an AI-powered agent that automatically responds to children's chore posts with encouraging feedback.

## Architecture

```
Pixelfed Post → NewStatusPipeline → N8nWebhookService → n8n Workflow → OpenAI → Response
```

## Components

### 1. Pixelfed Integration
- **File**: `digital-drive-license/app/Services/N8nWebhookService.php`
- **Purpose**: Sends post data to n8n webhook when a new status is created
- **Modified**: `digital-drive-license/app/Jobs/StatusPipeline/NewStatusPipeline.php`

### 2. n8n Workflow
- **File**: `n8n-hype-man-agent.json`
- **Nodes**:
  - Webhook: Receives post data from Pixelfed
  - HTTP Request: Calls OpenAI API for analysis
  - Respond: Returns AI response

### 3. Environment Variables
Add to `digital-drive-license/.env`:
```env
N8N_WEBHOOK_URL="http://mlai-n8n:5678/webhook/chore-webhook"
```

**Note**: OpenAI API key is configured in n8n credentials (not in code).

## Setup Instructions

### 1. Import n8n Workflow
1. Access n8n at http://localhost:5679
2. Go to Workflows → Import from File
3. Select `n8n-hype-man-agent.json`
4. Configure OpenAI credential with your API key
5. Activate the workflow

### 2. Configure Pixelfed
The webhook integration is already added to the code. Just ensure:
- `N8N_WEBHOOK_URL` is set in `.env`
- Pixelfed container is restarted after changes

### 3. Test Accounts
- **Agent**: `thehypeman` / `hackathon2025`
- **Child**: `testchild` / `hackathon2025`
- **Parent**: `testparent` / `hackathon2025`

## Testing

1. Login to Pixelfed as `testchild`
2. Create a post with a chore-related caption (e.g., "Cleaned my room! 🧹")
3. Check n8n Executions to see the workflow run
4. AI will analyze and respond with encouragement + XP

## Workflow Details

### Webhook Payload
```json
{
  "caption": "Cleaned my room!",
  "image_url": "https://...",
  "user_id": 5,
  "status_id": 123,
  "username": "testchild"
}
```

### AI Response Format
```
VALID: [Encouraging message] +XP [30-100]
INVALID: [Gentle redirect message]
```

## Security Notes
- OpenAI API key is stored only in n8n credentials
- Webhook URL uses internal Docker network
- No sensitive data in git repository

## Future Enhancements
- Post AI comment back to Pixelfed
- Update gamification database with XP
- Add more AI agents (Moderator, Tester)
