'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import FileUploadField from '@/components/admin/FileUploadField'
import type { ActionResult } from '@/app/admin/_actions/news'

type NewsValues = {
  title?: string
  slug?: string
  excerpt?: string
  body?: string
  coverImageUrl?: string | null
  status?: string
}

type Props = {
  initial?: NewsValues
  action: (formData: FormData) => Promise<ActionResult>
  submitLabel: string
}

export default function NewsForm({ initial, action, submitLabel }: Props) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setError('')
    startTransition(async () => {
      const result = await action(formData)
      if (!result.ok) {
        setError(result.error)
        return
      }
      router.push('/admin/news')
      router.refresh()
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input name="title" required defaultValue={initial?.title} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Slug (optional)</label>
        <input name="slug" defaultValue={initial?.slug} className="mt-1 w-full rounded-md border px-3 py-2" placeholder="auto-from-title" />
      </div>
      <div>
        <label className="block text-sm font-medium">Excerpt</label>
        <textarea name="excerpt" rows={2} defaultValue={initial?.excerpt} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Body (Markdown)</label>
        <textarea name="body" rows={10} defaultValue={initial?.body} className="mt-1 w-full rounded-md border px-3 py-2 font-mono text-sm" />
      </div>
      <FileUploadField
        name="coverImageUrl"
        label="Cover image"
        accept="image/*"
        initialUrl={initial?.coverImageUrl}
        hint="Max 2 MB. File uploads are saved automatically."
      />
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select name="status" defaultValue={initial?.status || 'draft'} className="mt-1 w-full rounded-md border px-3 py-2">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-white hover:bg-secondary/90 disabled:opacity-60"
      >
        {pending ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
