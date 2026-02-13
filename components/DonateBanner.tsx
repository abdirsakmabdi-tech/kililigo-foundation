'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DonateBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20 md:py-24 bg-gradient-to-r from-secondary to-secondary/90 text-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Make a Difference Today
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Your donation helps us provide humanitarian assistance, build health centers,
          and support education for vulnerable communities across Somalia.
        </p>
        <Link
          href="#donate"
          className="inline-block px-10 py-4 rounded-card bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors shadow-card"
        >
          Donate Now
        </Link>
      </div>
    </motion.section>
  )
}
