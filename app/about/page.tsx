import Link from 'next/link'
import type { Metadata } from 'next'
import LeadershipSlider from '@/components/LeadershipSlider'
import CoreValues from '@/components/CoreValues'

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
      {/* Hero strip — blue with decorative circles and wave divider */}
      <div className="relative bg-secondary pb-0 pt-16 md:pt-24 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute top-[20px] right-[80px] w-[220px] h-[220px] rounded-full bg-white/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 relative z-10">
          <p className="text-white/60 text-xs font-sans uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-sans leading-tight">About Us</h1>
        </div>

        {/* Wave divider */}
        <svg className="w-full block" viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Who We Are card — outside on white background */}
      <div className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary rounded-2xl overflow-hidden">
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
                    <span className="font-normal text-white/90">
                      — provide timely humanitarian assistance and promote recovery, resilience, and social justice in Somalia and beyond. We support vulnerable communities to rebuild livelihoods, uphold human rights, and enhance dignity.
                    </span>
                  </p>
                </div>
                <div className="border-t border-white/20" />
                <div>
                  <p className="text-white font-semibold font-sans">
                    Our Vision{' '}
                    <span className="font-normal text-white/90">
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
      <CoreValues />
    </div>
  )
}
