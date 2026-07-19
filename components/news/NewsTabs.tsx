'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { EmptyState, formatDate } from '@/components/news/NewsShared'

export type NewsCardItem = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  coverImageUrl: string | null
  publishedAt: string | Date | null
  createdAt: string | Date
}

export type VacancyItem = {
  id: string
  title: string
  location: string
  employmentType: string
  description: string
  applyEmail: string
  deadline: string | Date | null
}

type Tab = 'news' | 'vacancies'

export default function NewsTabs({
  newsItems,
  vacancies,
}: {
  newsItems: NewsCardItem[]
  vacancies: VacancyItem[]
}) {
  const [tab, setTab] = useState<Tab>('news')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div>
      <div
        role="tablist"
        aria-label="News sections"
        className="mb-10 flex gap-1 border-b border-gray-200"
      >
        {(
          [
            { id: 'news' as const, label: 'News' },
            { id: 'vacancies' as const, label: 'Vacancies' },
          ] as const
        ).map((item) => {
          const active = tab === item.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={active}
              aria-controls={`panel-${item.id}`}
              onClick={() => setTab(item.id)}
              className={`relative px-5 py-3 text-sm font-semibold transition ${
                active
                  ? 'text-secondary'
                  : 'text-gray-500 hover:text-footer-dark'
              }`}
            >
              {item.label}
              {active && (
                <span
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-secondary"
                  aria-hidden
                />
              )}
            </button>
          )
        })}
      </div>

      {tab === 'news' && (
        <div
          role="tabpanel"
          id="panel-news"
          aria-labelledby="tab-news"
        >
          {newsItems.length === 0 ? (
            <EmptyState
              title="No news published yet"
              message="Published news posts from the admin panel will appear here."
            />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {newsItems.map((item) => {
                const date = formatDate(item.publishedAt ?? item.createdAt)
                return (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="group overflow-hidden rounded-card border border-gray-100 bg-cream shadow-subtle transition hover:shadow-card"
                  >
                    {item.coverImageUrl ? (
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        <Image
                          src={item.coverImageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized={item.coverImageUrl.startsWith('/')}
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center bg-secondary/10 text-sm font-medium text-secondary">
                        Kililigo News
                      </div>
                    )}
                    <div className="space-y-3 p-5">
                      {date && <p className="text-xs uppercase tracking-wide text-gray-500">{date}</p>}
                      <h2 className="font-serif text-xl font-semibold text-footer-dark group-hover:text-secondary">
                        {item.title}
                      </h2>
                      {item.excerpt && <p className="line-clamp-3 text-sm text-gray-600">{item.excerpt}</p>}
                      <span className="inline-block text-sm font-semibold text-secondary">Read more →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}

      {tab === 'vacancies' && (
        <div
          role="tabpanel"
          id="panel-vacancies"
          aria-labelledby="tab-vacancies"
        >
          {vacancies.length === 0 ? (
            <EmptyState
              title="No open vacancies"
              message="Open roles from the admin panel will appear here."
            />
          ) : (
            <ul className="overflow-hidden rounded-card border border-secondary/15 bg-cream divide-y divide-secondary/10">
              {vacancies.map((item) => {
                const isExpanded = expandedId === item.id
                const deadline = formatDate(item.deadline)
                const meta = [item.location, item.employmentType].filter(Boolean).join(' · ')

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition hover:bg-white/70"
                    >
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg font-semibold text-footer-dark">{item.title}</h3>
                        {meta && <p className="mt-1 text-sm text-gray-600">{meta}</p>}
                        {deadline && (
                          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary">
                            Deadline {deadline}
                          </p>
                        )}
                      </div>
                      <span className="mt-1 shrink-0 text-sm font-semibold text-secondary">
                        {isExpanded ? 'Hide' : 'Details'}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="space-y-4 border-t border-secondary/10 bg-white px-5 py-5">
                        {item.description ? (
                          <div className="space-y-3 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                            {item.description}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No description provided.</p>
                        )}
                        {item.applyEmail && (
                          <a
                            href={`mailto:${item.applyEmail}`}
                            className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                          >
                            Apply via {item.applyEmail}
                          </a>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
