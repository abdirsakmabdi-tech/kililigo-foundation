'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#programs', label: 'Programs' },
  { href: '#impact', label: 'Impact' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="Kililigo Foundation" width={140} height={40} className="h-6 w-auto sm:h-8" priority />
          </Link>

          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <div className="flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-[#e6e4e0]">
              {navLinks.map((link) => (
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
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 shrink-0">
            <Link href="#donate" className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              Contact Us
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
            <div className="md:hidden overflow-hidden border-t border-gray-100 bg-white">
              <div className="py-4 space-y-2 px-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary font-medium">
                    {link.label}
                  </Link>
                ))}
                <Link href="#donate" onClick={() => setMobileMenuOpen(false)} className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
        )}
      </nav>
    </header>
  )
}
