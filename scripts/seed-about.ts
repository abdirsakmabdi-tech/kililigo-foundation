import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { getDb } from '../lib/db'
import { aboutContent, coreValues, leaders } from '../lib/db/schema'

const MISSION =
  'provide timely humanitarian assistance and promote recovery, resilience, and social justice in Somalia and beyond. We support vulnerable communities to rebuild livelihoods, uphold human rights, and enhance dignity.'

const VISION =
  'A just, compassionate, and resilient world where all individuals have equal rights, access to essential services, and opportunities to thrive in inclusive and empowered communities.'

const LEADERS = [
  { name: 'Bashir Said Ismail', role: 'Executive Director', photoUrl: '/leader-bashir.png', sortOrder: 1 },
  { name: 'Mohamed Abullahi Said', role: 'Board Chair', photoUrl: '/leader-mohamed-abullahi.png', sortOrder: 2 },
  { name: 'Abdukadir Haji Mohamed', role: 'Finance and Operation Officer', photoUrl: '/leader-abdukadir-haji.png', sortOrder: 3 },
  { name: 'Mohamed Abdi Haji', role: 'Program Coordinator', photoUrl: null, sortOrder: 4 },
  { name: 'Abdiqadir Haji Mohamed', role: 'Project Officer', photoUrl: null, sortOrder: 5 },
  { name: 'Said Dirac', role: 'Democracy Consultant', photoUrl: null, sortOrder: 6 },
  { name: 'Salim Said Salim', role: 'Lawyer Consultant', photoUrl: null, sortOrder: 7 },
  { name: 'Abdikadir Mumin', role: 'Education Consultant', photoUrl: null, sortOrder: 8 },
] as const

const VALUES = [
  { title: 'Humanity', description: 'Respect for human life, dignity, and well-being', sortOrder: 1 },
  { title: 'Neutrality', description: 'Non-alignment with political, ethnic, or religious interests', sortOrder: 2 },
  { title: 'Impartiality', description: 'Assistance based solely on need', sortOrder: 3 },
  { title: 'Independence', description: 'Autonomous humanitarian action', sortOrder: 4 },
  { title: 'Accountability', description: 'Transparency, ethical management, and community participation', sortOrder: 5 },
  { title: 'Integrity', description: 'Zero tolerance for corruption and misconduct', sortOrder: 6 },
  { title: 'Respect', description: 'Cultural sensitivity, inclusion, and human rights protection', sortOrder: 7 },
  { title: 'Empowerment', description: 'Strengthening local capacity and sustainable solutions', sortOrder: 8 },
] as const

async function seed() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')

  const db = getDb()
  const now = new Date()

  const [existingAbout] = await db.select().from(aboutContent).where(eq(aboutContent.id, 'default')).limit(1)
  if (existingAbout) {
    console.log('About content already exists — skipped')
  } else {
    await db.insert(aboutContent).values({
      id: 'default',
      missionText: MISSION,
      visionText: VISION,
      updatedAt: now,
    })
    console.log('Created about content')
  }

  const existingLeaders = await db.select().from(leaders).limit(1)
  if (existingLeaders.length > 0) {
    console.log('Leaders already exist — skipped')
  } else {
    for (const item of LEADERS) {
      await db.insert(leaders).values({
        ...item,
        status: 'published',
        updatedAt: now,
      })
    }
    console.log(`Created ${LEADERS.length} leaders`)
  }

  const existingValues = await db.select().from(coreValues).limit(1)
  if (existingValues.length > 0) {
    console.log('Core values already exist — skipped')
  } else {
    for (const item of VALUES) {
      await db.insert(coreValues).values({
        ...item,
        status: 'published',
        updatedAt: now,
      })
    }
    console.log(`Created ${VALUES.length} core values`)
  }

  console.log('About seed complete.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
