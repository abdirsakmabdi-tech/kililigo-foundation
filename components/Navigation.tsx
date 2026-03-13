'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchModal from '@/components/SearchModal'

const DROPDOWN_CLOSE_DELAY = 150

type NavLink = { href: string; label: string; submenu?: { href: string; label: string }[] }
const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/programs', label: 'Programs' },
  {
    href: '/news',
    label: 'News',
    submenu: [
      { href: '/news', label: 'News' },
      { href: '/news/press-release', label: 'Press Release' },
      { href: '/news/vacancy', label: 'Vacancy' },
    ],
  },
  { href: '/contact', label: 'Contact Us' },
]

const socialLinks = [
  { href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/profile.php?id=61587605410036', label: 'Facebook' },
  { href: 'https://www.twitter.com', label: 'Twitter / X' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileExpanded(null)
  }

  const openNewsDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setNewsDropdownOpen(true)
  }

  const scheduleCloseNewsDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setNewsDropdownOpen(false)
      closeTimeoutRef.current = null
    }, DROPDOWN_CLOSE_DELAY)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/logo svg.svg" alt="Kililigo Foundation" width={160} height={160} className="h-12 w-auto sm:h-16" priority />
            </Link>

            <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              <div className="flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-[#e6e4e0]">
                {navLinks.slice(1, 4).map((link) =>
                  link.submenu ? (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={openNewsDropdown}
                      onMouseLeave={scheduleCloseNewsDropdown}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-gray-800 hover:text-gray-900 hover:bg-white/50 transition-colors"
                      >
                        {link.label}
                        <svg className={`w-3 h-3 opacity-70 transition-transform ${newsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                      {newsDropdownOpen && (
                        <div
                          className="absolute top-full left-0 pt-1 z-50"
                          onMouseEnter={openNewsDropdown}
                        >
                          <div className="py-2 min-w-[180px] bg-white rounded-xl shadow-lg border border-gray-100">
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-primary transition-colors first:rounded-t-xl last:rounded-b-xl"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-gray-800 hover:text-gray-900 hover:bg-white/50 transition-colors"
                    >
                      {link.label}
                      <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
              <Link href="/contact" className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                Contact Us
              </Link>
            </div>

            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-800"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile/tablet menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] lg:hidden overflow-y-auto"
          style={{ background: '#EF7F1A' }}
        >
          {/* Top bar: logo + search + close */}
          <div className="flex items-center justify-between px-6 sm:px-10 py-5">
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src="/Mobile SVG.svg"
                alt="Kililigo Foundation"
                width={240}
                height={240}
                className="h-20 w-auto"
              />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSearchOpen(true)
                  closeMobileMenu()
                }}
                className="p-2.5 text-white/60 hover:text-white transition-colors"
                aria-label="Search"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
              <button
                onClick={closeMobileMenu}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white/50 text-xs font-medium tracking-wider transition-colors"
                aria-label="Close menu"
              >
                Close
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Nav items */}
          <nav className="px-6 sm:px-10 mt-6 sm:mt-10">
            <ul className="border-y border-white/[0.12] divide-y divide-white/[0.12]">
              {navLinks
                .filter((l) => l.label !== 'Home')
                .map((link) => (
                  <li key={link.href}>
                    {link.submenu ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === link.label ? null : link.label,
                            )
                          }
                          className="flex items-center justify-between w-full py-5 group"
                        >
                          <span className="text-[1.65rem] sm:text-[1.85rem] font-light text-white/90 tracking-tight">
                            {link.label}
                          </span>
                          <svg
                            className={`w-4 h-4 text-white/40 group-hover:text-white/60 transition-transform duration-300 ${
                              mobileExpanded === link.label ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                            mobileExpanded === link.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="pb-5 pl-1 space-y-3">
                              {link.submenu.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={closeMobileMenu}
                                  className="block text-lg text-white/50 hover:text-white transition-colors"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between py-5 group"
                      >
                        <span className="text-[1.65rem] sm:text-[1.85rem] font-light text-white/90 tracking-tight group-hover:text-white transition-colors">
                          {link.label}
                        </span>
                        <svg
                          className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                    )}
                  </li>
                ))}

              {/* Connect — expandable with social links */}
              <li>
                <button
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === 'Connect' ? null : 'Connect')
                  }
                  className="flex items-center justify-between w-full py-5 group"
                >
                  <span className="text-[1.65rem] sm:text-[1.85rem] font-light text-white/90 tracking-tight">
                    Connect
                  </span>
                  <svg
                    className={`w-4 h-4 text-white/40 group-hover:text-white/60 transition-transform duration-300 ${
                      mobileExpanded === 'Connect' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    mobileExpanded === 'Connect' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5 pl-1 space-y-3">
                      {socialLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-lg text-white/50 hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
