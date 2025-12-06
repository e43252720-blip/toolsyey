'use client'

import { useState } from 'react'

export default function UploadForm({ assignmentId }: { assignmentId: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setMessage('')
    const formData = new FormData()
    formData.append('file', file)
    formData.append('assignmentId', assignmentId)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      setMessage('Berhasil mengunggah file!')
      setFile(null)
    } else {
      setMessage('Gagal mengunggah file, coba lagi.')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleUpload} className="mt-4 space-y-3">
      <input
        type="file"
        className="input"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
        required
      />
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? 'Mengunggah...' : 'Upload File'}
      </button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  )
}
