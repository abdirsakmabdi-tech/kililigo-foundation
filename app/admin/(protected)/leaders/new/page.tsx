import LeaderForm from '@/components/admin/LeaderForm'
import { createLeader } from '@/app/admin/_actions/leaders'

export default function NewLeaderPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">New leader</h1>
      <LeaderForm action={createLeader} submitLabel="Create leader" />
    </div>
  )
}
