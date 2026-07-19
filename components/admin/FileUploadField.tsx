'use client'

import { useState } from 'react'

type Props = {
  name: string
  label: string
  accept: string
  initialUrl?: string | null
  hint?: string
}

export default function FileUploadField({ name, label, accept, initialUrl, hint }: Props) {
  const [url, setUrl] = useState(initialUrl || '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const body = new FormData()
      body.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Upload failed')
        return
      }
      setUrl(data.url)
    } catch {
      setError('Upload failed. You can paste a URL instead.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type="hidden" name={name} value={url} />
      <input
        type="file"
        accept={accept}
        onChange={onFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-secondary/90"
      />
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Or paste an image/PDF URL"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
      <p className="text-xs text-gray-500">
        {hint || 'Max 2 MB images / 5 MB PDFs. Local uploads use /uploads/cms; on Vercel set BLOB_READ_WRITE_TOKEN.'}
      </p>
      {uploading && <p className="text-xs text-secondary">Uploading…</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
      {url && accept.includes('image') && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="Preview" className="mt-2 h-28 w-auto rounded-md object-cover" />
      )}
    </div>
  )
}
