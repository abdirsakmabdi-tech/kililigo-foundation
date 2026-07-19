import Link from 'next/link'

export function NewsHero({
  eyebrow,
  title,
  size = 'page',
}: {
  eyebrow: string
  title: string
  size?: 'page' | 'article'
}) {
  const isArticle = size === 'article'

  return (
    <div className={`relative bg-secondary pb-0 ${isArticle ? 'pt-14 md:pt-20' : 'pt-16 md:pt-24'}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full bg-white/5" />
        <div className="absolute right-32 top-12 h-[300px] w-[300px] rounded-full bg-white/5" />
      </div>

      <div
        className={`relative mx-auto px-4 sm:px-6 lg:px-8 ${
          isArticle ? 'max-w-3xl pb-14 md:pb-20' : 'max-w-7xl pb-20 md:pb-28'
        }`}
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-sm backdrop-blur-sm">
            {eyebrow}
          </span>
          <span className="hidden h-px w-12 bg-primary sm:block" aria-hidden />
        </div>

        <h1
          className={
            isArticle
              ? 'w-full font-sans text-xl font-semibold leading-snug text-white sm:text-2xl md:text-3xl'
              : 'max-w-4xl font-sans text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl'
          }
        >
          {title}
        </h1>
      </div>

      <div className="relative w-full leading-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </div>
  )
}

export function formatDate(value: Date | string | null | undefined) {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function ContentBody({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  if (paragraphs.length === 0) {
    return <p className="text-gray-500">No content yet.</p>
  }

  return (
    <div className="space-y-5 font-sans text-base leading-[1.8] text-gray-700 md:text-[1.05rem] md:leading-[1.85]">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
      <p className="mb-4 font-sans text-2xl font-bold text-gray-900 md:text-3xl">{title}</p>
      <p className="font-sans text-gray-600">{message}</p>
      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-secondary hover:underline">
        Back to home
      </Link>
    </div>
  )
}
