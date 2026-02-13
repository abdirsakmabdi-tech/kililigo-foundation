'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-card-bg/30 to-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,127,26,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,94,184,0.06)_0%,_transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
          >
            Empowering Communities,{' '}
            <span className="text-primary">Restoring Dignity.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Kililigo Foundation provides timely humanitarian assistance and promotes
            recovery, resilience, and social justice in Somalia.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#programs"
              className="px-8 py-3.5 rounded-card border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-white transition-colors"
            >
              Our Programs
            </Link>
            <Link
              href="#donate"
              className="px-8 py-3.5 rounded-card bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-card"
            >
              Support Our Mission
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
