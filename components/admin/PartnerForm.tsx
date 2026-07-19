'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import FileUploadField from '@/components/admin/FileUploadField'
import type { ActionResult } from '@/app/admin/_actions/partners'

type Values = {
  name?: string
  fullName?: string
  logoUrl?: string | null
  websiteUrl?: string | null
  tall?: boolean
  sortOrder?: number
  status?: string
}

type Props = {
  initial?: Values
  action: (formData: FormData) => Promise<ActionResult>
  submitLabel: string
}

export default function PartnerForm({ initial, action, submitLabel }: Props) {
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
      router.push('/admin/partners')
      router.refresh()
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium">Short name</label>
        <input name="name" required defaultValue={initial?.name} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Full name</label>
        <input name="fullName" defaultValue={initial?.fullName} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <FileUploadField
        name="logoUrl"
        label="Logo"
        accept="image/*"
        initialUrl={initial?.logoUrl}
        hint="Upload a logo, or paste an image URL in the field after upload."
      />
      <div>
        <label className="block text-sm font-medium">Website URL (optional)</label>
        <input
          name="websiteUrl"
          type="text"
          defaultValue={initial?.websiteUrl || ''}
          placeholder="https://"
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
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
      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          name="tall"
          value="true"
          defaultChecked={initial?.tall ?? false}
          className="h-4 w-4 rounded border-gray-300"
        />
        Tall logo (e.g. UNHCR)
      </label>
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
