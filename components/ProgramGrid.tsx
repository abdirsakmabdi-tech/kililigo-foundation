'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const programs = [
  {
    category: 'Relief',
    title: 'Humanitarian Assistance & Emergency Response',
    description: 'The organization provides rapid, life-saving support during disasters and conflicts, including emergency food, shelter, and essential WASH services to meet immediate needs and protect dignity.',
    image: '/program-humanitarian.png',
    gradient: 'from-orange-600 via-primary to-amber-600',
  },
  {
    category: 'Health',
    title: 'Health & Nutrition',
    description: 'The organization delivers accessible primary healthcare, mobile clinic services, maternal and child health programs, nutrition support, and disease prevention initiatives to improve community health outcomes.',
    image: '/program-health.png',
    gradient: 'from-emerald-600 via-teal-600 to-secondary',
  },
  {
    category: 'Education',
    title: 'Education & Child Protection',
    description: 'The organization supports safe, inclusive education and child protection through learning opportunities, psychosocial support, and safe spaces that promote resilience and child well-being.',
    image: '/program-education.png',
    gradient: 'from-secondary via-blue-600 to-indigo-600',
  },
  {
    category: 'Rights',
    title: 'Protection & Human Rights',
    description: 'The organization offers protection and legal support to refugees, IDPs, and vulnerable groups, promoting rights awareness, access to justice, and the prevention of abuse and exploitation.',
    image: '/program-protection.png',
    gradient: 'from-indigo-600 via-violet-600 to-purple-700',
  },
  {
    category: 'Empowerment',
    title: "Women's Economic Empowerment",
    description: "The organization promotes economic self-reliance and gender equality by supporting livelihoods, skills development, and income-generating opportunities, while fostering safe and inclusive environments for women and youth.",
    image: '/hero-2.png',
    gradient: 'from-pink-600 via-rose-600 to-primary',
  },
  {
    category: 'Youth',
    title: 'Youth Leadership and Civic Engagement',
    description: 'The organization empowers youth through skills development and meaningful participation in community and public decision-making, enabling them to drive positive change, strengthen social cohesion, and support sustainable development.',
    image: '/hero-3.png',
    gradient: 'from-primary via-amber-500 to-yellow-600',
  },
  {
    category: 'Peace',
    title: 'Peacebuilding & Social Cohesion',
    description: 'The organization strengthens social cohesion through dialogue, reconciliation, conflict prevention, trauma healing, and post-crisis recovery initiatives.',
    image: '/hero.png',
    gradient: 'from-green-600 via-emerald-700 to-teal-800',
  },
]

const SCROLL_JOURNEY_VH = 350

