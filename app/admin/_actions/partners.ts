'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { partners } from '@/lib/db/schema'

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string }

function parseStatus(raw: FormDataEntryValue | null): 'draft' | 'published' {
  return raw === 'published' ? 'published' : 'draft'
}

function parseSortOrder(raw: FormDataEntryValue | null): number {
  const n = Number(String(raw || '0'))
  return Number.isFinite(n) ? Math.trunc(n) : 0
}

function parseBool(raw: FormDataEntryValue | null): boolean {
  return raw === 'on' || raw === 'true' || raw === '1'
}

export async function createPartner(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const name = String(formData.get('name') || '').trim()
    if (!name) return { ok: false, error: 'Name is required' }
    const logoUrl = String(formData.get('logoUrl') || '').trim()
    if (!logoUrl) return { ok: false, error: 'Logo is required' }
    const now = new Date()
    const [row] = await db
      .insert(partners)
      .values({
        name,
        fullName: String(formData.get('fullName') || '').trim() || name,
        logoUrl,
        websiteUrl: String(formData.get('websiteUrl') || '').trim() || null,
        tall: parseBool(formData.get('tall')),
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        status: parseStatus(formData.get('status')),
        updatedAt: now,
      })
      .returning({ id: partners.id })
    revalidatePath('/admin/partners')
    revalidatePath('/')
    return { ok: true, id: row.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to create partner' }
  }
}

export async function updatePartner(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const name = String(formData.get('name') || '').trim()
    if (!name) return { ok: false, error: 'Name is required' }
    const logoUrl = String(formData.get('logoUrl') || '').trim()
    if (!logoUrl) return { ok: false, error: 'Logo is required' }
    const now = new Date()
    await db
      .update(partners)
      .set({
        name,
        fullName: String(formData.get('fullName') || '').trim() || name,
        logoUrl,
        websiteUrl: String(formData.get('websiteUrl') || '').trim() || null,
        tall: parseBool(formData.get('tall')),
        sortOrder: parseSortOrder(formData.get('sortOrder')),
        status: parseStatus(formData.get('status')),
        updatedAt: now,
      })
      .where(eq(partners.id, id))
    revalidatePath('/admin/partners')
    revalidatePath(`/admin/partners/${id}`)
    revalidatePath('/')
    return { ok: true, id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to update partner' }
  }
}

export async function deletePartner(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.delete(partners).where(eq(partners.id, id))
    revalidatePath('/admin/partners')
    revalidatePath('/')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to delete partner' }
  }
}
