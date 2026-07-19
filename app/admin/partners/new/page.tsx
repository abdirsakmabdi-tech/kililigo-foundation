import PartnerForm from '@/components/admin/PartnerForm'
import { createPartner } from '@/app/admin/_actions/partners'

export default function NewPartnerPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">New partner</h1>
      <PartnerForm action={createPartner} submitLabel="Create partner" />
    </div>
  )
}
