import type { Metadata } from 'next'
import ProgramsList from '@/components/ProgramsList'

export const metadata: Metadata = {
  title: 'Programs | Kililigo Foundation',
  description: 'Explore the core programs of Kililigo Foundation — from humanitarian assistance to education, health, and peacebuilding across Somalia.',
}

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

        {/* Wave divider — transitions blue hero into white program section */}
        <div className="relative w-full leading-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Our Programs */}
      <ProgramsList />

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
                <div className="hidden lg:flex items-center gap-2 shrink-0 flex-wrap justify-end">
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
