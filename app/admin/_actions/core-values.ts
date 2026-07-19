'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { coreValues } from '@/lib/db/schema'

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string }

function parseStatus(raw: FormDataEntryValue | null): 'draft' | 'published' {
  return raw === 'published' ? 'published' : 'draft'
}

function parseSortOrder(raw: FormDataEntryValue | null): number {
  const n = Number(String(raw || '0'))
  return Number.isFinite(n) ? Math.trunc(n) : 0
}

export async function createCoreValue(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const title = String(formData.get('title') || '').trim()
    if (!title) return { ok: false, error: 'Title is required' }
    const now = new Date()
    const [row] = await db
      .insert(coreValues)
      .values({
        title,
        description: String(formData.get('description') || '').trim(),
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        status: parseStatus(formData.get('status')),
        updatedAt: now,
      })
      .returning({ id: coreValues.id })
    revalidatePath('/admin/core-values')
    revalidatePath('/about')
    revalidatePath('/')
    return { ok: true, id: row.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to create core value' }
  }
}

export async function updateCoreValue(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const title = String(formData.get('title') || '').trim()
    if (!title) return { ok: false, error: 'Title is required' }
    const now = new Date()
    await db
      .update(coreValues)
      .set({
        title,
        description: String(formData.get('description') || '').trim(),
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        status: parseStatus(formData.get('status')),
        updatedAt: now,
      })
      .where(eq(coreValues.id, id))
    revalidatePath('/admin/core-values')
    revalidatePath(`/admin/core-values/${id}`)
    revalidatePath('/about')
    revalidatePath('/')
    return { ok: true, id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to update core value' }
  }
}

export async function deleteCoreValue(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.delete(coreValues).where(eq(coreValues.id, id))
    revalidatePath('/admin/core-values')
    revalidatePath('/about')
    revalidatePath('/')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to delete core value' }
  }
}
