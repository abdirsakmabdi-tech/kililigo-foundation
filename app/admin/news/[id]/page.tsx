import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import NewsForm from '@/components/admin/NewsForm'
import { updateNews } from '@/app/admin/_actions/news'
import { db } from '@/lib/db'
import { news } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const [item] = await db.select().from(news).where(eq(news.id, params.id)).limit(1)
  if (!item) notFound()

  async function action(formData: FormData) {
    'use server'
    return updateNews(params.id, formData)
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">Edit news post</h1>
      <NewsForm
        initial={{
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          body: item.body,
          coverImageUrl: item.coverImageUrl,
          status: item.status,
        }}
        action={action}
        submitLabel="Save changes"
      />
    </div>
  )
}
