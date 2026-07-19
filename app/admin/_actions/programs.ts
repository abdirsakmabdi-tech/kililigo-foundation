'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { programs } from '@/lib/db/schema'
import { slugify } from '@/lib/slug'

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string }

function parseStatus(raw: FormDataEntryValue | null): 'draft' | 'published' {
  return raw === 'published' ? 'published' : 'draft'
}

function parseGroup(raw: FormDataEntryValue | null): 'core' | 'capacity' {
  return raw === 'capacity' ? 'capacity' : 'core'
}

function parseBool(raw: FormDataEntryValue | null): boolean {
  return raw === 'on' || raw === 'true' || raw === '1'
}

function parseSortOrder(raw: FormDataEntryValue | null): number {
  const n = Number(String(raw || '0'))
  return Number.isFinite(n) ? Math.trunc(n) : 0
}

export async function createProgram(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const title = String(formData.get('title') || '').trim()
    if (!title) return { ok: false, error: 'Title is required' }
    const status = parseStatus(formData.get('status'))
    const slug = slugify(String(formData.get('slug') || '').trim() || title)
    const now = new Date()
    const [row] = await db
      .insert(programs)
      .values({
        title,
        slug,
        description: String(formData.get('description') || ''),
        category: String(formData.get('category') || '').trim(),
        coverImageUrl: String(formData.get('coverImageUrl') || '').trim() || null,
        programGroup: parseGroup(formData.get('programGroup')),
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        showOnHome: parseBool(formData.get('showOnHome')),
        status,
        updatedAt: now,
      })
      .returning({ id: programs.id })
    revalidatePath('/admin/programs')
    revalidatePath('/programs')
    revalidatePath('/')
    return { ok: true, id: row.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to create program' }
  }
}

export async function updateProgram(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const title = String(formData.get('title') || '').trim()
    if (!title) return { ok: false, error: 'Title is required' }
    const status = parseStatus(formData.get('status'))
    const slug = slugify(String(formData.get('slug') || '').trim() || title)
    const now = new Date()
    await db
      .update(programs)
      .set({
        title,
        slug,
        description: String(formData.get('description') || ''),
        category: String(formData.get('category') || '').trim(),
        coverImageUrl: String(formData.get('coverImageUrl') || '').trim() || null,
        programGroup: parseGroup(formData.get('programGroup')),
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        showOnHome: parseBool(formData.get('showOnHome')),
        status,
        updatedAt: now,
      })
      .where(eq(programs.id, id))
    revalidatePath('/admin/programs')
    revalidatePath(`/admin/programs/${id}`)
    revalidatePath('/programs')
    revalidatePath('/')
    return { ok: true, id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to update program' }
  }
}

export async function deleteProgram(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.delete(programs).where(eq(programs.id, id))
    revalidatePath('/admin/programs')
    revalidatePath('/programs')
    revalidatePath('/')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to delete program' }
  }
}
