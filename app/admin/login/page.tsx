import { Suspense } from 'react'
import AdminLoginForm from './LoginForm'

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md p-8 text-center text-sm text-gray-500">Loading…</div>}>
      <AdminLoginForm />
    </Suspense>
  )
}
