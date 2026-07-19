import { auth } from '@/lib/auth'
import AdminNav from '@/components/admin/AdminNav'
import AdminProviders from '@/components/admin/AdminProviders'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <AdminProviders>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {session?.user && <AdminNav userName={session.user.name || session.user.email} />}
        <div className={session?.user ? 'lg:pl-60' : ''}>
          <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
        </div>
      </div>
    </AdminProviders>
  )
}
