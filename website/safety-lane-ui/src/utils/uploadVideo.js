import { supabase } from '../config/supabase'

/**
 * Upload video to Supabase Storage
 * @param {File} file - Video file to upload
 * @param {string} folder - Optional folder path (e.g., 'demos', 'testimonials')
 * @returns {Promise<{url: string, path: string, error: null} | {error: string}>}
 */
export async function uploadVideo(file, folder = '') {
  try {
    // Validate file type
    if (!file.type.startsWith('video/')) {
      return { error: 'Please upload a video file' }
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return { error: 'Video must be less than 50MB' }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(7)
    const fileExt = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return { error: 'Failed to upload video' }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('assets')
      .getPublicUrl(filePath)

    return {
      url: publicUrl,
      path: filePath,
      error: null
    }
  } catch (err) {
    console.error('Upload exception:', err)
    return { error: 'Upload failed' }
  }
}

/**
 * Delete video from Supabase Storage
 * @param {string} path - File path in storage
 * @returns {Promise<{success: boolean, error: null} | {error: string}>}
 */
export async function deleteVideo(path) {
  try {
    const { error } = await supabase.storage
      .from('assets')
      .remove([path])

    if (error) {
      return { error: 'Failed to delete video' }
    }

    return { success: true, error: null }
  } catch (err) {
    return { error: 'Delete failed' }
  }
}
