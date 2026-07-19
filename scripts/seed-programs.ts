import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { getDb } from '../lib/db'
import { programs } from '../lib/db/schema'
import { slugify } from '../lib/slug'

const SEED = [
  {
    title: 'Humanitarian Assistance & Emergency Response',
    description:
      'We provide rapid, life-saving support during disasters and conflicts, including emergency food, shelter, and essential WASH services to meet immediate needs and protect dignity.',
    category: 'Relief',
    coverImageUrl: '/humanitarian-card-bg.png',
    group: 'core',
    sortOrder: 1,
    showOnHome: true,
  },
  {
    title: 'Health & Nutrition',
    description:
      'We deliver accessible primary healthcare, mobile clinic services, maternal and child health programs, nutrition support, and disease prevention initiatives to improve community health outcomes.',
    category: 'Health',
    coverImageUrl: '/health-card-bg.png',
    group: 'core',
    sortOrder: 2,
    showOnHome: true,
  },
  {
    title: 'Education & Child Protection',
    description:
      'We support safe, inclusive education and child protection through learning opportunities, psychosocial support, and safe spaces that promote resilience and child well-being.',
    category: 'Education',
    coverImageUrl: '/education-card-bg.png',
    group: 'core',
    sortOrder: 3,
    showOnHome: true,
  },
  {
    title: 'Protection & Human Rights',
    description:
      'We offer protection and legal support to refugees, IDPs, and vulnerable groups, promoting rights awareness, access to justice, and the prevention of abuse and exploitation.',
    category: 'Rights',
    coverImageUrl: '/protection-card-bg.png',
    group: 'core',
    sortOrder: 4,
    showOnHome: true,
  },
  {
    title: "Women's Economic Empowerment",
    description:
      'We promote economic self-reliance and gender equality by supporting livelihoods, skills development, and income-generating opportunities, while fostering safe and inclusive environments for women and youth.',
    category: 'Empowerment',
    coverImageUrl: '/women-empowerment-card-bg.png',
    group: 'core',
    sortOrder: 5,
    showOnHome: true,
  },
  {
    title: 'Youth Leadership and Civic Engagement',
    description:
      'We empower youth through skills development and meaningful participation in community and public decision-making, enabling them to drive positive change and strengthen social cohesion.',
    category: 'Youth',
    coverImageUrl: '/youth-leadership-card-bg.png',
    group: 'core',
    sortOrder: 6,
    showOnHome: true,
  },
  {
    title: 'Peacebuilding & Social Cohesion',
    description:
      'We strengthen social cohesion through dialogue, reconciliation, conflict prevention, trauma healing, and post-crisis recovery initiatives.',
    category: 'Peace',
    coverImageUrl: '/peacebuilding-bg.png',
    group: 'core',
    sortOrder: 7,
    showOnHome: true,
  },
  {
    title: 'Agro and livestock programs',
    description:
      'We believe a strong economy is rooted in strong agriculture. This program empowers Somali farmers and pastoralists to build resilience against climate challenges and market instability.',
    category: 'Agro',
    coverImageUrl: '/agro-card-bg.png',
    group: 'core',
    sortOrder: 8,
    showOnHome: true,
  },
  {
    title: 'Capacity building',
    description:
      'We strengthen the skills, knowledge, and systems of local organizations and communities to deliver sustainable, high-impact programs and drive long-term development across Somalia.',
    category: 'Capacity',
    coverImageUrl: null,
    group: 'capacity',
    sortOrder: 9,
    showOnHome: false,
  },
  {
    title: 'Research and data collection',
    description:
      'We conduct evidence-based research and data collection to inform policy, improve program design, and measure impact across our interventions in Somalia.',
    category: 'Research',
    coverImageUrl: null,
    group: 'capacity',
    sortOrder: 10,
    showOnHome: false,
  },
] as const

async function seed() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')

  const db = getDb()
  let created = 0
  let skipped = 0

  for (const item of SEED) {
    const slug = slugify(item.title)
    const [existing] = await db.select().from(programs).where(eq(programs.slug, slug)).limit(1)
    if (existing) {
      skipped += 1
      continue
    }

    const now = new Date()
    await db.insert(programs).values({
      title: item.title,
      description: item.description,
      category: item.category,
      coverImageUrl: item.coverImageUrl,
      programGroup: item.group,
      sortOrder: item.sortOrder,
      showOnHome: item.showOnHome,
      slug,
      status: 'published',
      updatedAt: now,
    })
    created += 1
  }

  console.log(`Programs seed complete. Created ${created}, skipped ${skipped} existing.`)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
