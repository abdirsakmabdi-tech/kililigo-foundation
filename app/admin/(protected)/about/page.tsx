import { eq } from 'drizzle-orm'
import AboutContentForm from '@/components/admin/AboutContentForm'
import DbNotice from '@/components/admin/DbNotice'
import { updateAboutContent } from '@/app/admin/_actions/about'
import { db, isDbConfigured } from '@/lib/db'
import { aboutContent } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function AdminAboutPage() {
  if (!isDbConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-3xl font-semibold text-footer-dark">About</h1>
        <div className="mt-6">
          <DbNotice />
        </div>
      </div>
    )
  }

  const [row] = await db.select().from(aboutContent).where(eq(aboutContent.id, 'default')).limit(1)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold text-footer-dark">About content</h1>
        <p className="text-gray-600">Edit the Mission and Vision text on the About page.</p>
      </div>
      <AboutContentForm
        initial={{
          missionText: row?.missionText || '',
          visionText: row?.visionText || '',
        }}
        action={updateAboutContent}
      />
    </div>
  )
}
