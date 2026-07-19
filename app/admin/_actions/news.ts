'use server'

import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { news } from '@/lib/db/schema'
import { slugify } from '@/lib/slug'

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string }

function parseStatus(raw: FormDataEntryValue | null): 'draft' | 'published' {
  return raw === 'published' ? 'published' : 'draft'
}

export async function createNews(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const title = String(formData.get('title') || '').trim()
    if (!title) return { ok: false, error: 'Title is required' }
    const status = parseStatus(formData.get('status'))
    const slug = slugify(String(formData.get('slug') || '').trim() || title)
    const now = new Date()
    const [row] = await db
      .insert(news)
      .values({
        title,
        slug,
        excerpt: String(formData.get('excerpt') || ''),
        body: String(formData.get('body') || ''),
        coverImageUrl: String(formData.get('coverImageUrl') || '') || null,
        status,
        publishedAt: status === 'published' ? now : null,
        updatedAt: now,
      })
      .returning({ id: news.id })
    revalidatePath('/admin/news')
    revalidatePath('/news')
    return { ok: true, id: row.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to create news' }
  }
}

export async function updateNews(id: string, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin()
    const title = String(formData.get('title') || '').trim()
    if (!title) return { ok: false, error: 'Title is required' }
    const status = parseStatus(formData.get('status'))
    const slug = slugify(String(formData.get('slug') || '').trim() || title)
    const now = new Date()
    const [existing] = await db.select().from(news).where(eq(news.id, id)).limit(1)
    if (!existing) return { ok: false, error: 'Not found' }
    await db
      .update(news)
      .set({
        title,
        slug,
        excerpt: String(formData.get('excerpt') || ''),
        body: String(formData.get('body') || ''),
        coverImageUrl: String(formData.get('coverImageUrl') || '') || null,
        status,
        publishedAt: status === 'published' ? existing.publishedAt ?? now : null,
        updatedAt: now,
      })
      .where(eq(news.id, id))
    revalidatePath('/admin/news')
    revalidatePath(`/admin/news/${id}`)
    revalidatePath('/news')
    return { ok: true, id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to update news' }
  }
}

export async function deleteNews(id: string): Promise<ActionResult> {
  try {
    await requireAdmin()
    await db.delete(news).where(eq(news.id, id))
    revalidatePath('/admin/news')
    revalidatePath('/news')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to delete news' }
  }
}
