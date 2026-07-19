'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { vacancies } from '@/lib/db/schema'
import { slugify } from '@/lib/slug'

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string }

function parseStatus(raw: FormDataEntryValue | null): 'open' | 'closed' {
  return raw === 'closed' ? 'closed' : 'open'
}

export async function createVacancy(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const title = String(formData.get('title') || '').trim()
    if (!title) return { ok: false, error: 'Title is required' }
    const status = parseStatus(formData.get('status'))
    const slug = slugify(String(formData.get('slug') || '').trim() || title)
    const deadlineRaw = String(formData.get('deadline') || '').trim()
    const now = new Date()
    const [row] = await db
      .insert(vacancies)
      .values({
        title,
        slug,
        location: String(formData.get('location') || ''),
        employmentType: String(formData.get('employmentType') || 'Full-time'),
        description: String(formData.get('description') || ''),
        applyEmail: String(formData.get('applyEmail') || ''),
        deadline: deadlineRaw ? new Date(deadlineRaw) : null,
        status,
        updatedAt: now,
      })
      .returning({ id: vacancies.id })
    revalidatePath('/admin/vacancies')
    revalidatePath('/news')
    return { ok: true, id: row.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to create vacancy' }
  }
}

export async function updateVacancy(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const title = String(formData.get('title') || '').trim()
    if (!title) return { ok: false, error: 'Title is required' }
    const status = parseStatus(formData.get('status'))
    const slug = slugify(String(formData.get('slug') || '').trim() || title)
    const deadlineRaw = String(formData.get('deadline') || '').trim()
    const now = new Date()
    await db
      .update(vacancies)
      .set({
        title,
        slug,
        location: String(formData.get('location') || ''),
        employmentType: String(formData.get('employmentType') || 'Full-time'),
        description: String(formData.get('description') || ''),
        applyEmail: String(formData.get('applyEmail') || ''),
        deadline: deadlineRaw ? new Date(deadlineRaw) : null,
        status,
        updatedAt: now,
      })
      .where(eq(vacancies.id, id))
    revalidatePath('/admin/vacancies')
    revalidatePath(`/admin/vacancies/${id}`)
    revalidatePath('/news')
    return { ok: true, id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to update vacancy' }
  }
}

export async function deleteVacancy(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.delete(vacancies).where(eq(vacancies.id, id))
    revalidatePath('/admin/vacancies')
    revalidatePath('/news')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to delete vacancy' }
  }
}
