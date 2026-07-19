'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import FileUploadField from '@/components/admin/FileUploadField'
import type { ActionResult } from '@/app/admin/_actions/home'

type Values = {
  headlineLine1?: string
  headlineLine2?: string
  headlineAccent?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  introText?: string
  introBackgroundUrl?: string | null
  introCtaLabel?: string
  introCtaHref?: string
}

type Props = {
  initial?: Values
  action: (formData: FormData) => Promise<ActionResult>
}

export default function HomeContentForm({ initial, action }: Props) {
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
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl font-semibold text-footer-dark">Hero</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Headline line 1</label>
            <input
              name="headlineLine1"
              defaultValue={initial?.headlineLine1}
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="Empowering Communities,"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Headline line 2</label>
            <input
              name="headlineLine2"
              defaultValue={initial?.headlineLine2}
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="Restoring"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Accent word (primary color)</label>
          <input
            name="headlineAccent"
            defaultValue={initial?.headlineAccent}
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="Dignity."
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Subtitle</label>
          <textarea
            name="subtitle"
            rows={2}
            defaultValue={initial?.subtitle}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">CTA label</label>
            <input name="ctaLabel" defaultValue={initial?.ctaLabel} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">CTA link</label>
            <input name="ctaHref" defaultValue={initial?.ctaHref} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>
        </div>
      </section>

      <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl font-semibold text-footer-dark">Hero intro</h2>
        <div>
          <label className="block text-sm font-medium">Intro text</label>
          <textarea
            name="introText"
            rows={5}
            defaultValue={initial?.introText}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
        <FileUploadField
          name="introBackgroundUrl"
          label="Intro background image"
          accept="image/*"
          initialUrl={initial?.introBackgroundUrl}
          hint="Max 2 MB."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Intro CTA label</label>
            <input
              name="introCtaLabel"
              defaultValue={initial?.introCtaLabel}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Intro CTA link</label>
            <input
              name="introCtaHref"
              defaultValue={initial?.introCtaHref}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </div>
        </div>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-white hover:bg-secondary/90 disabled:opacity-60"
      >
        {pending ? 'Saving…' : 'Save home content'}
      </button>
    </form>
  )
}
