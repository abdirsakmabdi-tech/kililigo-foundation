import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import CoreValueForm from '@/components/admin/CoreValueForm'
import { updateCoreValue } from '@/app/admin/_actions/core-values'
import { db } from '@/lib/db'
import { coreValues } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function EditCoreValuePage({ params }: { params: { id: string } }) {
  const [item] = await db.select().from(coreValues).where(eq(coreValues.id, params.id)).limit(1)
  if (!item) notFound()

  async function action(formData: FormData) {
    'use server'
    return updateCoreValue(params.id, formData)
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">Edit core value</h1>
      <CoreValueForm
        initial={{
          title: item.title,
          description: item.description,
          sortOrder: item.sortOrder,
          status: item.status,
        }}
        action={action}
        submitLabel="Save changes"
      />
    </div>
  )
}
