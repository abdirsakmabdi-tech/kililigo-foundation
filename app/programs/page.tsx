import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programs | Kililigo Foundation',
  description: 'Explore the core programs of Kililigo Foundation — from humanitarian assistance to education, health, and peacebuilding across Somalia.',
}

const programs = [
  {
    category: 'Relief',
    title: 'Humanitarian Assistance & Emergency Response',
    description: 'The organization provides rapid, life-saving support during disasters and conflicts, including emergency food, shelter, and essential WASH services to meet immediate needs and protect dignity.',
    image: '/program-humanitarian.png',
  },
  {
    category: 'Health',
    title: 'Health & Nutrition',
    description: 'The organization delivers accessible primary healthcare, mobile clinic services, maternal and child health programs, nutrition support, and disease prevention initiatives to improve community health outcomes.',
    image: '/program-health.png',
  },
  {
    category: 'Education',
    title: 'Education & Child Protection',
    description: 'The organization supports safe, inclusive education and child protection through learning opportunities, psychosocial support, and safe spaces that promote resilience and child well-being.',
    image: '/program-education.png',
  },
  {
    category: 'Rights',
    title: 'Protection & Human Rights',
    description: 'The organization offers protection and legal support to refugees, IDPs, and vulnerable groups, promoting rights awareness, access to justice, and the prevention of abuse and exploitation.',
    image: '/program-protection.png',
  },
  {
    category: 'Empowerment',
    title: "Women's Economic Empowerment",
    description: "The organization promotes economic self-reliance and gender equality by supporting livelihoods, skills development, and income-generating opportunities, while fostering safe and inclusive environments for women and youth.",
    image: '/hero-2.png',
  },
  {
    category: 'Youth',
    title: 'Youth Leadership and Civic Engagement',
    description: 'The organization empowers youth through skills development and meaningful participation in community and public decision-making, enabling them to drive positive change, strengthen social cohesion, and support sustainable development.',
    image: '/hero-3.png',
  },
  {
    category: 'Peace',
    title: 'Peacebuilding & Social Cohesion',
    description: 'The organization strengthens social cohesion through dialogue, reconciliation, conflict prevention, trauma healing, and post-crisis recovery initiatives.',
    image: '/hero.png',
  },
]

export default function ProgramsPage() {
  return (
    <div className="pt-16 md:pt-20 bg-white">
      {/* Hero strip */}
      <div className="relative bg-secondary pb-0 pt-16 md:pt-24">
        {/* Decorative background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-24 -top-24 w-[500px] h-[500px] rounded-full bg-white/5" />
          <div className="absolute right-32 top-12 w-[300px] h-[300px] rounded-full bg-white/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
          <p className="text-white/60 text-sm font-sans uppercase tracking-widest mb-4">Programs &amp; Initiatives</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-sans">Programs</h1>
        </div>

        {/* Wave divider */}
        <div className="relative w-full leading-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Programs grid */}
      <div className="bg-white pt-4 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black font-sans mb-3">Our Programs</h2>
          <p className="text-gray-400 text-base font-sans mb-10">Comprehensive initiatives designed to support vulnerable communities and promote sustainable development across Somalia.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program.title} className="group relative h-[380px] rounded-3xl overflow-hidden">
                {/* Background image */}
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-[1]" />

                {/* Content */}
                <div className="absolute inset-0 z-[2] flex flex-col justify-between p-6">
                  {/* Category badge */}
                  <div>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-wider">
                      {program.category}
                    </span>
                  </div>
                  {/* Title & description */}
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans mb-2 leading-snug">{program.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed font-sans">{program.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Beneficiaries */}
      <div className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 pb-10 border-b border-white/20">
            <p className="text-white/40 text-sm font-sans uppercase tracking-widest mb-3">Who We Serve</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">Target Beneficiaries</h2>
          </div>

          <div className="flex flex-col divide-y divide-white/10">
            {[
              { label: 'Internally Displaced Persons (IDPs)', tags: ['Displacement', 'Emergency'] },
              { label: 'Refugees and host communities', tags: ['Refugees', 'Community'] },
              { label: 'Women and girls', tags: ['Gender', 'Empowerment'] },
              { label: 'Children and youth', tags: ['Education', 'Protection'] },
              { label: 'Persons with disabilities', tags: ['Inclusion'] },
              { label: 'Crisis-affected and marginalized populations', tags: ['Relief', 'Rights', 'Health'] },
            ].map((item) => (
              <div
                key={item.label}
                className="group flex items-center justify-between gap-6 px-5 py-5 rounded-xl transition-colors hover:bg-primary cursor-default"
              >
                <span className="text-lg md:text-xl font-semibold font-sans text-white">
                  {item.label}
                </span>
                <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold border border-white/20 text-white/70 bg-white/10 group-hover:border-white/40 group-hover:text-white group-hover:bg-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
