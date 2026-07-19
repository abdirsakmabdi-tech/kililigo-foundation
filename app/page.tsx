import Hero from '@/components/Hero'
import HeroIntro from '@/components/HeroIntro'
import ProgramGrid from '@/components/ProgramGrid'
import CEOMessage from '@/components/CEOMessage'
import ImpactCounter from '@/components/ImpactCounter'
import PartnersStrip from '@/components/PartnersStrip'
import CoreValues from '@/components/CoreValues'
import { and, asc, eq } from 'drizzle-orm'
import { db, isDbConfigured } from '@/lib/db'
import { coreValues, heroSlides, homeContent, partners, programs } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const home = isDbConfigured()
    ? (await db.select().from(homeContent).where(eq(homeContent.id, 'default')).limit(1))[0]
    : null

  const slides = isDbConfigured()
    ? await db
        .select({ imageUrl: heroSlides.imageUrl })
        .from(heroSlides)
        .where(eq(heroSlides.status, 'published'))
        .orderBy(asc(heroSlides.sortOrder))
    : []

  const partnerItems = isDbConfigured()
    ? await db
        .select({
          id: partners.id,
          name: partners.name,
          fullName: partners.fullName,
          logoUrl: partners.logoUrl,
          websiteUrl: partners.websiteUrl,
          tall: partners.tall,
        })
        .from(partners)
        .where(eq(partners.status, 'published'))
        .orderBy(asc(partners.sortOrder), asc(partners.name))
    : []

  const homePrograms = isDbConfigured()
    ? await db
        .select({
          id: programs.id,
          title: programs.title,
          description: programs.description,
          category: programs.category,
          coverImageUrl: programs.coverImageUrl,
        })
        .from(programs)
        .where(and(eq(programs.status, 'published'), eq(programs.showOnHome, true)))
        .orderBy(asc(programs.sortOrder), asc(programs.title))
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

  return (
    <>
      <Hero
        content={{
          images: slides.map((s) => s.imageUrl),
          headlineLine1: home?.headlineLine1 || 'Empowering Communities,',
          headlineLine2: home?.headlineLine2 || 'Restoring',
          headlineAccent: home?.headlineAccent || 'Dignity.',
          subtitle:
            home?.subtitle || 'Timely humanitarian assistance, recovery, and social justice across Somalia.',
          ctaLabel: home?.ctaLabel || 'Our Programs',
          ctaHref: home?.ctaHref || '/programs',
        }}
      />
      <HeroIntro
        content={{
          introText: home?.introText || '',
          backgroundUrl: home?.introBackgroundUrl || null,
          ctaLabel: home?.introCtaLabel || 'About Us',
          ctaHref: home?.introCtaHref || '/about',
        }}
      />
      <ProgramGrid programs={homePrograms} />
      <CEOMessage />
      <ImpactCounter />
      <CoreValues values={values} />
      <PartnersStrip partners={partnerItems} />
    </>
  )
}
