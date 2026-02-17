'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const heroImages = [
  '/hero.png',
  '/hero-2.png',
  '/hero-3.png',
]

const SLIDE_INTERVAL = 4000

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

  const goToSlide = (i: number) => {
    setCurrentIndex(i)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, SLIDE_INTERVAL)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Hero background slider - img elements for reliable opacity transition */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === currentIndex ? 1 : 0,
              zIndex: i === currentIndex ? 2 : 1,
              transition: 'opacity 0.8s ease-in-out',
              pointerEvents: 'none',
            }}
            aria-hidden={i !== currentIndex}
          />
        ))}
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            type="button"
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70 w-2'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-sans drop-shadow-lg">
            Empowering Communities,{' '}
            <span className="text-primary">Restoring Dignity.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/95 font-bold font-sans mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Kililigo Foundation provides timely humanitarian assistance and promotes
            recovery, resilience, and social justice in Somalia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#programs"
              className="px-8 py-3.5 rounded-card bg-primary text-white font-bold font-sans hover:bg-primary/90 transition-colors shadow-card"
            >
              Our Programs
            </Link>
            <Link
              href="#about"
              className="px-8 py-3.5 rounded-card border-2 border-white text-white font-bold font-sans hover:bg-white hover:text-gray-900 transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
