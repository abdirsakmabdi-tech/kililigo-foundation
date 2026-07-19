'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { ActionResult } from '@/app/admin/_actions/vacancies'

type Values = {
  title?: string
  slug?: string
  location?: string
  employmentType?: string
  description?: string
  applyEmail?: string
  deadline?: string | null
  status?: string
}

type Props = {
  initial?: Values
  action: (formData: FormData) => Promise<ActionResult>
  submitLabel: string
}

export default function VacancyForm({ initial, action, submitLabel }: Props) {
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
      router.push('/admin/vacancies')
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
        <input name="slug" defaultValue={initial?.slug} className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input name="location" defaultValue={initial?.location} className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Employment type</label>
          <input
            name="employmentType"
            defaultValue={initial?.employmentType || 'Full-time'}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Description (Markdown)</label>
        <textarea
          name="description"
          rows={10}
          defaultValue={initial?.description}
          className="mt-1 w-full rounded-md border px-3 py-2 font-mono text-sm"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Apply email</label>
          <input
            name="applyEmail"
            type="email"
            defaultValue={initial?.applyEmail}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <input
            name="deadline"
            type="date"
            defaultValue={initial?.deadline || ''}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select name="status" defaultValue={initial?.status || 'open'} className="mt-1 w-full rounded-md border px-3 py-2">
          <option value="open">Open</option>
          <option value="closed">Closed</option>
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
