'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { value: 1000, suffix: '+', label: 'People Assisted', description: 'Individuals reached through direct humanitarian aid' },
  { value: 30,   suffix: '+', label: 'Emergency Responses', description: 'Rapid interventions during crises and disasters' },
  { value: 3,    suffix: '',  label: 'Health Centers Built', description: 'Purpose-built facilities serving local communities' },
  { value: 8,    suffix: '',  label: 'Schools Supported', description: 'Refugee and community schools receiving ongoing support' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(progress >= 1 ? value : Math.floor(value * eased))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function ImpactCounter() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="mt-12 md:mt-16 bg-secondary text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">

        {/* Top label + heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-primary text-base font-bold uppercase tracking-widest mb-3 font-sans"
            >
              Our Impact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-white font-sans leading-tight max-w-xl"
            >
              Real change,<br />measurable results.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-sm md:text-base font-sans max-w-xs leading-relaxed"
          >
            Numbers that reflect the lives touched and communities strengthened across Somalia.
          </motion.p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/20 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="bg-secondary px-8 py-10 flex flex-col gap-4"
            >
              {/* Number */}
              <p className="text-5xl md:text-6xl font-bold text-white font-sans tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-primary" />

              {/* Label + description */}
              <div>
                <p className="text-white font-bold font-sans text-base mb-1">{stat.label}</p>
                <p className="text-white/70 font-sans text-sm leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
