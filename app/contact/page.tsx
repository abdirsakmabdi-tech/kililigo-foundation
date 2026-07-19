import { eq } from 'drizzle-orm'
import ContactForm from '@/components/ContactForm'
import { db, isDbConfigured } from '@/lib/db'
import { contactContent } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

const FALLBACK = {
  locationText: 'Haji Ali Road, Hantiwadag,\nGarowe, Somalia',
  email: 'info@kililigo.org',
}

export default async function ContactPage() {
  const row = isDbConfigured()
    ? (await db.select().from(contactContent).where(eq(contactContent.id, 'default')).limit(1))[0]
    : null

  return (
    <ContactForm
      details={{
        locationText: row?.locationText || FALLBACK.locationText,
        email: row?.email || FALLBACK.email,
      }}
    />
  )
}
