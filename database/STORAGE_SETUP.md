# Supabase Storage Setup - Video Uploads

## ✅ Bucket Created

**Bucket:** `assets`
- **Public:** Yes
- **Max File Size:** 50MB
- **Allowed Types:** MP4, JPEG, PNG, GIF, WebP

## 📝 Policies

- ✅ Public uploads allowed
- ✅ Public reads allowed
- ✅ Public updates allowed

## 🔗 URLs

### Upload Endpoint
```
POST http://10.0.19.224:8000/storage/v1/object/assets/{path}
```

### Public URL Format
```
http://10.0.19.224:8000/storage/v1/object/public/assets/{path}
```

## 💻 Usage in Frontend

### 1. Upload Video
```javascript
import { uploadVideo } from '../utils/uploadVideo'

const handleUpload = async (file) => {
  const result = await uploadVideo(file, 'demos')
  
  if (result.error) {
    console.error(result.error)
  } else {
    console.log('Video URL:', result.url)
    console.log('Storage path:', result.path)
  }
}
```

### 2. Use Upload Component
```jsx
import VideoUpload from '../components/VideoUpload'

function MyComponent() {
  const handleUploadComplete = (result) => {
    console.log('Uploaded:', result.url)
    // Save URL to database or use in UI
  }

  return <VideoUpload onUploadComplete={handleUploadComplete} />
}
```

### 3. Direct Upload (Advanced)
```javascript
import { supabase } from '../config/supabase'

const file = event.target.files[0]
const filePath = `demos/${Date.now()}-${file.name}`

const { data, error } = await supabase.storage
  .from('assets')
  .upload(filePath, file)

if (!error) {
  const { data: { publicUrl } } = supabase.storage
    .from('assets')
    .getPublicUrl(filePath)
  
  console.log('Public URL:', publicUrl)
}
```

## 🧪 Test Upload via curl

```bash
# Get anon key
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"

# Upload video
curl -X POST \
  "http://10.0.19.224:8000/storage/v1/object/assets/test-video.mp4" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: video/mp4" \
  --data-binary "@/path/to/video.mp4"

# Get public URL
echo "http://10.0.19.224:8000/storage/v1/object/public/assets/test-video.mp4"
```

## 📊 View Uploaded Files

### Via SQL
```sql
SELECT 
  name,
  bucket_id,
  created_at,
  metadata->>'size' as size_bytes,
  metadata->>'mimetype' as mime_type
FROM storage.objects
WHERE bucket_id = 'assets'
ORDER BY created_at DESC;
```

### Via Supabase Studio
1. Go to **Storage** in Supabase Studio
2. Select **assets** bucket
3. View all uploaded files

## 🗑️ Delete Files

### Via Frontend
```javascript
import { deleteVideo } from '../utils/uploadVideo'

await deleteVideo('demos/1234567890-abc123.mp4')
```

### Via SQL
```sql
DELETE FROM storage.objects 
WHERE bucket_id = 'assets' 
AND name = 'demos/1234567890-abc123.mp4';
```

## 🔒 Security Notes

- ✅ Public bucket (anyone can upload/read)
- ⚠️ Consider adding rate limiting in production
- ⚠️ Consider adding file validation (virus scan)
- ⚠️ Consider adding user authentication for uploads

## 📈 Storage Limits

- **Per File:** 50MB
- **Total Storage:** Unlimited (self-hosted)
- **Bandwidth:** Unlimited (self-hosted)

## 🚨 Troubleshooting

### Upload fails with 403
- Check bucket policies are created
- Verify anon key is correct

### File not accessible
- Ensure bucket is public
- Check file path is correct

### Large files timeout
- Increase nginx timeout in Supabase config
- Consider chunked uploads for files >50MB
