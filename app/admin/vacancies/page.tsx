import Link from 'next/link'
import { desc } from 'drizzle-orm'
import { db, isDbConfigured } from '@/lib/db'
import { vacancies } from '@/lib/db/schema'
import { deleteVacancy } from '@/app/admin/_actions/vacancies'
import DeleteButton from '@/components/admin/DeleteButton'
import DbNotice from '@/components/admin/DbNotice'

export const dynamic = 'force-dynamic'

export default async function AdminVacanciesPage() {
  if (!isDbConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-3xl font-semibold text-footer-dark">Vacancies</h1>
        <div className="mt-6">
          <DbNotice />
        </div>
      </div>
    )
  }

  const items = await db.select().from(vacancies).orderBy(desc(vacancies.updatedAt))

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-footer-dark">Vacancies</h1>
          <p className="text-gray-600">Post and manage job openings.</p>
        </div>
        <Link
          href="/admin/vacancies/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
        >
          New vacancy
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {items.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">No vacancies yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3 capitalize">{item.status}</td>
                  <td className="px-4 py-3 text-gray-500">{item.location || '—'}</td>
                  <td className="space-x-3 px-4 py-3">
                    <Link href={`/admin/vacancies/${item.id}`} className="text-secondary hover:underline">
                      Edit
                    </Link>
                    <DeleteButton id={item.id} action={deleteVacancy} />
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
