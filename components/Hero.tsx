'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const FALLBACK_IMAGES = ['/hero.png', '/hero-2.png', '/hero-3.png', '/hero-agro.png', '/hero-agro-2.png']

const SLIDE_INTERVAL = 5000

export type HeroContent = {
  images: string[]
  headlineLine1: string
  headlineLine2: string
  headlineAccent: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}

export default function Hero({ content }: { content: HeroContent }) {
  const heroImages = content.images.length > 0 ? content.images : FALLBACK_IMAGES
  const [currentIndex, setCurrentIndex] = useState(0)
  // Key on content, not just length, so replacing slides restarts the slideshow
  const imagesKey = heroImages.join('|')

  useEffect(() => {
    setCurrentIndex(0)
    const total = imagesKey.split('|').length
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [imagesKey])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${src}-${i}`}
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
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="font-bold font-sans text-white leading-[1.2] mb-6 text-[40px] sm:text-[56px] md:text-[60px] lg:text-[64px] tracking-tight">
          {content.headlineLine1 ? (
            <>
              <span className="text-white/95">{content.headlineLine1}</span>
              <br />
              {content.headlineLine2}{' '}
              <span className="text-primary">{content.headlineAccent}</span>
            </>
          ) : (
            <>
              Empowering <span className="text-white/95">Communities,</span>
              <br />
              Restoring <span className="text-primary">Dignity.</span>
            </>
          )}
        </h1>

        <p className="text-white/70 text-sm md:text-base lg:text-lg font-sans font-normal max-w-xl mb-8 md:mb-10 leading-relaxed px-2 md:px-0">
          {content.subtitle}
        </p>

        <Link
          href={content.ctaHref || '/programs'}
          className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-primary/80 backdrop-blur-sm text-white font-medium font-sans text-sm hover:bg-primary transition-all duration-200 border border-primary/30"
        >
          {content.ctaLabel || 'Our Programs'}
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-gray-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex absolute bottom-8 right-8 z-20 flex-col items-center gap-2">
        <span className="text-white/40 text-xs font-sans uppercase tracking-widest rotate-90 origin-center mb-4">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
