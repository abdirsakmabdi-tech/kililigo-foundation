'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { heroSlides } from '@/lib/db/schema'

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string }

function parseStatus(raw: FormDataEntryValue | null): 'draft' | 'published' {
  return raw === 'published' ? 'published' : 'draft'
}

function parseSortOrder(raw: FormDataEntryValue | null): number {
  const n = Number(String(raw || '0'))
  return Number.isFinite(n) ? Math.trunc(n) : 0
}

export async function createHeroSlide(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const imageUrl = String(formData.get('imageUrl') || '').trim()
    if (!imageUrl) return { ok: false, error: 'Image is required' }
    const now = new Date()
    const [row] = await db
      .insert(heroSlides)
      .values({
        imageUrl,
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        status: parseStatus(formData.get('status')),
        updatedAt: now,
      })
      .returning({ id: heroSlides.id })
    revalidatePath('/admin/hero')
    revalidatePath('/')
    return { ok: true, id: row.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to create slide' }
  }
}

export async function updateHeroSlide(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const imageUrl = String(formData.get('imageUrl') || '').trim()
    if (!imageUrl) return { ok: false, error: 'Image is required' }
    const now = new Date()
    await db
      .update(heroSlides)
      .set({
        imageUrl,
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        status: parseStatus(formData.get('status')),
        updatedAt: now,
      })
      .where(eq(heroSlides.id, id))
    revalidatePath('/admin/hero')
    revalidatePath(`/admin/hero/${id}`)
    revalidatePath('/')
    return { ok: true, id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to update slide' }
  }
}

export async function deleteHeroSlide(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.delete(heroSlides).where(eq(heroSlides.id, id))
    revalidatePath('/admin/hero')
    revalidatePath('/')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to delete slide' }
  }
}
