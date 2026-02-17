'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const partners = [
  {
    name: 'UNHCR',
    fullName: 'United Nations High Commissioner for Refugees',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/UNHCR.svg/512px-UNHCR.svg.png',
  },
  {
    name: 'UNICEF',
    fullName: "United Nations Children's Fund",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/UNICEF_Logo.png',
  },
  {
    name: 'MSF',
    fullName: 'Médecins Sans Frontières',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/MSF_International_logo_2.png',
  },
  {
    name: 'USAID',
    fullName: 'United States Agency for International Development',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Usaid_logo.jpg',
  },
  {
    name: 'IKEA Foundation',
    fullName: 'IKEA Foundation',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/IKEA_Foundation_Logo.png',
  },
]

export default function PartnersStrip() {
  return (
    <section className="py-16 md:py-20 bg-cream border-y border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm font-medium mb-10 uppercase tracking-wider"
        >
          Trusted Partners
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden"
        >
          <div className="flex animate-scroll">
            <div className="flex items-center gap-16 md:gap-24 flex-shrink-0">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex items-center justify-center h-14 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.fullName}
                    width={140}
                    height={56}
                    className="h-12 w-auto object-contain"
                    title={partner.fullName}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
