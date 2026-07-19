import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { getDb } from '../lib/db'
import { contactContent } from '../lib/db/schema'

async function seed() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')

  const db = getDb()
  const [existing] = await db.select().from(contactContent).where(eq(contactContent.id, 'default')).limit(1)

  if (existing) {
    console.log('Contact content already exists — skipped')
    return
  }

  await db.insert(contactContent).values({
    id: 'default',
    locationText: 'Haji Ali Road, Hantiwadag,\nGarowe, Somalia',
    email: 'info@kililigo.org',
    updatedAt: new Date(),
  })

  console.log('Created contact content')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
