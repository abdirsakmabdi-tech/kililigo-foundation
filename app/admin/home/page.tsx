import { eq } from 'drizzle-orm'
import HomeContentForm from '@/components/admin/HomeContentForm'
import DbNotice from '@/components/admin/DbNotice'
import { updateHomeContent } from '@/app/admin/_actions/home'
import { db, isDbConfigured } from '@/lib/db'
import { homeContent } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function AdminHomePage() {
  if (!isDbConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-3xl font-semibold text-footer-dark">Home</h1>
        <div className="mt-6">
          <DbNotice />
        </div>
      </div>
    )
  }

  const [row] = await db.select().from(homeContent).where(eq(homeContent.id, 'default')).limit(1)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold text-footer-dark">Home content</h1>
        <p className="text-gray-600">Edit hero copy, CTA, and the intro section below the hero.</p>
      </div>
      <HomeContentForm
        initial={{
          headlineLine1: row?.headlineLine1 || '',
          headlineLine2: row?.headlineLine2 || '',
          headlineAccent: row?.headlineAccent || '',
          subtitle: row?.subtitle || '',
          ctaLabel: row?.ctaLabel || '',
          ctaHref: row?.ctaHref || '',
          introText: row?.introText || '',
          introBackgroundUrl: row?.introBackgroundUrl,
          introCtaLabel: row?.introCtaLabel || '',
          introCtaHref: row?.introCtaHref || '',
        }}
        action={updateHomeContent}
      />
    </div>
  )
}
