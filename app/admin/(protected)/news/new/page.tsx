import NewsForm from '@/components/admin/NewsForm'
import { createNews } from '@/app/admin/_actions/news'

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-footer-dark">New news post</h1>
      <NewsForm action={createNews} submitLabel="Create post" />
    </div>
  )
}
