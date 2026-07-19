import 'dotenv/config'
import { desc } from 'drizzle-orm'
import { getDb } from '../lib/db'
import { news } from '../lib/db/schema'

async function main() {
  const db = getDb()
  const items = await db.select().from(news).orderBy(desc(news.updatedAt))
  console.log(JSON.stringify(items.map((i) => ({ id: i.id, title: i.title, slug: i.slug, status: i.status })), null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
