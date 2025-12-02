#!/bin/bash

echo "🧪 Testing Automatic Webhook Trigger"
echo "======================================"
echo ""

# Get user info
echo "📊 Checking test user..."
docker exec mlai-postgres psql -U postgres -d pixelfed -c "SELECT id, username, profile_id FROM users WHERE username = 'testchild';"

echo ""
echo "📝 Current XP/Tokens:"
docker exec mlai-postgres psql -U postgres -d pixelfed -c "SELECT user_id, xp, tokens FROM user_gamification WHERE user_id = 5;"

echo ""
echo "✅ System is ready!"
echo ""
echo "To test:"
echo "1. Go to http://localhost:8080"
echo "2. Login as: testchild / hackathon2025"
echo "3. Create a new post with caption: 'I cleaned my room today! 🧹'"
echo "4. Wait 2-3 seconds"
echo "5. Check n8n executions: http://localhost:5679"
echo "6. Check if AI commented on the post"
echo ""
echo "To verify results, run:"
echo "  docker exec mlai-postgres psql -U postgres -d pixelfed -c \"SELECT user_id, xp, tokens FROM user_gamification WHERE user_id = 5;\""
