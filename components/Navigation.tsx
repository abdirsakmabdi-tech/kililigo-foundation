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
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
              <Image src="/main-logo.png" alt="Kililigo Foundation" width={140} height={40} className="h-4 w-auto sm:h-6" priority />
            </Link>

            <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
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

            <div className="hidden md:flex items-center gap-3 shrink-0">
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
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-800"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-secondary flex flex-col px-8 py-8 md:hidden">
          {/* Top bar: logo + close */}
          <div className="flex items-center justify-between mb-12">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src="/main-logo.png"
                alt="Kililigo Foundation"
                width={120}
                height={36}
                className="h-5 w-auto brightness-0 invert"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main nav links — large */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.submenu ? (
                    <div>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[2.6rem] font-bold text-white font-sans leading-tight hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                      <ul className="mt-2 ml-4 space-y-1 border-l-2 border-white/20 pl-4">
                        {link.submenu.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-xl font-medium text-white/80 font-sans hover:text-primary transition-colors"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[2.6rem] font-bold text-white font-sans leading-tight hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom: Connect + social links */}
          <div className="mt-auto pt-10 border-t border-white/20">
            <p className="text-white/50 text-sm font-sans mb-4 uppercase tracking-widest">Connect</p>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-lg font-sans hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
