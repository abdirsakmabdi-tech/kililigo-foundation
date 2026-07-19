'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export type ProgramListItem = {
  id: string
  title: string
  description: string
}

function ProgramEntry({ title, description, index }: { title: string; description: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const number = String(index).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-16 border-b border-gray-200 last:border-b-0"
    >
      <div className="md:col-span-4 lg:col-span-3">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 font-sans leading-snug">
          {title}
        </h3>
      </div>

      <div className="md:col-span-5 lg:col-span-7">
        <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed">
          {description}
        </p>
      </div>

      <div className="md:col-span-3 lg:col-span-2 flex items-start justify-start md:justify-end">
        <span className="font-serif text-6xl md:text-7xl lg:text-8xl font-light text-gray-300 tracking-tight">
          {number}
        </span>
      </div>
    </motion.div>
  )
}

export default function ProgramsList({ programs }: { programs: ProgramListItem[] }) {
  return (
    <div className="bg-white py-16 md:py-24 -mt-px">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-sans leading-[1.05]">
              Our Programs
            </h2>
          </div>

          {programs.length === 0 ? (
            <p className="py-12 text-gray-600 font-sans">Programs will appear here once published.</p>
          ) : (
            <div className="flex flex-col">
              {programs.map((program, index) => (
                <ProgramEntry
                  key={program.id}
                  title={program.title}
                  description={program.description}
                  index={index + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
