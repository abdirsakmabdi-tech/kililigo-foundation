import HeroSlideForm from '@/components/admin/HeroSlideForm'
import { createHeroSlide } from '@/app/admin/_actions/hero'

export default function NewHeroSlidePage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">New hero slide</h1>
      <HeroSlideForm action={createHeroSlide} submitLabel="Create slide" />
    </div>
  )
}
