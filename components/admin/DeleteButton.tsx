'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function DeleteButton({
  id,
  action,
}: {
  id: string
  action: (id: string) => Promise<{ ok: boolean; error?: string }>
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm('Delete this item permanently?')) return
        startTransition(async () => {
          const result = await action(id)
          if (!result.ok) {
            alert(result.error || 'Delete failed')
            return
          }
          router.refresh()
        })
      }}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  )
}
