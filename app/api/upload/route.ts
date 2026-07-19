import { put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'

const MAX_IMAGE = 2 * 1024 * 1024
const MAX_PDF = 5 * 1024 * 1024

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 120)
}

async function saveLocally(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer())
  const folder = path.join(process.cwd(), 'public', 'uploads', 'cms')
  await mkdir(folder, { recursive: true })
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}-${sanitizeFilename(file.name)}`
  await writeFile(path.join(folder, filename), bytes)
  return `/uploads/cms/${filename}`
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'

  if (!isImage && !isPdf) {
    return NextResponse.json({ error: 'Only images and PDFs are allowed' }, { status: 400 })
  }
  if (isImage && file.size > MAX_IMAGE) {
    return NextResponse.json({ error: 'Image must be 2 MB or smaller' }, { status: 400 })
  }
  if (isPdf && file.size > MAX_PDF) {
    return NextResponse.json({ error: 'PDF must be 5 MB or smaller' }, { status: 400 })
  }

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`cms/${Date.now()}-${sanitizeFilename(file.name)}`, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      return NextResponse.json({ url: blob.url, storage: 'blob' })
    }

    // Local fallback for development (not persisted on Vercel serverless)
    if (process.env.VERCEL) {
      return NextResponse.json(
        {
          error:
            'BLOB_READ_WRITE_TOKEN is not set. Create a Vercel Blob store and add the token to environment variables.',
        },
        { status: 500 }
      )
    }

    const url = await saveLocally(file)
    return NextResponse.json({ url, storage: 'local' })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
