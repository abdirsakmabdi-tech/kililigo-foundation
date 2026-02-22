'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { value: 1000, suffix: '+', label: 'People Assisted', large: true },
  { value: 30, suffix: '+', label: 'Emergency Responses', large: false },
  { value: 3, suffix: '', label: 'Health Centers Built', large: false },
  { value: 8, suffix: '', label: 'Schools Supported', large: false },
  { value: 50, suffix: '+', label: 'Communities Reached', large: false },
  { value: 5, suffix: '', label: 'Years of Service', large: false },
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

  const [largeStat, ...smallStats] = stats

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-20 md:py-28 overflow-hidden bg-[#FDF5ED]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2 font-sans">Our Impact</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-sans leading-tight">
            Real change, measurable results.
          </h2>
          <p className="mt-4 text-gray-600 text-sm md:text-base font-sans max-w-xl">
            Numbers that reflect the lives touched and communities strengthened across Somalia.
          </p>
        </motion.div>

        {/* Cards grid — 1 large left + 5 small right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          {/* Large card — left, spans 2 rows on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 lg:row-span-2"
          >
            <div className="h-full min-h-[200px] lg:min-h-[320px] rounded-[2rem] bg-[#5C2A2A] p-6 md:p-8 flex flex-col justify-end">
              <p className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-primary/90 tracking-tight mb-3">
                <AnimatedCounter value={largeStat.value} suffix={largeStat.suffix} />
              </p>
              <p className="text-white/90 font-sans text-base md:text-lg font-medium">
                {largeStat.label}
              </p>
            </div>
          </motion.div>

          {/* 5 smaller cards — 2 on top row, 3 on bottom row */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-5">
            {smallStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                className={`min-h-[160px] md:min-h-[150px] rounded-[2rem] bg-[#5C2A2A] p-5 md:p-6 flex flex-col justify-end ${i < 2 ? 'md:col-span-3' : 'md:col-span-2'}`}
              >
                <p className="text-4xl md:text-5xl font-serif font-bold text-primary/90 tracking-tight mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/90 font-sans text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
