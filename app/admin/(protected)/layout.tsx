import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Server-side auth guard for every admin page except /admin/login.
// Middleware also redirects unauthenticated users, but this ensures no
// admin data is ever rendered without a valid session (defense in depth).
export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  return <>{children}</>
}
