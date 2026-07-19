'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { leaders } from '@/lib/db/schema'

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string }

function parseStatus(raw: FormDataEntryValue | null): 'draft' | 'published' {
  return raw === 'published' ? 'published' : 'draft'
}

function parseSortOrder(raw: FormDataEntryValue | null): number {
  const n = Number(String(raw || '0'))
  return Number.isFinite(n) ? Math.trunc(n) : 0
}

export async function createLeader(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const name = String(formData.get('name') || '').trim()
    if (!name) return { ok: false, error: 'Name is required' }
    const now = new Date()
    const [row] = await db
      .insert(leaders)
      .values({
        name,
        role: String(formData.get('role') || '').trim(),
        photoUrl: String(formData.get('photoUrl') || '').trim() || null,
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        status: parseStatus(formData.get('status')),
        updatedAt: now,
      })
      .returning({ id: leaders.id })
    revalidatePath('/admin/leaders')
    revalidatePath('/about')
    return { ok: true, id: row.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to create leader' }
  }
}

export async function updateLeader(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const name = String(formData.get('name') || '').trim()
    if (!name) return { ok: false, error: 'Name is required' }
    const now = new Date()
    await db
      .update(leaders)
      .set({
        name,
        role: String(formData.get('role') || '').trim(),
        photoUrl: String(formData.get('photoUrl') || '').trim() || null,
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        status: parseStatus(formData.get('status')),
        updatedAt: now,
      })
      .where(eq(leaders.id, id))
    revalidatePath('/admin/leaders')
    revalidatePath(`/admin/leaders/${id}`)
    revalidatePath('/about')
    return { ok: true, id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to update leader' }
  }
}

export async function deleteLeader(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.delete(leaders).where(eq(leaders.id, id))
    revalidatePath('/admin/leaders')
    revalidatePath('/about')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to delete leader' }
  }
}
