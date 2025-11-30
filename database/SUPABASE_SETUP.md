# Safety Lane Waitlist - Supabase Setup

## 1. Access Supabase Studio

**URL:** http://10.0.19.224:3001 (Supabase Studio)

Or via public URL if configured through NPM.

## 2. Run SQL Migration

1. Go to **SQL Editor** in Supabase Studio
2. Copy the contents of `supabase-waitlist.sql`
3. Click **Run** to execute

## 3. Get API Credentials

### Supabase URL
```
http://10.0.19.224:8000
```

### Get Service Role Key
1. Go to **Settings** > **API**
2. Copy the `service_role` key (secret)
3. Copy the `anon` key (public - for frontend)

## 4. Configure Frontend

Update your React app with Supabase credentials:

```javascript
// src/config/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://10.0.19.224:8000'
const supabaseAnonKey = 'YOUR_ANON_KEY_HERE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 5. Example: Submit Waitlist Form

```javascript
// In your WaitlistModal.jsx
import { supabase } from '../config/supabase'

const handleSubmit = async (formData) => {
  const { data, error } = await supabase
    .from('safety_lane_waitlist')
    .insert([
      {
        email: formData.email,
        name: formData.name,
        user_type: formData.userType,
        location: formData.location,
        consent_communications: formData.consent,
        consent_data_processing: true,
        ip_address: await fetch('https://api.ipify.org?format=json')
          .then(r => r.json())
          .then(d => d.ip)
          .catch(() => null),
        user_agent: navigator.userAgent
      }
    ])
    .select()

  if (error) {
    console.error('Error submitting waitlist:', error)
    return { success: false, error }
  }

  return { success: true, data }
}
```

## 6. Query Waitlist Data

### Get all leads
```sql
SELECT * FROM safety_lane_waitlist 
ORDER BY created_at DESC;
```

### Get stats by user type
```sql
SELECT * FROM safety_lane_waitlist_stats;
```

### Get recent signups (last 7 days)
```sql
SELECT 
  user_type,
  COUNT(*) as count,
  ARRAY_AGG(email) as emails
FROM safety_lane_waitlist
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY user_type;
```

## 7. Export Data

### Via Supabase Studio
1. Go to **Table Editor**
2. Select `safety_lane_waitlist`
3. Click **Export** > **CSV**

### Via SQL
```sql
COPY (
  SELECT * FROM safety_lane_waitlist 
  ORDER BY created_at DESC
) TO '/tmp/waitlist_export.csv' WITH CSV HEADER;
```

## 8. Security Notes

- ✅ Row Level Security (RLS) is enabled
- ✅ Anonymous users can only INSERT (submit form)
- ✅ Service role has full access (for admin dashboard)
- ✅ Email is unique (prevents duplicate signups)
- ✅ Indexes created for performance

## 9. Environment Variables

Add to your `.env.local`:

```env
VITE_SUPABASE_URL=http://10.0.19.224:8000
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Add to your `.env.production`:

```env
VITE_SUPABASE_URL=https://supabase.projects.hitl.cloud
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 10. Testing

```bash
# Test insert via curl
curl -X POST 'http://10.0.19.224:8000/rest/v1/safety_lane_waitlist' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "user_type": "parent",
    "consent_communications": true,
    "consent_data_processing": true
  }'
```

## 11. Troubleshooting

### Can't connect to Supabase
- Check if Supabase containers are running: `docker ps | grep supabase`
- Verify port 8000 is accessible: `curl http://10.0.19.224:8000`

### RLS blocking inserts
- Verify policies are created: Check in Supabase Studio > Authentication > Policies
- Use service role key for admin operations

### Duplicate email error
- This is expected behavior (email is unique)
- Handle in frontend: Show "Already registered" message
