import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import PartnerForm from '@/components/admin/PartnerForm'
import { updatePartner } from '@/app/admin/_actions/partners'
import { db } from '@/lib/db'
import { partners } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const [item] = await db.select().from(partners).where(eq(partners.id, params.id)).limit(1)
  if (!item) notFound()

  async function action(formData: FormData) {
    'use server'
    return updatePartner(params.id, formData)
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">Edit partner</h1>
      <PartnerForm
        initial={{
          name: item.name,
          fullName: item.fullName,
          logoUrl: item.logoUrl,
          websiteUrl: item.websiteUrl,
          tall: item.tall,
          sortOrder: item.sortOrder,
          status: item.status,
        }}
        action={action}
        submitLabel="Save changes"
      />
    </div>
  )
}
