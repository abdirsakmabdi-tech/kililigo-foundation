import Link from 'next/link'
import type { Metadata } from 'next'
import LeadershipSlider from '@/components/LeadershipSlider'

export const metadata: Metadata = {
  title: 'About Us | Kililigo Foundation',
  description: 'Learn about the mission, vision, and story of Kililigo Foundation — a premier local NGO headquartered in Garowe, Puntland State of Somalia.',
}

const missionPara1 = "Kililigo Foundation's mission is to provide timely humanitarian assistance and promote recovery, resilience, and social justice in Somalia and beyond."
const missionPara2 = "We support vulnerable communities to rebuild livelihoods, uphold human rights, and enhance dignity."
const vision = 'Kililigo Foundation envisions a just, compassionate, and resilient world where all individuals have equal rights, access to essential services, and opportunities to thrive in inclusive and empowered communities.'

const leaders = [
  { name: 'Bashir Said Ismail', role: 'Executive Director', photo: '/leader-bashir.png' },
  { name: 'Mohamed Abullahi Said', role: 'Board Chair', photo: null },
  { name: 'Fatumo Dirie Nor', role: 'Finance and Operation Officer', photo: null },
  { name: 'Mohamed Abdi Haji', role: 'Program Coordinator', photo: null },
  { name: 'Abdiqadir Haji Mohamed', role: 'Project Officer', photo: null },
  { name: 'Said Dirac', role: 'Democracy Consultant', photo: null },
  { name: 'Salim Said Salim', role: 'Lawyer Consultant', photo: null },
  { name: 'Abdikadir Mumin', role: 'Education Consultant', photo: null },
]

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero strip + Who We Are — unified blue section */}
      <div className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-sans transition-colors mb-10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {/* Page heading */}
          <p className="text-white/60 text-sm font-sans uppercase tracking-widest mb-3">Kililigo Foundation</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans mb-14">About Us</h1>

          {/* Who We Are card — same blue, lighter border */}
          <div className="bg-white/10 rounded-2xl overflow-hidden border border-white/20">
            <div className="grid md:grid-cols-2">
              {/* Left column — title */}
              <div className="p-8 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/20">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans leading-tight">Who we are.</h2>
              </div>

              {/* Right column — mission & vision */}
              <div className="p-8 md:p-14 space-y-8">
                <div>
                  <p className="text-white font-semibold font-sans mb-2">
                    Our Mission{' '}
                    <span className="font-normal text-white">
                      — provide timely humanitarian assistance and promote recovery, resilience, and social justice in Somalia and beyond. We support vulnerable communities to rebuild livelihoods, uphold human rights, and enhance dignity.
                    </span>
                  </p>
                </div>
                <div className="border-t border-white/20" />
                <div>
                  <p className="text-white font-semibold font-sans">
                    Our Vision{' '}
                    <span className="font-normal text-white">
                      — A just, compassionate, and resilient world where all individuals have equal rights, access to essential services, and opportunities to thrive in inclusive and empowered communities.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="bg-[#eef2ef] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadershipSlider leaders={leaders} />
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-[#eef2ef] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
              <span className="text-sm font-medium text-gray-600 font-sans">Kililigo Foundation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans leading-tight">
              Our Core Values.
            </h2>
          </div>

          {/* Cards — 4 per row, 2 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Humanity', desc: 'Respect for human life, dignity, and well-being' },
              { title: 'Neutrality', desc: 'Non-alignment with political, ethnic, or religious interests' },
              { title: 'Impartiality', desc: 'Assistance based solely on need' },
              { title: 'Independence', desc: 'Autonomous humanitarian action' },
              { title: 'Accountability', desc: 'Transparency, ethical management, and community participation' },
              { title: 'Integrity', desc: 'Zero tolerance for corruption and misconduct' },
              { title: 'Respect', desc: 'Cultural sensitivity, inclusion, and human rights protection' },
              { title: 'Empowerment', desc: 'Strengthening local capacity and sustainable solutions' },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
                {/* Icon */}
                <div className="w-8 h-8 text-gray-700">
                  <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 font-sans">{value.title}</h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
