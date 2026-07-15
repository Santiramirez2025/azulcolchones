// app/api/lead/route.ts — Captura de leads del asesor / combo (remarketing)
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { rateLimit, getClientIp } from '@/lib/utils/rate-limit'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

const LeadSchema = z.object({
  name: z.string().max(120).optional().nullable(),
  phone: z.string().max(40).optional().nullable(),
  email: z.string().email().max(120).optional().nullable(),
  source: z.enum(['asesor', 'combo', 'quiz']).default('asesor'),
  recommendation: z.unknown().optional(),
})

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const rl = rateLimit({ key: `lead:${ip}`, limit: 30, windowMs: 60 * 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Demasiados envíos. Probá más tarde.' },
      { status: 429, headers: { 'Retry-After': String(rl.resetIn) } },
    )
  }

  let parsed: z.infer<typeof LeadSchema>
  try {
    parsed = LeadSchema.parse(await request.json())
  } catch (e) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  try {
    await prisma.lead.create({
      data: {
        name: parsed.name ?? null,
        phone: parsed.phone ?? null,
        email: parsed.email ?? null,
        source: parsed.source,
        recommendation:
          parsed.recommendation === undefined
            ? Prisma.JsonNull
            : (parsed.recommendation as Prisma.InputJsonValue),
      },
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    logger.error('Error creando lead', { error: String(e) })
    return NextResponse.json({ error: 'No se pudo guardar.' }, { status: 500 })
  }
}
