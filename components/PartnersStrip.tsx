'use client'

export type PartnerItem = {
  id: string
  name: string
  fullName: string
  logoUrl: string
  websiteUrl: string | null
  tall: boolean
}

function LogoItem({ partner }: { partner: PartnerItem }) {
  const sizeClass = partner.tall ? 'h-16 max-w-[80px]' : 'h-9 max-w-[130px]'

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={partner.logoUrl}
      alt={partner.fullName || partner.name}
      className={`${sizeClass} w-auto object-contain`}
    />
  )

  return (
    <div
      className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 px-6 py-6"
      title={partner.fullName || partner.name}
    >
      {partner.websiteUrl ? (
        <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  )
}

export default function PartnersStrip({ partners }: { partners: PartnerItem[] }) {
  if (partners.length === 0) return null

  const row1 = partners.slice(0, 3)
  const row2 = partners.slice(3, 6)
  const extras = partners.slice(6)

  return (
    <div className="bg-[#dde4de] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24">
          <div className="md:w-1/3 md:sticky md:top-32 md:self-start text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-sans leading-[1.05] uppercase">
              Our Partners.
            </h2>
          </div>

          <div className="md:w-2/3">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                {row1.map((partner) => (
                  <LogoItem key={partner.id} partner={partner} />
                ))}
                {Array.from({ length: Math.max(0, 3 - row1.length) }).map((_, i) => (
                  <div key={`empty-1-${i}`} />
                ))}
              </div>
              {(row2.length > 0 || extras.length > 0) && (
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                  {row2.map((partner) => (
                    <LogoItem key={partner.id} partner={partner} />
                  ))}
                  {Array.from({ length: Math.max(0, 3 - row2.length) }).map((_, i) => (
                    <div key={`empty-2-${i}`} />
                  ))}
                </div>
              )}
              {extras.length > 0 &&
                Array.from({ length: Math.ceil(extras.length / 3) }).map((_, rowIndex) => {
                  const slice = extras.slice(rowIndex * 3, rowIndex * 3 + 3)
                  return (
                    <div
                      key={`extra-row-${rowIndex}`}
                      className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100"
                    >
                      {slice.map((partner) => (
                        <LogoItem key={partner.id} partner={partner} />
                      ))}
                      {Array.from({ length: Math.max(0, 3 - slice.length) }).map((_, i) => (
                        <div key={`empty-extra-${rowIndex}-${i}`} />
                      ))}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
