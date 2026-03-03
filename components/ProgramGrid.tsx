'use client'

import Link from 'next/link'
import Image from 'next/image'

const programs = [
  {
    category: 'Relief',
    title: 'Humanitarian Assistance & Emergency Response',
    description: 'We provide rapid, life-saving support during disasters and conflicts, including emergency food, shelter, and essential WASH services to meet immediate needs and protect dignity.',
    image: '/program-humanitarian.png',
    gradient: 'from-orange-600 via-primary to-amber-600',
    iconColor: '#059669',
  },
  {
    category: 'Health',
    title: 'Health & Nutrition',
    description: 'We deliver accessible primary healthcare, mobile clinic services, maternal and child health programs, nutrition support, and disease prevention initiatives to improve community health outcomes.',
    image: '/program-health.png',
    gradient: 'from-emerald-600 via-teal-600 to-secondary',
    iconColor: '#7c3aed',
  },
  {
    category: 'Education',
    title: 'Education & Child Protection',
    description: 'We support safe, inclusive education and child protection through learning opportunities, psychosocial support, and safe spaces that promote resilience and child well-being.',
    image: '/program-education.png',
    gradient: 'from-secondary via-blue-600 to-indigo-600',
    iconColor: '#2563eb',
  },
  {
    category: 'Rights',
    title: 'Protection & Human Rights',
    description: 'We offer protection and legal support to refugees, IDPs, and vulnerable groups, promoting rights awareness, access to justice, and the prevention of abuse and exploitation.',
    image: '/program-protection.png',
    gradient: 'from-indigo-600 via-violet-600 to-purple-700',
    iconColor: '#0891b2',
  },
  {
    category: 'Empowerment',
    title: "Women's Economic Empowerment",
    description: "We promote economic self-reliance and gender equality by supporting livelihoods, skills development, and income-generating opportunities, while fostering safe and inclusive environments for women and youth.",
    image: '/women-empowerment-bg.png',
    gradient: 'from-pink-600 via-rose-600 to-primary',
    iconColor: '#dc2626',
  },
  {
    category: 'Youth',
    title: 'Youth Leadership and Civic Engagement',
    description: 'We empower youth through skills development and meaningful participation in community and public decision-making, enabling them to drive positive change and strengthen social cohesion.',
    image: '/youth-leadership-bg.png',
    gradient: 'from-primary via-amber-500 to-yellow-600',
    iconColor: '#ea580c',
  },
  {
    category: 'Peace',
    title: 'Peacebuilding & Social Cohesion',
    description: 'We strengthen social cohesion through dialogue, reconciliation, conflict prevention, trauma healing, and post-crisis recovery initiatives.',
    image: '/peacebuilding-bg.png',
    gradient: 'from-green-600 via-emerald-700 to-teal-800',
    iconColor: '#16a34a',
  },
  {
    category: 'Agro',
    title: 'Agro and livestock programs',
    description: 'We believe a strong economy is rooted in strong agriculture. This program empowers Somali farmers and pastoralists to build resilience against climate challenges and market instability.',
    image: '/agro-card-bg.png',
    gradient: 'from-amber-600 via-yellow-600 to-green-600',
    iconColor: '#ca8a04',
  },
]

// Icons for program cards (inline SVGs)
const IconRelief = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IconHealth = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const IconEducation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h8" />
  </svg>
)
const IconRights = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 3v18" />
    <path d="m8 7 4-4 4 4" />
    <path d="M8 17l4 4 4-4" />
    <path d="M3 12h2" />
    <path d="M19 12h2" />
    <path d="M5 9l2 2" />
    <path d="M17 9l2 2" />
    <path d="M5 15l2-2" />
    <path d="M17 15l2-2" />
  </svg>
)
const IconEmpowerment = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
    <path d="M12 14v4" />
    <path d="M10 18h4" />
  </svg>
)
const IconYouth = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const IconPeace = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
)
const IconAgro = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22v-7" />
    <path d="M5 15v4h14v-4" />
    <path d="M12 2v2" />
    <path d="M5 8l7 4 7-4" />
    <path d="M5 12l7 4 7-4" />
  </svg>
)

const cardIcons: Record<string, React.FC> = {
  Relief: IconRelief,
  Health: IconHealth,
  Education: IconEducation,
  Rights: IconRights,
  Empowerment: IconEmpowerment,
  Youth: IconYouth,
  Peace: IconPeace,
  Agro: IconAgro,
}

const FEATURED_CARD_IMAGES: Record<string, string> = {
  Relief: '/humanitarian-card-bg.png',
  Health: '/health-card-bg.png',
  Education: '/education-card-bg.png',
  Rights: '/protection-card-bg.png',
  Empowerment: '/women-empowerment-card-bg.png',
  Youth: '/youth-leadership-card-bg.png',
  Peace: '/peacebuilding-bg.png',
  Agro: '/agro-card-bg.png',
}

function ProgramCard({ program }: { program: typeof programs[0] }) {
  const featuredImage = FEATURED_CARD_IMAGES[program.category]
  const IconComponent = cardIcons[program.category] || IconRelief

  if (featuredImage) {
    return (
      <Link
        href="/programs"
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full"
      >
        {/* 1. Hero image — primary focal point, edge-to-edge */}
        <div className="relative w-full aspect-[2/1] overflow-hidden">
          <Image
            src={featuredImage}
            alt=""
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 33vw"
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden />
          {/* Category badge — secondary label, top-left */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-xs font-semibold uppercase tracking-wider text-gray-800">
            {program.category}
          </span>
        </div>

        {/* 2. Content block — clear separation, Z-pattern flow */}
        <div className="p-6 flex flex-col flex-grow">
          {/* 3. Title — strongest text element */}
          <h3 className="text-2xl font-extrabold text-primary font-sans mb-3 leading-tight border-l-4 border-primary pl-4">
            {program.title}
          </h3>
          {/* 4. Description — supporting body, reduced visual weight */}
          <p className="text-gray-600 text-[15px] leading-relaxed font-sans line-clamp-3 flex-grow">
            {program.description}
          </p>
          {/* 5. CTA — tertiary but actionable, bottom-aligned */}
          <span className="mt-6 pt-4 border-t border-gray-100 inline-flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">
            Learn more
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link href="/programs" className="group flex flex-col bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
      <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-4 flex-shrink-0" style={{ color: program.iconColor }}>
        <IconComponent />
      </div>
      <h3 className="text-lg font-bold text-gray-900 font-sans mb-2 group-hover:text-primary transition-colors">
        {program.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed font-sans flex-grow line-clamp-3">
        {program.description}
      </p>
      <span className="inline-flex items-center gap-1 mt-4 text-secondary font-medium text-sm group-hover:text-secondary/90 transition-colors">
        Learn more
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </Link>
  )
}

export default function ProgramGrid() {
  return (
    <section id="programs" className="bg-gray-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section headline */}
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-sans">
            Our Core Programs
          </h2>
          <p className="mt-3 text-gray-600 text-base md:text-lg font-sans max-w-2xl mx-auto">
            Comprehensive initiatives designed to support vulnerable communities and promote sustainable development across Somalia.
          </p>
        </div>
        {/* Program cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {programs.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </div>
    </section>
  )
}
