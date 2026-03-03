'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const intro =
  'Founded in 2020, the Kililigo Foundation (KF) is a premier local Non-Profit Civil Society Organization (NGO) headquartered in Garowe, Puntland State of Somalia. We stand as a beacon of hope and a catalyst for change.'

const words = intro.split(' ')

export default function HeroIntro() {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.4 })

  return (
    <section className="relative py-14 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-intro-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none" />
      </div>
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p
            ref={ref}
            className="text-white text-2xl md:text-3xl lg:text-4xl font-bold font-sans leading-[1.8] tracking-tight"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: isInView ? i * 0.12 : (words.length - 1 - i) * 0.06,
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 mt-6 min-w-[140px] justify-center px-2 py-2 rounded-full bg-primary/80 backdrop-blur-sm text-white font-medium font-sans text-sm hover:bg-primary transition-all duration-200 border border-primary/30"
          >
            About Us
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-900 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
