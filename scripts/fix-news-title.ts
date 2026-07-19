import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { getDb } from '../lib/db'
import { news } from '../lib/db/schema'

async function main() {
  const db = getDb()
  const id = '957e0c16-72fd-4942-8a6d-7f92d3032ae4'
  const title = 'World Refugee Day 2026 in Bosaso'
  const excerpt =
    'On World Refugee Day 2026, KAALO Aid and Development proudly joined the global community in commemorating the day in Bosaso.'

  await db
    .update(news)
    .set({
      title,
      excerpt,
      updatedAt: new Date(),
    })
    .where(eq(news.id, id))

  console.log('Title:', title)
  console.log('Excerpt set from previous long title')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
