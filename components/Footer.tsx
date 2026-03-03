'use client'

import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/programs', label: 'Programs' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact Us' },
]

const externalLinks = [
  { href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { href: 'https://www.facebook.com', label: 'Facebook' },
  { href: 'https://www.twitter.com', label: 'Twitter / X' },
]

export default function Footer() {
  return (
    <footer id="donate" className="bg-footer-dark text-white">
      {/* Back to Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-5 border-b border-white/10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Back To Top
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left — Logo + description */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/main-logo.png"
                alt="Kililigo Foundation"
                width={140}
                height={40}
                className="h-4 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Kililigo Foundation is a Somalia-based NGO supporting vulnerable communities
              to rebuild livelihoods and uphold human rights. We provide timely humanitarian
              assistance and promote recovery, resilience, and social justice.
            </p>
            <div className="space-y-1 text-sm text-white/50">
              <p>HQ: Haji Ali Road, Hantiwadag, Garowe, Somalia.</p>
            </div>
          </div>

          {/* Center — Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">
              Links
            </h4>
            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Kililigo Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
