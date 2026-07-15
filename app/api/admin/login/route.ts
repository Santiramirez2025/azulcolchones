// app/api/admin/login/route.ts — Login del panel (contraseña simple).
import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, ADMIN_COOKIE } from '@/lib/admin/session'
import { rateLimit, getClientIp } from '@/lib/utils/rate-limit'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const rl = rateLimit({ key: `admin-login:${ip}`, limit: 8, windowMs: 15 * 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Demasiados intentos. Esperá un rato.' }, { status: 429 })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!adminPassword || !secret) {
    return NextResponse.json({ error: 'Panel no configurado en el servidor.' }, { status: 503 })
  }

  let password = ''
  try {
    password = (await req.json())?.password ?? ''
  } catch {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const token = await createSessionToken(secret)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  })
  return res
}
