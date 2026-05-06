import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

const EXPIRE_AFTER_DAYS = 30

export async function GET(request: NextRequest) {
  // Vercel Cron envía Authorization: Bearer <CRON_SECRET>.
  // Bloquear cualquier otro caller.
  const auth = request.headers.get('authorization')
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - EXPIRE_AFTER_DAYS)

  try {
    const result = await prisma.order.updateMany({
      where: {
        paymentMethod: 'whatsapp',
        paymentStatus: 'pending_contact',
        createdAt: { lt: cutoff },
      },
      data: { paymentStatus: 'expired', status: 'cancelled' },
    })

    logger.info('[cron/expire-reservas]', {
      expired: result.count,
      cutoff: cutoff.toISOString(),
    })

    return NextResponse.json({
      success: true,
      expired: result.count,
      cutoff: cutoff.toISOString(),
    })
  } catch (err) {
    logger.error('[cron/expire-reservas] error', err)
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
