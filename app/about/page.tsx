import type { Metadata } from 'next'
import { asc, eq } from 'drizzle-orm'
import LeadershipSlider from '@/components/LeadershipSlider'
import CoreValues from '@/components/CoreValues'
import { db, isDbConfigured } from '@/lib/db'
import { aboutContent, coreValues, leaders } from '@/lib/db/schema'

export const metadata: Metadata = {
  title: 'About Us | Kililigo Foundation',
  description:
    'Learn about the mission, vision, and story of Kililigo Foundation — a premier local NGO headquartered in Garowe, Puntland State of Somalia.',
}

export const dynamic = 'force-dynamic'

const FALLBACK_MISSION =
  'provide timely humanitarian assistance and promote recovery, resilience, and social justice in Somalia and beyond. We support vulnerable communities to rebuild livelihoods, uphold human rights, and enhance dignity.'

const FALLBACK_VISION =
  'A just, compassionate, and resilient world where all individuals have equal rights, access to essential services, and opportunities to thrive in inclusive and empowered communities.'

export default async function AboutPage() {
  const about = isDbConfigured()
    ? (await db.select().from(aboutContent).where(eq(aboutContent.id, 'default')).limit(1))[0]
    : null

  const publishedLeaders = isDbConfigured()
    ? (
        await db
          .select({
            id: leaders.id,
            name: leaders.name,
            role: leaders.role,
            photoUrl: leaders.photoUrl,
          })
          .from(leaders)
          .where(eq(leaders.status, 'published'))
          .orderBy(asc(leaders.sortOrder), asc(leaders.name))
      ).map((item) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        photo: item.photoUrl,
      }))
    : []

  const values = isDbConfigured()
    ? await db
        .select({
          id: coreValues.id,
          title: coreValues.title,
          description: coreValues.description,
        })
        .from(coreValues)
        .where(eq(coreValues.status, 'published'))
        .orderBy(asc(coreValues.sortOrder), asc(coreValues.title))
    : []

  const missionText = about?.missionText || FALLBACK_MISSION
  const visionText = about?.visionText || FALLBACK_VISION

  return (
    <div className="pt-16 md:pt-20">
      <div className="relative bg-secondary pb-0 pt-16 md:pt-24 overflow-hidden">
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute top-[20px] right-[80px] w-[220px] h-[220px] rounded-full bg-white/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 relative z-10">
          <p className="text-white/60 text-xs font-sans uppercase tracking-widest mb-4">About Us</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-sans leading-tight">About Us</h1>
        </div>

        <svg className="w-full block" viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>

      <div className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/20">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans leading-tight">Who we are.</h2>
              </div>

              <div className="p-8 md:p-14 space-y-8">
                <div>
                  <p className="text-white font-semibold font-sans mb-2">
                    Our Mission{' '}
                    <span className="font-normal text-white/90">— {missionText}</span>
                  </p>
                </div>
                <div className="border-t border-white/20" />
                <div>
                  <p className="text-white font-semibold font-sans">
                    Our Vision{' '}
                    <span className="font-normal text-white/90">— {visionText}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#eef2ef] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadershipSlider leaders={publishedLeaders} />
        </div>
      </div>

      <CoreValues values={values} />
    </div>
  )
}
