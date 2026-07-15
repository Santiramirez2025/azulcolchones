// middleware.ts — Protege el panel /admin y sus APIs con la sesión firmada.
import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, ADMIN_COOKIE } from '@/lib/admin/session'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // El login y su API quedan abiertos.
  const isLoginPage = pathname === '/admin/login'
  const isLoginApi = pathname.startsWith('/api/admin/login')
  if (isLoginPage || isLoginApi) return NextResponse.next()

  const secret = process.env.ADMIN_SESSION_SECRET || ''
  const token = req.cookies.get(ADMIN_COOKIE)?.value || ''
  const ok = await verifySessionToken(token, secret)

  if (ok) return NextResponse.next()

  // No autorizado
  if (pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const url = req.nextUrl.clone()
  url.pathname = '/admin/login'
  url.searchParams.set('next', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
