export default function DbNotice() {
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
      <h2 className="font-serif text-lg font-semibold">Database not connected</h2>
      <p className="mt-2 text-sm">
        Add <code className="rounded bg-amber-100 px-1">DATABASE_URL</code> to{' '}
        <code className="rounded bg-amber-100 px-1">.env.local</code>, then run{' '}
        <code className="rounded bg-amber-100 px-1">npm run db:push</code> and{' '}
        <code className="rounded bg-amber-100 px-1">npm run db:seed</code>.
      </p>
    </div>
  )
}
