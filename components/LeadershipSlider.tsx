'use client'

type Leader = {
  name: string
  role: string
  photo: string | null
}

export default function LeadershipSlider({ leaders }: { leaders: Leader[] }) {
  const scroll = (dir: 'left' | 'right') => {
    const el = document.getElementById('leadership-slider')
    if (el) el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-sans">Meet our leadership team.</h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 mt-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-primary/40 border border-primary/50 flex items-center justify-center hover:bg-primary active:bg-primary transition-colors group"
            aria-label="Previous"
          >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-primary/40 border border-primary/50 flex items-center justify-center hover:bg-primary active:bg-primary transition-colors group"
            aria-label="Next"
          >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        id="leadership-slider"
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {leaders.map((person) => (
          <div
            key={person.name}
            className="flex-shrink-0 w-56 md:w-64 snap-start bg-gray-200 rounded-xl overflow-hidden aspect-[3/4] relative flex flex-col justify-end"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {person.photo ? (
                <img src={person.photo} alt={person.name} className="w-full h-full object-cover object-top" />
              ) : (
                <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
            <div className="relative z-10 px-3 py-3 bg-black/60">
              <p className="font-bold text-white font-sans text-sm leading-snug">{person.name}</p>
              <p className="text-white/90 font-sans text-xs leading-snug mt-0.5">{person.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
