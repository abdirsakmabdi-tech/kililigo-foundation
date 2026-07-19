import VacancyForm from '@/components/admin/VacancyForm'
import { createVacancy } from '@/app/admin/_actions/vacancies'

export default function NewVacancyPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">New vacancy</h1>
      <VacancyForm action={createVacancy} submitLabel="Create vacancy" />
    </div>
  )
}
