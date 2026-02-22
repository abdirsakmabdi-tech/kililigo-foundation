'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const values = [
  { title: 'Humanity', desc: 'Respect for human life, dignity, and well-being' },
  { title: 'Neutrality', desc: 'Non-alignment with political, ethnic, or religious interests' },
  { title: 'Impartiality', desc: 'Assistance based solely on need' },
  { title: 'Independence', desc: 'Autonomous humanitarian action' },
  { title: 'Accountability', desc: 'Transparency, ethical management, and community participation' },
  { title: 'Integrity', desc: 'Zero tolerance for corruption and misconduct' },
  { title: 'Respect', desc: 'Cultural sensitivity, inclusion, and human rights protection' },
  { title: 'Empowerment', desc: 'Strengthening local capacity and sustainable solutions' },
]

function ValueCard({ title, desc }: { title: string; desc: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white border border-gray-100 rounded-2xl p-7 md:p-8 hover:bg-primary hover:border-primary transition-colors duration-300 group"
    >
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-primary group-hover:bg-white flex-shrink-0 transition-colors duration-300" />
        <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-white font-sans uppercase tracking-wide leading-tight transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-gray-700 group-hover:text-white/90 font-sans text-sm leading-relaxed self-center transition-colors duration-300">
        {desc}
      </p>
    </motion.div>
  )
}

export default function CoreValues() {
  return (
    <div className="bg-[#eef2ef] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24">

          {/* LEFT — sticky heading */}
          <div className="md:w-1/3 md:sticky md:top-32 md:self-start text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-sans leading-[1.05] uppercase">
              Our Core Values.
            </h2>
          </div>

          {/* RIGHT — scrolling cards */}
          <div className="md:w-2/3 flex flex-col gap-4">
            {values.map((value) => (
              <ValueCard key={value.title} title={value.title} desc={value.desc} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
