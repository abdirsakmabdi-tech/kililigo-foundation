import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Source_Serif_4 } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const generalSans = localFont({
  src: '../GeneralSans_Complete/Fonts/WEB/fonts/GeneralSans-Variable.woff2',
  variable: '--font-general-sans',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
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
    <html lang="en" className={`${generalSans.variable} ${sourceSerif.variable}`}>
      <body className="font-sans bg-cream text-gray-800 min-h-screen">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