export default function ProgramGrid() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const carousel = scrollRef.current
    if (!wrapper || !carousel) return

    const windowHeight = () => window.innerHeight
    const journeyPx = () => windowHeight() * (SCROLL_JOURNEY_VH / 100)

    const updateCarouselFromScroll = () => {
      const rect = wrapper.getBoundingClientRect()
      const scrollable = carousel.scrollWidth - carousel.clientWidth
      if (scrollable <= 0) return

      const journey = journeyPx()
      const progress = Math.max(0, Math.min(1, -rect.top / journey))
      carousel.scrollLeft = progress * scrollable
    }

    const handleWheel = (e: WheelEvent) => {
      const rect = wrapper.getBoundingClientRect()
      const journey = journeyPx()
      const progress = Math.max(0, Math.min(1, -rect.top / journey))

      if (progress <= 0 && e.deltaY < 0) return
      if (progress >= 1 && e.deltaY > 0) return

      const wrapperTop = rect.top + window.scrollY
      const scrollMin = wrapperTop
      const scrollMax = wrapperTop + journey
      const newScrollY = Math.max(scrollMin, Math.min(scrollMax, window.scrollY + e.deltaY))

      const inPinZone = rect.top <= 0 && rect.bottom > 0
      if (!inPinZone) return

      e.preventDefault()
      requestAnimationFrame(() => window.scrollTo(0, newScrollY))
    }

    let lastTouchY = 0
    const handleTouchStart = (e: Event) => {
      const ev = e as TouchEvent
      if (ev.touches.length === 1) lastTouchY = ev.touches[0].clientY
    }
    const handleTouchMove = (e: Event) => {
      const ev = e as TouchEvent
      if (ev.touches.length !== 1) return
      const rect = wrapper.getBoundingClientRect()
      const inPinZone = rect.top <= 0 && rect.bottom > 0
      if (!inPinZone) return

      const journey = journeyPx()
      const progress = Math.max(0, Math.min(1, -rect.top / journey))
      const touchY = ev.touches[0].clientY
      const deltaY = lastTouchY - touchY
      lastTouchY = touchY

      if (progress <= 0 && deltaY < 0) return
      if (progress >= 1 && deltaY > 0) return

      const wrapperTop = rect.top + window.scrollY
      const scrollMin = wrapperTop
      const scrollMax = wrapperTop + journey
      const newScrollY = Math.max(scrollMin, Math.min(scrollMax, window.scrollY + deltaY))
      if (newScrollY !== window.scrollY) {
        ev.preventDefault()
        window.scrollTo(0, newScrollY)
      }
    }

    const stickyEl = wrapper.querySelector('.sticky') ?? wrapper
    stickyEl.addEventListener('touchstart', handleTouchStart, { passive: true })
    stickyEl.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('scroll', updateCarouselFromScroll, { passive: true })
    window.addEventListener('resize', updateCarouselFromScroll)
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    updateCarouselFromScroll()

    return () => {
      stickyEl.removeEventListener('touchstart', handleTouchStart)
      stickyEl.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('scroll', updateCarouselFromScroll)
      window.removeEventListener('resize', updateCarouselFromScroll)
      window.removeEventListener('wheel', handleWheel, { capture: true })
    }
  }, [])

  return (
    <section id="programs" className="bg-cream">
      <div
        ref={wrapperRef}
        className="relative"
        style={{ height: `${SCROLL_JOURNEY_VH}vh` }}
      >
        <div className="sticky top-0 left-0 right-0 h-screen flex flex-col justify-center bg-cream py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col min-h-0">
            <div className="text-center mb-8 flex-shrink-0">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Our Core Programs
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive initiatives designed to support vulnerable communities
                and promote sustainable development across Somalia.
              </p>
            </div>

            <div
              ref={scrollRef}
              className="overflow-x-auto overflow-y-visible min-w-0 flex-1 snap-x snap-mandatory scroll-smooth pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x scrollbar-hide min-h-[340px] md:min-h-[400px]"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex gap-5 md:gap-6 min-w-max items-start pr-8 md:pr-12">
                {programs.map((program, index) => (
                  <Link
                    key={index}
                    href="#programs"
                    className="flex-shrink-0 w-[calc(60vw-1.5rem)] min-w-[320px] max-w-[520px] snap-start group transition-transform duration-300 hover:scale-[1.02]"
                  >
                    {/* Card container - position relative, overflow-hidden for rounded corners only */}
                    <div className={`relative h-[340px] md:h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br ${program.gradient} transition-shadow duration-300 group-hover:shadow-xl`}>
                      {/* Background image - absolute inset-0, object-cover */}
                      <div className="absolute inset-0">
                        <Image
                          src={program.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 60vw, 520px"
                        />
                      </div>
                      {/* Dark overlay gradient - darker for better content visibility */}
                      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/55 to-black/25" />

                      {/* Content - no inner holder, left-aligned, category at top, button always visible */}
                      <div className="absolute inset-0 z-[2] flex flex-col p-4 md:p-5 pb-3 md:pb-4">
                        {/* Category at top - left-aligned with content */}
                        <div className="pl-4 mb-[100px] shrink-0">
                          <span className="inline-flex items-center w-fit px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-wider">
                            {program.category}
                          </span>
                        </div>
                        {/* Title and description - no scroll on mobile/tablet */}
                        <div className="min-h-0 overflow-hidden lg:overflow-y-auto pl-4">
                          <h3 className="text-base md:text-lg font-bold text-white leading-snug font-sans mb-2 line-clamp-2 lg:line-clamp-none">
                            {program.title}
                          </h3>
                          <p className="text-gray-200 text-sm leading-relaxed font-sans mb-3 line-clamp-3 lg:line-clamp-none">
                            {program.description}
                          </p>
                        </div>
                        {/* Button */}
                        <div className="shrink-0 pl-4 pt-1">
                          <span className="inline-flex items-center justify-center h-8 px-4 bg-primary text-white text-xs font-semibold transition-all duration-300 group-hover:bg-primary/90" style={{ borderRadius: '9999px' }}>
                            Read more
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
