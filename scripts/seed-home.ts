import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { getDb } from '../lib/db'
import { heroSlides, homeContent, partners } from '../lib/db/schema'

const INTRO =
  'Founded in 2020, the Kililigo Foundation (KF) is a premier local Non-Profit Civil Society Organization (NGO) headquartered in Garowe, Puntland State of Somalia. We stand as a beacon of hope and a catalyst for change.'

const SLIDES = [
  '/hero.png',
  '/hero-2.png',
  '/hero-3.png',
  '/hero-agro.png',
  '/hero-agro-2.png',
] as const

const PARTNERS = [
  {
    name: 'IRC',
    fullName: 'International Rescue Committee',
    logoUrl: '/partner-irc.png',
    websiteUrl: 'https://www.rescue.org/',
    tall: false,
    sortOrder: 1,
  },
  {
    name: 'UNHCR',
    fullName: 'United Nations High Commissioner for Refugees',
    logoUrl: '/partner-unhcr.png',
    websiteUrl: 'https://www.unhcr.org/',
    tall: true,
    sortOrder: 2,
  },
  {
    name: 'UNICEF',
    fullName: "United Nations Children's Fund",
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Logo_of_UNICEF.svg/640px-Logo_of_UNICEF.svg.png',
    websiteUrl: 'https://www.unicef.org/',
    tall: false,
    sortOrder: 3,
  },
  {
    name: 'USAID',
    fullName: 'United States Agency for International Development',
    logoUrl: '/partner-usaid.png',
    websiteUrl: 'https://www.usaid.gov/',
    tall: false,
    sortOrder: 4,
  },
  {
    name: 'IKEA Foundation',
    fullName: 'IKEA Foundation',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/640px-Ikea_logo.svg.png',
    websiteUrl: 'https://ikeafoundation.org/',
    tall: false,
    sortOrder: 5,
  },
  {
    name: 'Google',
    fullName: 'Google',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png',
    websiteUrl: 'https://www.google.com/',
    tall: false,
    sortOrder: 6,
  },
] as const

async function seed() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')

  const db = getDb()
  const now = new Date()

  const [existingHome] = await db.select().from(homeContent).where(eq(homeContent.id, 'default')).limit(1)
  if (existingHome) {
    console.log('Home content already exists — skipped')
  } else {
    await db.insert(homeContent).values({
      id: 'default',
      headlineLine1: 'Empowering Communities,',
      headlineLine2: 'Restoring',
      headlineAccent: 'Dignity.',
      subtitle: 'Timely humanitarian assistance, recovery, and social justice across Somalia.',
      ctaLabel: 'Our Programs',
      ctaHref: '/programs',
      introText: INTRO,
      introBackgroundUrl: '/hero-intro-bg.png',
      introCtaLabel: 'About Us',
      introCtaHref: '/about',
      updatedAt: now,
    })
    console.log('Created home content')
  }

  const existingSlides = await db.select().from(heroSlides).limit(1)
  if (existingSlides.length > 0) {
    console.log('Hero slides already exist — skipped')
  } else {
    for (let i = 0; i < SLIDES.length; i++) {
      await db.insert(heroSlides).values({
        imageUrl: SLIDES[i],
        sortOrder: i + 1,
        status: 'published',
        updatedAt: now,
      })
    }
    console.log(`Created ${SLIDES.length} hero slides`)
  }

  const existingPartners = await db.select().from(partners).limit(1)
  if (existingPartners.length > 0) {
    console.log('Partners already exist — skipped')
  } else {
    for (const item of PARTNERS) {
      await db.insert(partners).values({
        ...item,
        status: 'published',
        updatedAt: now,
      })
    }
    console.log(`Created ${PARTNERS.length} partners`)
  }

  console.log('Home seed complete.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
