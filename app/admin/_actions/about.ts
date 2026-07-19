'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { aboutContent } from '@/lib/db/schema'

export type ActionResult = { ok: true } | { ok: false; error: string }

const DEFAULT_ID = 'default'

export async function updateAboutContent(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const missionText = String(formData.get('missionText') || '').trim()
    const visionText = String(formData.get('visionText') || '').trim()
    const now = new Date()

    const [existing] = await db.select().from(aboutContent).where(eq(aboutContent.id, DEFAULT_ID)).limit(1)
    if (existing) {
      await db
        .update(aboutContent)
        .set({ missionText, visionText, updatedAt: now })
        .where(eq(aboutContent.id, DEFAULT_ID))
    } else {
      await db.insert(aboutContent).values({
        id: DEFAULT_ID,
        missionText,
        visionText,
        updatedAt: now,
      })
    }

    revalidatePath('/admin/about')
    revalidatePath('/about')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to save about content' }
  }
}
