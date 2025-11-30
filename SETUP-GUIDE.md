# 🚀 Setup Guide - Digital Driver's License MVP

## ✅ Passo 1: Pixelfed (CONCLUÍDO)

### Status Atual
- ✅ Servidor rodando em http://158.179.180.165:8080
- ✅ Usuário criado: `gimenes`
- ✅ PostgreSQL conectado
- ⚠️ Alguns erros 500 em APIs (não crítico para MVP)

### Próximas Ações no Pixelfed
1. Criar conta "Parent" (pai/mãe)
2. Criar conta "Child" (criança)
3. Criar conta "AI-Agent" (bot)

---

## 🔄 Passo 2: n8n Workflows

### Acesso
- URL: http://158.179.180.165:5679
- Primeiro acesso: criar credenciais de admin

### Workflows a Criar

#### Workflow 1: "Chore Detection"
```
Trigger: Webhook (Pixelfed new post)
  ↓
Filter: Check if user is "Child"
  ↓
HTTP Request: Get post image URL
  ↓
OpenAI Vision: Analyze image
  ↓
Decision: Is it a valid chore?
  ↓
Pixelfed API: Post comment as AI-Agent
```

#### Workflow 2: "Reward System"
```
Trigger: On AI comment posted
  ↓
PostgreSQL: Update child XP
  ↓
Pixelfed API: Send notification
```

---

## 🤖 Passo 3: AI Agent "Hype-Man"

### Configuração no Pixelfed
1. Criar conta: `@hypeman`
2. Gerar OAuth token para API
3. Configurar bio: "🤖 Your AI Chore Coach!"

### Prompts do AI Agent

**System Prompt:**
```
You are "Hype-Man", an encouraging AI coach for kids completing chores.
Analyze the image and determine:
1. Is this a real chore? (cleaning, organizing, helping)
2. Quality of work (1-5 stars)
3. Give enthusiastic feedback

Response format:
- If valid chore: "🌟 [Encouraging message] +[XP] XP!"
- If not a chore: "🤔 Hmm, this doesn't look like a chore. Try again!"
```

**Example Responses:**
- "🌟 WOW! That room is SPOTLESS! You're a cleaning champion! +50 XP!"
- "💪 Great job walking the dog! Fresh air = happy pup! +30 XP!"
- "🤔 Hmm, this looks like a selfie. Show me that chore! 📸"

---

## 🔗 Passo 4: Webhooks Pixelfed → n8n

### Opção A: Usar Pixelfed Events (Recomendado)
Modificar Pixelfed para disparar webhook em novos posts.

**Arquivo:** `digital-drive-license/app/Jobs/StatusPipeline/StatusPublish.php`

Adicionar após linha de publicação:
```php
// Trigger webhook for n8n
Http::post(env('N8N_WEBHOOK_URL'), [
    'event' => 'status.published',
    'status_id' => $status->id,
    'user_id' => $status->profile_id,
    'media_url' => $status->firstMedia()?->url(),
    'caption' => $status->caption
]);
```

### Opção B: Polling via n8n (MVP Rápido)
n8n faz polling na API do Pixelfed a cada 30s:

```
Schedule Trigger (every 30s)
  ↓
HTTP Request: GET /api/v1/timelines/home
  ↓
Filter: Only new posts from Child account
  ↓
Continue workflow...
```

---

## 🎯 MVP Test Flow

### Cenário de Teste
1. **Child** posta foto de quarto limpo com caption "Cleaned my room! 🧹"
2. **n8n** detecta novo post via webhook/polling
3. **OpenAI Vision** analisa imagem
4. **AI-Agent** comenta: "🌟 Amazing work! That room is sparkling! +50 XP!"
5. **PostgreSQL** atualiza XP do child
6. **Parent** vê notificação e pode aprovar

---

## 📝 Comandos Úteis

### Pixelfed
```bash
# Criar usuário via CLI
sudo docker exec -it mlai-pixelfed php artisan user:create

# Ver logs
sudo docker logs mlai-pixelfed -f

# Acessar console
sudo docker exec -it mlai-pixelfed bash
```

### n8n
```bash
# Ver logs
sudo docker logs mlai-n8n -f

# Restart
sudo docker restart mlai-n8n
```

### PostgreSQL
```bash
# Conectar ao banco
sudo docker exec -it mlai-postgres psql -U postgres -d pixelfed

# Ver tabelas
\dt

# Ver usuários
SELECT id, username, email FROM users;
```

---

## 🔑 Credenciais

### Pixelfed
- URL: http://158.179.180.165:8080
- Admin: `gimenes` (já criado)

### n8n
- URL: http://158.179.180.165:5679
- Criar no primeiro acesso

### PostgreSQL
- Host: postgres (interno)
- User: postgres
- Pass: hackathon2025
- DB: pixelfed

---

## 🚦 Próximo Passo Imediato

**Escolha uma opção:**

A) **Setup Rápido (Polling)** - 15 min
   - Configurar n8n
   - Criar workflow com polling
   - Testar com OpenAI

B) **Setup Completo (Webhooks)** - 45 min
   - Modificar código Pixelfed
   - Rebuild container
   - Configurar webhooks reais

**Recomendação:** Comece com A para validar o conceito!
