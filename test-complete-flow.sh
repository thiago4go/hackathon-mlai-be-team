#!/bin/bash

echo "🧪 Teste Completo do Fluxo AI Agent"
echo "===================================="
echo ""

# XP antes
echo "📊 XP/Tokens ANTES:"
docker exec mlai-postgres psql -U postgres -d pixelfed -c "SELECT user_id, xp, tokens FROM user_gamification WHERE user_id = 5;"

echo ""
echo "📝 Criando novo post..."

# Criar post
POST_ID=$(docker exec mlai-pixelfed php artisan tinker --execute="
\$user = App\User::find(5);
\$status = new App\Status();
\$status->profile_id = \$user->profile->id;
\$status->caption = 'I helped my parents with grocery shopping! 🛒🥕';
\$status->rendered = \$status->caption;
\$status->scope = 'public';
\$status->visibility = 'public';
\$status->type = 'text';
\$status->local = true;
\$status->save();
App\Jobs\StatusPipeline\NewStatusPipeline::dispatch(\$status);
echo \$status->id;
" | tail -1)

echo "✅ Post criado! ID: $POST_ID"
echo ""
echo "⏳ Aguardando 5 segundos para processamento..."
sleep 5

echo ""
echo "📊 XP/Tokens DEPOIS:"
docker exec mlai-postgres psql -U postgres -d pixelfed -c "SELECT user_id, xp, tokens, updated_at FROM user_gamification WHERE user_id = 5;"

echo ""
echo "💬 Comentários do AI:"
docker exec mlai-postgres psql -U postgres -d pixelfed -c "SELECT caption, created_at FROM statuses WHERE in_reply_to_id = $POST_ID;"

echo ""
echo "✅ Teste completo!"
