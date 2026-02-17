'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const intro =
  'Founded in 2020, the Kililigo Foundation (KF) is a premier local Non-Profit Civil Society Organization (NGO) headquartered in Garowe, Puntland State of Somalia. We stand as a beacon of hope and a catalyst for change.'

const words = intro.split(' ')

export default function HeroIntro() {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6, rootMargin: "0px 0px -15% 0px" })

  return (
    <section className="relative py-14 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-intro-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
      </div>
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p
            ref={ref}
            className="text-white text-2xl md:text-3xl lg:text-4xl font-bold font-sans leading-[1.4] tracking-tight"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </p>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border-2 border-white text-white text-sm font-semibold font-sans hover:bg-white hover:text-secondary transition-colors"
          >
            About
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
