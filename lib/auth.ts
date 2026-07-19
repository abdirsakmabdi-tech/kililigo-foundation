import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { getDb, isDbConfigured } from '@/lib/db'
import { users } from '@/lib/db/schema'

const DEFAULT_ADMIN_EMAIL = 'admin@kililigo.org'
const DEFAULT_ADMIN_PASSWORD = 'Admin@123'
const DEFAULT_ADMIN_NAME = 'Admin'

function envAdmin() {
  return {
    email: (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase().trim(),
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
    name: process.env.ADMIN_NAME || DEFAULT_ADMIN_NAME,
  }
}

async function ensureEnvAdminInDb(email: string, password: string, name: string) {
  if (!isDbConfigured()) return null
  try {
    const db = getDb()
    const passwordHash = await bcrypt.hash(password, 12)
    const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
    if (existing) {
      await db.update(users).set({ passwordHash, name, role: 'admin' }).where(eq(users.email, email))
      return { id: existing.id, email: existing.email, name, role: 'admin' }
    }
    const [created] = await db
      .insert(users)
      .values({ email, passwordHash, name, role: 'admin' })
      .returning()
    return { id: created.id, email: created.email, name: created.name, role: created.role }
  } catch {
    return null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const emailRaw = credentials?.email
        const password = credentials?.password
        if (typeof emailRaw !== 'string' || typeof password !== 'string') return null

        const email = emailRaw.toLowerCase().trim()
        const bootstrap = envAdmin()

        if (email === bootstrap.email && password === bootstrap.password) {
          const fromDb = await ensureEnvAdminInDb(bootstrap.email, bootstrap.password, bootstrap.name)
          if (fromDb) return fromDb
          return { id: 'env-admin', email: bootstrap.email, name: bootstrap.name, role: 'admin' }
        }

        if (!isDbConfigured()) return null

        try {
          const db = getDb()
          const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
          if (!user) return null
          const valid = await bcrypt.compare(password, user.passwordHash)
          if (!valid) return null
          return { id: user.id, email: user.email, name: user.name, role: user.role }
        } catch {
          return null
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role ?? 'admin'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = (token.role as string) ?? 'admin'
      }
      return session
    },
  },
})
