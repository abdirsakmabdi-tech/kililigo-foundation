import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Next.js routes are case-sensitive; normalize /Admin → /admin
  if (pathname.toLowerCase().startsWith('/admin') && pathname !== pathname.toLowerCase()) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.toLowerCase()
    return NextResponse.redirect(url)
  }

  const isLoggedIn = !!req.auth

  if (pathname.startsWith('/admin/login')) {
    if (isLoggedIn) return NextResponse.redirect(new URL('/admin', req.url))
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') && !isLoggedIn) {
    const login = new URL('/admin/login', req.url)
    login.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(login)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin', '/admin/:path*', '/Admin', '/Admin/:path*'],
}
