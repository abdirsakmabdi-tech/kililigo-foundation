import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import HeroSlideForm from '@/components/admin/HeroSlideForm'
import { updateHeroSlide } from '@/app/admin/_actions/hero'
import { db } from '@/lib/db'
import { heroSlides } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function EditHeroSlidePage({ params }: { params: { id: string } }) {
  const [item] = await db.select().from(heroSlides).where(eq(heroSlides.id, params.id)).limit(1)
  if (!item) notFound()

  async function action(formData: FormData) {
    'use server'
    return updateHeroSlide(params.id, formData)
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">Edit hero slide</h1>
      <HeroSlideForm
        initial={{
          imageUrl: item.imageUrl,
          sortOrder: item.sortOrder,
          status: item.status,
        }}
        action={action}
        submitLabel="Save changes"
      />
    </div>
  )
}
