'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const heroImages = [
  '/hero.png',
  '/hero-2.png',
  '/hero-3.png',
]

const SLIDE_INTERVAL = 5000

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, SLIDE_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background slider */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{
              opacity: i === currentIndex ? 1 : 0,
              zIndex: i === currentIndex ? 2 : 1,
              transition: 'opacity 1.2s ease-in-out',
              pointerEvents: 'none',
            }}
            aria-hidden={i !== currentIndex}
          />
        ))}
        {/* Gradient overlay — stronger at bottom-left for text legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Content — centered */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Headline */}
        <h1 className="font-bold font-sans text-white leading-[1.35] mb-6 text-[32px] sm:text-[42px] md:text-[52px]">
          Empowering{' '}
          <span className="italic font-light text-white/80">Communities,</span>
          <br />
          Restoring{' '}
          <span className="text-primary">Dignity.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/80 text-sm md:text-base lg:text-lg font-sans font-normal max-w-xl mb-8 md:mb-10 leading-relaxed px-2 md:px-0">
          Timely humanitarian assistance, recovery, and social justice across Somalia.
        </p>

        {/* CTA */}
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-semibold font-sans text-sm hover:bg-primary/90 transition-colors duration-200"
        >
          Our Programs
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <div className="hidden md:flex absolute bottom-8 right-8 z-20 flex-col items-center gap-2">
        <span className="text-white/40 text-xs font-sans uppercase tracking-widest rotate-90 origin-center mb-4">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
