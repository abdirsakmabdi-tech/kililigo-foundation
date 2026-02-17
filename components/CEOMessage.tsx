import Image from 'next/image'

const message1 = "Our journey began with a simple yet profound belief: that every individual in Somalia deserves the opportunity to thrive, regardless of the challenges they face. Today, we stand as a bridge between urgent humanitarian needs and long-term sustainable development."

const message2 = "At Kililigo, we are not interested in temporary fixes. We are invested in sustainable impact. Whether we are providing emergency relief, pioneering digital aid solutions, or empowering women to lead in their local markets, our focus is always on fostering self-reliance."

export default function CEOMessage() {
  return (
    <section id="ceo-message" className="relative min-h-[90vh] py-20 md:py-28 bg-white flex items-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Mobile: message overlaps bottom half of image */}
        <div className="md:hidden relative">
          <div className="relative aspect-[4/3] w-full rounded-t-2xl overflow-hidden">
            <Image
              src="/ceo.png"
              alt="Bashir Said Ismail - Executive Director"
              fill
              className="object-contain object-left"
              sizes="100vw"
              priority
            />
          </div>
          <div className="relative z-10 -mt-24 mx-4 mb-4 bg-[#005EB8] rounded-2xl p-5 shadow-xl space-y-3">
            <h2 className="text-xl font-bold text-white font-sans">Message from Our CEO</h2>
            <div className="space-y-3">
              <p className="text-white/95 text-sm leading-snug font-sans">{message1}</p>
              <p className="text-white/95 text-sm leading-snug font-sans">{message2}</p>
            </div>
            <div className="pt-2">
              <p className="font-bold text-white text-base font-sans">Bashir Said Ismail</p>
              <p className="text-white/70 text-sm font-sans">Executive Director</p>
            </div>
          </div>
        </div>

        {/* Desktop: overlay layout - image bigger, message panel overlaps on right */}
        <div className="hidden md:block relative min-h-[70vh] rounded-2xl overflow-hidden">
          {/* Layer 1: Image extends full width, message panel overlaps on top */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden [&_img]:rounded-2xl">
            <Image
              src="/ceo.png"
              alt="Bashir Said Ismail - Executive Director"
              fill
              className="object-contain object-left scale-125 origin-left"
              sizes="100vw"
              priority
            />
          </div>

          {/* Layer 2: Message panel overlapping on right */}
          <div className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 w-[50%] max-w-xl z-10 bg-[#005EB8] rounded-2xl shadow-xl p-5 lg:p-6 space-y-3">
            <h2 className="text-xl lg:text-2xl font-bold text-white font-sans">Message from Our CEO</h2>
            <div className="space-y-3">
              <p className="text-white/95 text-sm lg:text-base leading-snug font-sans">{message1}</p>
              <p className="text-white/95 text-sm lg:text-base leading-snug font-sans">{message2}</p>
            </div>
            <div className="pt-1">
              <p className="font-bold text-white text-base font-sans">Bashir Said Ismail</p>
              <p className="text-white/70 text-sm font-sans">Executive Director</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
