import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import LeaderForm from '@/components/admin/LeaderForm'
import { updateLeader } from '@/app/admin/_actions/leaders'
import { db } from '@/lib/db'
import { leaders } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function EditLeaderPage({ params }: { params: { id: string } }) {
  const [item] = await db.select().from(leaders).where(eq(leaders.id, params.id)).limit(1)
  if (!item) notFound()

  async function action(formData: FormData) {
    'use server'
    return updateLeader(params.id, formData)
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">Edit leader</h1>
      <LeaderForm
        initial={{
          name: item.name,
          role: item.role,
          photoUrl: item.photoUrl,
          sortOrder: item.sortOrder,
          status: item.status,
        }}
        action={action}
        submitLabel="Save changes"
      />
    </div>
  )
}
