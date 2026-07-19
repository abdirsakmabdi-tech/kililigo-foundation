'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { ADMIN_SECTIONS, isAdminLinkActive } from '@/lib/adminNav'

function NavSections({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          onClick={onNavigate}
          className={`block rounded-md px-3 py-2 text-sm font-medium ${
            pathname === '/admin' ? 'bg-secondary text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Dashboard
        </Link>
      </div>

      {ADMIN_SECTIONS.map((section) => (
        <div key={section.id}>
          <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.links.map((link) => {
              const active = isAdminLinkActive(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className={`block rounded-md px-3 py-2 text-sm font-medium ${
                      active ? 'bg-secondary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function AdminNav({ userName }: { userName?: string | null }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Kililigo CMS</p>
            <p className="text-xs text-gray-500">{userName || 'Admin'}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700"
            aria-expanded={open}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <div className="border-t border-gray-100 bg-white px-3 py-4 max-h-[70vh] overflow-y-auto">
            <NavSections onNavigate={() => setOpen(false)} />
            <div className="mt-6 space-y-1 border-t border-gray-100 pt-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
              >
                View public site
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-60 lg:flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-4 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Kililigo CMS</p>
          <p className="mt-1 text-sm text-gray-500 truncate">Signed in as {userName || 'Admin'}</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <NavSections />
        </nav>
        <div className="border-t border-gray-100 px-3 py-4 space-y-1">
          <Link href="/" className="block rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">
            View public site
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
