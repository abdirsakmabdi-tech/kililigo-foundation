import Link from 'next/link'
import { count } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db, isDbConfigured } from '@/lib/db'
import { coreValues, heroSlides, leaders, news, partners, programs, vacancies } from '@/lib/db/schema'
import DbNotice from '@/components/admin/DbNotice'
import { ADMIN_SECTIONS, type AdminNavLink } from '@/lib/adminNav'

export const dynamic = 'force-dynamic'

type Counts = Record<NonNullable<AdminNavLink['countKey']>, number>

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  if (!isDbConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-3xl font-semibold text-footer-dark">Dashboard</h1>
        <div className="mt-8">
          <DbNotice />
        </div>
      </div>
    )
  }

  const [[newsCount], [programCount], [leaderCount], [valueCount], [vacancyCount], [slideCount], [partnerCount]] =
    await Promise.all([
      db.select({ value: count() }).from(news),
      db.select({ value: count() }).from(programs),
      db.select({ value: count() }).from(leaders),
      db.select({ value: count() }).from(coreValues),
      db.select({ value: count() }).from(vacancies),
      db.select({ value: count() }).from(heroSlides),
      db.select({ value: count() }).from(partners),
    ])

  const counts: Counts = {
    news: newsCount.value,
    programs: programCount.value,
    leaders: leaderCount.value,
    coreValues: valueCount.value,
    vacancies: vacancyCount.value,
    heroSlides: slideCount.value,
    partners: partnerCount.value,
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-footer-dark">Dashboard</h1>
      <p className="mt-1 text-gray-600">
        Content is grouped by the public site section it updates. Pick a section, then open the related tools.
      </p>

      <div className="mt-8 space-y-6">
        {ADMIN_SECTIONS.map((section) => (
          <section
            key={section.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-xl font-semibold text-footer-dark">{section.title}</h2>
                <Link href={section.sitePath} className="text-xs font-medium text-secondary hover:underline">
                  View {section.sitePath === '/' ? 'homepage' : section.sitePath} →
                </Link>
              </div>
              <p className="mt-1 text-sm text-gray-600">{section.description}</p>
            </div>

            <ul className="divide-y divide-gray-100">
              {section.links.map((link) => {
                const hasCount = !!link.countKey
                const value = link.countKey ? counts[link.countKey] : null
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-gray-50 sm:px-6"
                    >
                      <div>
                        <p className="text-sm font-semibold text-footer-dark">{link.label}</p>
                        <p className="mt-0.5 text-sm text-secondary">{link.cta} →</p>
                      </div>
                      {hasCount ? (
                        <span className="shrink-0 rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                          {value}
                        </span>
                      ) : (
                        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-gray-400">
                          Edit
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
