import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News | Kililigo Foundation',
  description: 'Stay updated with the latest news, press releases, and updates from Kililigo Foundation.',
}

export default function NewsPage() {
  return (
    <div className="pt-16 md:pt-20 bg-white">
      {/* Hero strip */}
      <div className="relative bg-secondary pb-0 pt-16 md:pt-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-24 -top-24 w-[500px] h-[500px] rounded-full bg-white/5" />
          <div className="absolute right-32 top-12 w-[300px] h-[300px] rounded-full bg-white/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
          <p className="text-white/60 text-sm font-sans uppercase tracking-widest mb-4">News &amp; Updates</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-sans">News</h1>
        </div>

        <div className="relative w-full leading-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Coming soon */}
      <div className="bg-white py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-900 font-sans mb-4">Coming soon</p>
          <p className="text-gray-600 font-sans">
            We are working on bringing you the latest news and updates. Please check back soon.
          </p>
        </div>
      </div>
    </div>
  )
}
