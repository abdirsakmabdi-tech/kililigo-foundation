import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import VacancyForm from '@/components/admin/VacancyForm'
import { updateVacancy } from '@/app/admin/_actions/vacancies'
import { db } from '@/lib/db'
import { vacancies } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function EditVacancyPage({ params }: { params: { id: string } }) {
  const [item] = await db.select().from(vacancies).where(eq(vacancies.id, params.id)).limit(1)
  if (!item) notFound()

  async function action(formData: FormData) {
    'use server'
    return updateVacancy(params.id, formData)
  }

  const deadline =
    item.deadline instanceof Date
      ? item.deadline.toISOString().slice(0, 10)
      : item.deadline
        ? String(item.deadline).slice(0, 10)
        : ''

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">Edit vacancy</h1>
      <VacancyForm
        initial={{
          title: item.title,
          slug: item.slug,
          location: item.location,
          employmentType: item.employmentType,
          description: item.description,
          applyEmail: item.applyEmail,
          deadline,
          status: item.status,
        }}
        action={action}
        submitLabel="Save changes"
      />
    </div>
  )
}
