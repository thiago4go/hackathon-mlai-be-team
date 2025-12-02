#!/bin/bash
# Note: Ensure this script has executable permissions: chmod +x test-hype-man.sh

echo "🧪 Testing Hype-Man AI Agent..."
echo ""

# Get user ID for testchild with proper error handling
echo "📋 Getting testchild user info..."
USER_INFO=$(sudo docker exec mlai-postgres psql -U postgres -d pixelfed -A -F',' -t -c "SELECT u.id, p.id FROM users u JOIN profiles p ON u.profile_id = p.id WHERE u.username = 'testchild' LIMIT 1;")
USER_ID=$(echo "$USER_INFO" | cut -d',' -f1)
PROFILE_ID=$(echo "$USER_INFO" | cut -d',' -f2)

if [ -z "$USER_ID" ] || [ -z "$PROFILE_ID" ]; then
    echo "❌ User testchild not found or profile ID missing"
    exit 1
fi

echo "✅ User ID: $USER_ID, Profile ID: $PROFILE_ID"
echo ""

# Use timestamp-based status_id to avoid conflicts
TIMESTAMP_ID=$(date +%s)

# Simulate a new post webhook
echo "📤 Sending test webhook to n8n..."
RESPONSE=$(curl -s -X POST http://localhost:5679/webhook/chore-webhook \
  -H "Content-Type: application/json" \
  -d "{
    \"user_id\": $USER_ID,
    \"username\": \"testchild\",
    \"status_id\": $TIMESTAMP_ID,
    \"caption\": \"I cleaned my room and organized all my toys!\",
    \"image_url\": \"https://example.com/room.jpg\"
  }")

echo "📥 AI Response:"
echo "$RESPONSE" | jq -r '.ai_response // .message // .'
echo ""

# Check gamification points
echo "🎮 Current Gamification Status:"
sudo docker exec mlai-postgres psql -U postgres -d pixelfed -c "SELECT user_id, xp, tokens, license_level, safety_score, updated_at FROM user_gamification WHERE user_id = $USER_ID;"
echo ""

echo "✅ Test complete!"
