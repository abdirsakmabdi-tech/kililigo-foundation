import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Kililigo Foundation | Empowering Communities, Restoring Dignity',
  description: 'Kililigo Foundation provides timely humanitarian assistance and promotes recovery, resilience, and social justice in Somalia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-cream text-gray-800 min-h-screen">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
