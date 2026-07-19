'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import FileUploadField from '@/components/admin/FileUploadField'
import type { ActionResult } from '@/app/admin/_actions/leaders'

type Values = {
  name?: string
  role?: string
  photoUrl?: string | null
  sortOrder?: number
  status?: string
}

type Props = {
  initial?: Values
  action: (formData: FormData) => Promise<ActionResult>
  submitLabel: string
}

export default function LeaderForm({ initial, action, submitLabel }: Props) {
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
      router.push('/admin/leaders')
      router.refresh()
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input name="name" required defaultValue={initial?.name} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Role</label>
        <input name="role" required defaultValue={initial?.role} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Sort order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={initial?.sortOrder ?? 0}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            defaultValue={initial?.status || 'draft'}
            className="mt-1 w-full rounded-md border px-3 py-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
      <FileUploadField
        name="photoUrl"
        label="Photo"
        accept="image/*"
        initialUrl={initial?.photoUrl}
        hint="Max 2 MB. Optional — a placeholder is shown if empty."
      />
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
