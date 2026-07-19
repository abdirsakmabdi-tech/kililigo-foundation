import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { and, eq } from 'drizzle-orm'
import { db, isDbConfigured } from '@/lib/db'
import { news } from '@/lib/db/schema'
import { ContentBody, NewsHero, formatDate } from '@/components/news/NewsShared'

export const dynamic = 'force-dynamic'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isDbConfigured()) return { title: 'News | Kililigo Foundation' }
  const [item] = await db
    .select()
    .from(news)
    .where(and(eq(news.slug, params.slug), eq(news.status, 'published')))
    .limit(1)
  if (!item) return { title: 'News | Kililigo Foundation' }
  return {
    title: `${item.title} | Kililigo Foundation`,
    description: item.excerpt || undefined,
  }
}

export default async function NewsDetailPage({ params }: Props) {
  if (!isDbConfigured()) notFound()

  const [item] = await db
    .select()
    .from(news)
    .where(and(eq(news.slug, params.slug), eq(news.status, 'published')))
    .limit(1)

  if (!item) notFound()

  const date = formatDate(item.publishedAt ?? item.createdAt)

  return (
    <div className="bg-white pt-16 md:pt-20">
      <NewsHero eyebrow="News" title={item.title} size="article" />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
            News
          </span>
          {date && <time>{date}</time>}
          <Link href="/news" className="font-semibold text-secondary hover:underline">
            ← All news
          </Link>
        </div>

        {item.coverImageUrl && (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-card bg-gray-100">
            <Image
              src={item.coverImageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized={item.coverImageUrl.startsWith('/')}
              priority
            />
          </div>
        )}

        {item.excerpt && (
          <p className="mb-8 text-lg font-medium leading-relaxed text-gray-700 md:text-xl">{item.excerpt}</p>
        )}

        <ContentBody text={item.body} />
      </article>
    </div>
  )
}
