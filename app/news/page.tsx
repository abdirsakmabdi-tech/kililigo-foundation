import type { Metadata } from 'next'
import { desc, eq } from 'drizzle-orm'
import { db, isDbConfigured } from '@/lib/db'
import { news, vacancies } from '@/lib/db/schema'
import { NewsHero } from '@/components/news/NewsShared'
import NewsTabs from '@/components/news/NewsTabs'

export const metadata: Metadata = {
  title: 'News | Kililigo Foundation',
  description: 'Stay updated with the latest news and job openings from Kililigo Foundation.',
}

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const newsItems = isDbConfigured()
    ? (
        await db
          .select({
            id: news.id,
            slug: news.slug,
            title: news.title,
            excerpt: news.excerpt,
            coverImageUrl: news.coverImageUrl,
            publishedAt: news.publishedAt,
            createdAt: news.createdAt,
          })
          .from(news)
          .where(eq(news.status, 'published'))
          .orderBy(desc(news.publishedAt), desc(news.updatedAt))
      ).map((item) => ({
        ...item,
        publishedAt: item.publishedAt ? item.publishedAt.toISOString() : null,
        createdAt: item.createdAt.toISOString(),
      }))
    : []

  const openVacancies = isDbConfigured()
    ? (
        await db
          .select({
            id: vacancies.id,
            title: vacancies.title,
            location: vacancies.location,
            employmentType: vacancies.employmentType,
            description: vacancies.description,
            applyEmail: vacancies.applyEmail,
            deadline: vacancies.deadline,
          })
          .from(vacancies)
          .where(eq(vacancies.status, 'open'))
          .orderBy(desc(vacancies.updatedAt))
      ).map((item) => ({
        ...item,
        deadline: item.deadline ? item.deadline.toISOString() : null,
      }))
    : []

  return (
    <div className="bg-white pt-16 md:pt-20">
      <NewsHero eyebrow="News & Updates" title="News" />

      <div className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsTabs newsItems={newsItems} vacancies={openVacancies} />
        </div>
      </div>
    </div>
  )
}
