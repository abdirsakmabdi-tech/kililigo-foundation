'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { contactContent } from '@/lib/db/schema'

export type ActionResult = { ok: true } | { ok: false; error: string }

const DEFAULT_ID = 'default'

export async function updateContactContent(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const locationText = String(formData.get('locationText') || '').trim()
    const email = String(formData.get('email') || '').trim()
    if (!locationText) return { ok: false, error: 'Location is required' }
    if (!email) return { ok: false, error: 'Email is required' }

    const now = new Date()
    const [existing] = await db.select().from(contactContent).where(eq(contactContent.id, DEFAULT_ID)).limit(1)

    if (existing) {
      await db
        .update(contactContent)
        .set({ locationText, email, updatedAt: now })
        .where(eq(contactContent.id, DEFAULT_ID))
    } else {
      await db.insert(contactContent).values({
        id: DEFAULT_ID,
        locationText,
        email,
        updatedAt: now,
      })
    }

    revalidatePath('/admin/contact')
    revalidatePath('/contact')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to save contact content' }
  }
}
