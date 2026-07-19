'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { homeContent } from '@/lib/db/schema'

export type ActionResult = { ok: true } | { ok: false; error: string }

const DEFAULT_ID = 'default'

export async function updateHomeContent(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const now = new Date()
    const values = {
      headlineLine1: String(formData.get('headlineLine1') || '').trim(),
      headlineLine2: String(formData.get('headlineLine2') || '').trim(),
      headlineAccent: String(formData.get('headlineAccent') || '').trim(),
      subtitle: String(formData.get('subtitle') || '').trim(),
      ctaLabel: String(formData.get('ctaLabel') || 'Our Programs').trim() || 'Our Programs',
      ctaHref: String(formData.get('ctaHref') || '/programs').trim() || '/programs',
      introText: String(formData.get('introText') || '').trim(),
      introBackgroundUrl: String(formData.get('introBackgroundUrl') || '').trim() || null,
      introCtaLabel: String(formData.get('introCtaLabel') || 'About Us').trim() || 'About Us',
      introCtaHref: String(formData.get('introCtaHref') || '/about').trim() || '/about',
      updatedAt: now,
    }

    const [existing] = await db.select().from(homeContent).where(eq(homeContent.id, DEFAULT_ID)).limit(1)
    if (existing) {
      await db.update(homeContent).set(values).where(eq(homeContent.id, DEFAULT_ID))
    } else {
      await db.insert(homeContent).values({ id: DEFAULT_ID, ...values })
    }

    revalidatePath('/admin/home')
    revalidatePath('/')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to save home content' }
  }
}
