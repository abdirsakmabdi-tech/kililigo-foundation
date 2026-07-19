import Link from 'next/link'
import { desc } from 'drizzle-orm'
import { db, isDbConfigured } from '@/lib/db'
import { news } from '@/lib/db/schema'
import { deleteNews } from '@/app/admin/_actions/news'
import DeleteButton from '@/components/admin/DeleteButton'
import DbNotice from '@/components/admin/DbNotice'

export const dynamic = 'force-dynamic'

export default async function AdminNewsPage() {
  if (!isDbConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-3xl font-semibold text-footer-dark">News</h1>
        <div className="mt-6">
          <DbNotice />
        </div>
      </div>
    )
  }

  const items = await db.select().from(news).orderBy(desc(news.updatedAt))

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-footer-dark">News</h1>
          <p className="text-gray-600">Create and publish news posts.</p>
        </div>
        <Link
          href="/admin/news/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
        >
          New post
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {items.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">No news yet. Create your first post.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                  <td className="px-4 py-3 capitalize">{item.status}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="space-x-3 px-4 py-3">
                    <Link href={`/admin/news/${item.id}`} className="text-secondary hover:underline">
                      Edit
                    </Link>
                    <DeleteButton id={item.id} action={deleteNews} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
