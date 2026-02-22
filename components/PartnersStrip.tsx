'use client'

import Image from 'next/image'

const partners = [
  {
    name: 'IRC',
    fullName: 'International Rescue Committee',
    logo: '/partner-irc.png',
    external: false,
    tall: false,
  },
  {
    name: 'UNHCR',
    fullName: 'United Nations High Commissioner for Refugees',
    logo: '/partner-unhcr.png',
    external: false,
    tall: true,
  },
  {
    name: 'UNICEF',
    fullName: 'United Nations Children\'s Fund',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Logo_of_UNICEF.svg/640px-Logo_of_UNICEF.svg.png',
    external: true,
    tall: false,
  },
  {
    name: 'USAID',
    fullName: 'United States Agency for International Development',
    logo: '/partner-usaid.png',
    external: false,
    tall: false,
  },
  {
    name: 'IKEA Foundation',
    fullName: 'IKEA Foundation',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/640px-Ikea_logo.svg.png',
    external: true,
    tall: false,
  },
  {
    name: 'Google',
    fullName: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png',
    external: true,
    tall: false,
  },
]

const row1 = partners.slice(0, 3)
const row2 = partners.slice(3)

function LogoItem({ partner }: { partner: typeof partners[0] }) {
  const sizeClass = partner.tall ? 'h-16 max-w-[80px]' : 'h-9 max-w-[130px]'

  return (
    <div
      className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default px-6 py-6"
      title={partner.fullName}
    >
      {partner.external ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={partner.logo}
          alt={partner.fullName}
          className={`${sizeClass} w-auto object-contain`}
        />
      ) : (
        <Image
          src={partner.logo}
          alt={partner.fullName}
          width={130}
          height={64}
          className={`${sizeClass} w-auto object-contain`}
        />
      )}
    </div>
  )
}

export default function PartnersStrip() {
  return (
    <div className="bg-[#dde4de] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24">

          {/* LEFT — sticky heading */}
          <div className="md:w-1/3 md:sticky md:top-32 md:self-start">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-sans leading-[1.05] uppercase">
              Our<br />Partners.
            </h2>
          </div>

          {/* RIGHT — logo grid */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Row 1 */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                {row1.map((partner) => (
                  <LogoItem key={partner.name} partner={partner} />
                ))}
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                {row2.map((partner) => (
                  <LogoItem key={partner.name} partner={partner} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
