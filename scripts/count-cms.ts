import 'dotenv/config'
import { count } from 'drizzle-orm'
import { getDb } from '../lib/db'
import {
  aboutContent,
  contactContent,
  coreValues,
  heroSlides,
  homeContent,
  leaders,
  news,
  partners,
  programs,
  vacancies,
} from '../lib/db/schema'

async function main() {
  const db = getDb()
  const tables = {
    news,
    programs,
    vacancies,
    leaders,
    coreValues,
    partners,
    heroSlides,
    homeContent,
    aboutContent,
    contactContent,
  } as const

  for (const [name, table] of Object.entries(tables)) {
    const [row] = await db.select({ value: count() }).from(table)
    console.log(`${name}: ${row.value}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
