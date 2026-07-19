'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import type { ActionResult } from '@/app/admin/_actions/contact'

type Props = {
  initial?: { locationText?: string; email?: string }
  action: (formData: FormData) => Promise<ActionResult>
}

export default function ContactContentForm({ initial, action }: Props) {
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
      router.refresh()
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium">Location</label>
        <textarea
          name="locationText"
          rows={3}
          required
          defaultValue={initial?.locationText}
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="Address lines (use new lines for breaks)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          defaultValue={initial?.email}
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="info@example.org"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-white hover:bg-secondary/90 disabled:opacity-60"
      >
        {pending ? 'Saving…' : 'Save contact details'}
      </button>
    </form>
  )
}
