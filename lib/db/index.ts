import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

type Db = ReturnType<typeof drizzle<typeof schema>>

const globalForDb = globalThis as unknown as { __db?: Db }

export function isDbConfigured() {
  return !!process.env.DATABASE_URL
}

export function getDb(): Db {
  if (globalForDb.__db) return globalForDb.__db

  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set. Add it to .env.local (see .env.example).')
  }

  const sql = neon(url)
  const db = drizzle(sql, { schema })
  globalForDb.__db = db
  return db
}

export const db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const real = getDb()
    const value = Reflect.get(real, prop, receiver)
    return typeof value === 'function' ? value.bind(real) : value
  },
})
