'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const corePrograms = [
  { title: 'Humanitarian Assistance & Emergency Response', description: 'We provide rapid, life-saving support during disasters and conflicts, including emergency food, shelter, and essential WASH services to meet immediate needs and protect dignity.' },
  { title: 'Health & Nutrition', description: 'We deliver accessible primary healthcare, mobile clinic services, maternal and child health programs, nutrition support, and disease prevention initiatives to improve community health outcomes.' },
  { title: 'Education & Child Protection', description: 'We support safe, inclusive education and child protection through learning opportunities, psychosocial support, and safe spaces that promote resilience and child well-being.' },
  { title: 'Protection & Human Rights', description: 'We offer protection and legal support to refugees, IDPs, and vulnerable groups, promoting rights awareness, access to justice, and the prevention of abuse and exploitation.' },
  { title: "Women's Economic Empowerment", description: "We promote economic self-reliance and gender equality by supporting livelihoods, skills development, and income-generating opportunities, while fostering safe and inclusive environments for women and youth." },
  { title: 'Youth Leadership and Civic Engagement', description: 'We empower youth through skills development and meaningful participation in community and public decision-making, enabling them to drive positive change and strengthen social cohesion.' },
  { title: 'Peacebuilding & Social Cohesion', description: 'We strengthen social cohesion through dialogue, reconciliation, conflict prevention, trauma healing, and post-crisis recovery initiatives.' },
  { title: 'Agro and livestock programs', description: 'We believe a strong economy is rooted in strong agriculture. This program empowers Somali farmers and pastoralists to build resilience against climate challenges and market instability.' },
]

const capacityBuildingPrograms = [
  { title: 'Capacity building', description: 'We strengthen the skills, knowledge, and systems of local organizations and communities to deliver sustainable, high-impact programs and drive long-term development across Somalia.' },
  { title: 'Research and data collection', description: 'We conduct evidence-based research and data collection to inform policy, improve program design, and measure impact across our interventions in Somalia.' },
  { title: 'Agro and livestock programs', description: 'We believe a strong economy is rooted in strong agriculture. This program empowers Somali farmers and pastoralists to build resilience against climate challenges and market instability.' },
]

const allPrograms = [...corePrograms, ...capacityBuildingPrograms]

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
      {/* Title — left column */}
      <div className="md:col-span-4 lg:col-span-3">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 font-sans leading-snug">
          {title}
        </h3>
      </div>

      {/* Description — middle column */}
      <div className="md:col-span-5 lg:col-span-7">
        <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed">
          {description}
        </p>
      </div>

      {/* Large number — right column */}
      <div className="md:col-span-3 lg:col-span-2 flex items-start justify-start md:justify-end">
        <span className="font-serif text-6xl md:text-7xl lg:text-8xl font-light text-gray-300 tracking-tight">
          {number}
        </span>
      </div>
    </motion.div>
  )
}

export default function ProgramsList() {
  return (
    <div className="bg-white py-16 md:py-24 -mt-px">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* Section title */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-sans leading-[1.05]">
              Our Programs
            </h2>
          </div>

          {/* Program entries */}
          <div className="flex flex-col">
            {allPrograms.map((program, index) => (
              <ProgramEntry
                key={index < corePrograms.length ? program.title : `capacity-${program.title}`}
                title={program.title}
                description={program.description}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
