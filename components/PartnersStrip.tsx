'use client'

import { motion } from 'framer-motion'

const partners = [
  { name: 'UNHCR', fullName: 'United Nations High Commissioner for Refugees' },
  { name: 'UNICEF', fullName: 'United Nations Children\'s Fund' },
  { name: 'MSF', fullName: 'Médecins Sans Frontières' },
  { name: 'USAID', fullName: 'United States Agency for International Development' },
  { name: 'IKEA Foundation', fullName: 'IKEA Foundation' },
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
            <div className="flex gap-16 md:gap-24 flex-shrink-0">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <span
                    className="text-xl md:text-2xl font-bold text-gray-600 whitespace-nowrap"
                    title={partner.fullName}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
