import React, { useState } from 'react'
import { uploadVideo } from '../utils/uploadVideo'

export default function VideoUpload({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setError(null)
    setProgress(0)

    // Simulate progress (Supabase doesn't provide real-time progress)
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90))
    }, 200)

    const result = await uploadVideo(file, 'demos')

    clearInterval(progressInterval)
    setProgress(100)

    if (result.error) {
      setError(result.error)
      setUploading(false)
    } else {
      setTimeout(() => {
        setUploading(false)
        setProgress(0)
        if (onUploadComplete) {
          onUploadComplete(result)
        }
      }, 500)
    }
  }

  return (
    <div className="w-full">
      <label className="block">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-safety-500 transition-colors cursor-pointer">
          {uploading ? (
            <div>
              <div className="text-4xl mb-2">⏳</div>
              <p className="text-slate-600 mb-2">Uploading... {progress}%</p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-safety-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-2">🎥</div>
              <p className="text-slate-600 mb-1">Click to upload video</p>
              <p className="text-xs text-slate-400">MP4, max 50MB</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="video/mp4,video/quicktime"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
