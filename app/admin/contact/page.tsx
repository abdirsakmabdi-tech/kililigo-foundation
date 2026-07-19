import { eq } from 'drizzle-orm'
import ContactContentForm from '@/components/admin/ContactContentForm'
import DbNotice from '@/components/admin/DbNotice'
import { updateContactContent } from '@/app/admin/_actions/contact'
import { db, isDbConfigured } from '@/lib/db'
import { contactContent } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function AdminContactPage() {
  if (!isDbConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-3xl font-semibold text-footer-dark">Contact</h1>
        <div className="mt-6">
          <DbNotice />
        </div>
      </div>
    )
  }

  const [row] = await db.select().from(contactContent).where(eq(contactContent.id, 'default')).limit(1)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold text-footer-dark">Contact details</h1>
        <p className="text-gray-600">Edit the Location and Email shown on the Contact Us page.</p>
      </div>
      <ContactContentForm
        initial={{
          locationText: row?.locationText || '',
          email: row?.email || '',
        }}
        action={updateContactContent}
      />
    </div>
  )
}
