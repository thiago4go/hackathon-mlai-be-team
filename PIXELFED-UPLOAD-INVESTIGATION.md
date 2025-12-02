# Pixelfed Upload Issue - Investigation Report

**Date**: 2025-12-01  
**Branch**: fix/pixelfed-upload-issue  
**Status**: Partially Fixed - Database migrations needed

---

## Issue Summary

Media upload via Pixelfed web interface fails with HTTP 500 error.

---

## Root Causes Identified

### 1. Missing Database Columns ✅ FIXED
**Error**: `column "storage_used" of relation "users" does not exist`

**Fix Applied**:
```sql
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS storage_used BIGINT DEFAULT 0, 
ADD COLUMN IF NOT EXISTS storage_used_updated_at TIMESTAMP;
```

**Result**: Upload now works, but publish still fails.

### 2. Missing Database Tables
**Errors Found**:
- `relation "custom_emoji" does not exist`
- `relation "user_domain_blocks" does not exist`

**Status**: Not fixed - requires full migration run

### 3. Filesystem Configuration ✅ FIXED
**Issue**: Pixelfed configured for S3 but no S3 available

**Fix Applied**:
```env
FILESYSTEM_CLOUD="local"  # Changed from "s3"
```

---

## Progress Made

### ✅ Working
- Storage permissions fixed
- Filesystem changed to local
- `storage_used` columns added
- Media upload endpoint accepts files

### ⚠️ Still Failing
- Post publish endpoint (500 error)
- Missing database tables
- Incomplete migrations

---

## Recommended Solution

### Option 1: Run Full Migrations (Recommended)
```bash
docker exec mlai-pixelfed php artisan migrate:fresh --seed
```
**Warning**: This will reset all data

### Option 2: Run Pending Migrations Only
```bash
docker exec mlai-pixelfed php artisan migrate --force
```
**Note**: May have conflicts with existing schema

### Option 3: Create Missing Tables Manually
Create tables:
- `custom_emoji`
- `user_domain_blocks`
- Any other missing tables from migrations

---

## MVP Status

**Important**: The core MVP functionality works without Pixelfed UI:

✅ **Working via Webhook**:
```bash
curl -X POST http://localhost:5679/webhook/chore-webhook \
  -H "Content-Type: application/json" \
  -d '{"caption": "I cleaned my room!", "user_id": 5}'
```

**Result**: 
- AI analyzes chore ✅
- XP updated in database ✅
- Tokens accumulated ✅

---

## Files Modified

1. **Database Schema**:
   - Added `storage_used` columns to `users` table
   - Created `user_gamification` table (working)

2. **Configuration**:
   - Changed `FILESYSTEM_CLOUD` to `local` in `.env`

---

## Testing Performed

### Test 1: Storage Columns
```sql
ALTER TABLE users ADD COLUMN storage_used BIGINT DEFAULT 0;
```
✅ Success - Upload endpoint now accepts files

### Test 2: Media Upload
- Upload image via web UI
- Result: File uploaded but publish fails

### Test 3: Direct Webhook
- Bypass Pixelfed UI entirely
- Result: ✅ Full flow works (AI + XP)

---

## Conclusion

The Pixelfed instance needs complete database migrations to function properly. However, **the MVP core functionality is proven and working** via direct webhook integration.

### Recommendation for Hackathon

**Use the working webhook approach**:
- Demonstrate AI agent with simulated posts
- Show XP accumulation in database
- Explain Pixelfed UI is optional for MVP

**Post-Hackathon**:
- Run full migrations on fresh Pixelfed instance
- Or use different social platform (Mastodon, custom UI)

---

## Commands Reference

### Check Missing Tables
```bash
docker exec mlai-postgres psql -U postgres -d pixelfed -c "\dt"
```

### View Pending Migrations
```bash
docker exec mlai-pixelfed php artisan migrate:status
```

### Clear All Caches
```bash
docker exec mlai-pixelfed php artisan optimize:clear
```

---

## Next Steps

1. ✅ Document findings (this file)
2. ✅ Commit changes to branch
3. ✅ Create Pull Request
4. ⏭️ Decision: Fresh migration or alternative approach
