'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function SiteChrome({
  children,
  isAdminUser = false,
}: {
  children: React.ReactNode
  isAdminUser?: boolean
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation showAdmin={isAdminUser} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
