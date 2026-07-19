import CoreValueForm from '@/components/admin/CoreValueForm'
import { createCoreValue } from '@/app/admin/_actions/core-values'

export default function NewCoreValuePage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">New core value</h1>
      <CoreValueForm action={createCoreValue} submitLabel="Create value" />
    </div>
  )
}
