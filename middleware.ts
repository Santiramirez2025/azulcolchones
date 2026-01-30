// middleware.ts - Versión con 403
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Obtener país desde headers de Vercel (con fallback seguro)
  const country = request.geo?.country ?? 'US'
  
  // Permitir solo Argentina
  if (country !== 'AR') {
    // Evitar loop de redirección
    if (request.nextUrl.pathname !== '/blocked') {
      return NextResponse.redirect(new URL('/blocked', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}