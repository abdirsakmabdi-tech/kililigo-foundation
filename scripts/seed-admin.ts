import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { getDb } from '../lib/db'
import { users } from '../lib/db/schema'

async function seed() {
  const email = (process.env.ADMIN_EMAIL || 'admin@kililigo.org').toLowerCase().trim()
  const password = process.env.ADMIN_PASSWORD || 'Admin@123'
  const name = process.env.ADMIN_NAME || 'Admin'

  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')

  const db = getDb()
  const passwordHash = await bcrypt.hash(password, 12)
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)

  if (existing) {
    await db.update(users).set({ passwordHash, name, role: 'admin' }).where(eq(users.email, email))
    console.log(`Updated admin user: ${email}`)
  } else {
    await db.insert(users).values({ email, passwordHash, name, role: 'admin' })
    console.log(`Created admin user: ${email}`)
  }

  console.log('Done. Sign in at /admin/login')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
