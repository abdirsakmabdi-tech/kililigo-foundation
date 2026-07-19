import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import ProgramForm from '@/components/admin/ProgramForm'
import { updateProgram } from '@/app/admin/_actions/programs'
import { db } from '@/lib/db'
import { programs } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function EditProgramPage({ params }: { params: { id: string } }) {
  const [item] = await db.select().from(programs).where(eq(programs.id, params.id)).limit(1)
  if (!item) notFound()

  async function action(formData: FormData) {
    'use server'
    return updateProgram(params.id, formData)
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">Edit program</h1>
      <ProgramForm
        initial={{
          title: item.title,
          slug: item.slug,
          description: item.description,
          category: item.category,
          coverImageUrl: item.coverImageUrl,
          programGroup: item.programGroup,
          sortOrder: item.sortOrder,
          showOnHome: item.showOnHome,
          status: item.status,
        }}
        action={action}
        submitLabel="Save changes"
      />
    </div>
  )
}
