import ProgramForm from '@/components/admin/ProgramForm'
import { createProgram } from '@/app/admin/_actions/programs'

export default function NewProgramPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">New program</h1>
      <ProgramForm action={createProgram} submitLabel="Create program" />
    </div>
  )
}
