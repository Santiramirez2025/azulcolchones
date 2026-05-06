import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 2000

export async function GET() {
  const startedAt = Date.now()

  try {
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('db_timeout')), TIMEOUT_MS),
      ),
    ])

    return NextResponse.json(
      {
        status: 'ok',
        db: 'ok',
        latencyMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown'
    return NextResponse.json(
      {
        status: 'degraded',
        db: 'error',
        error: message,
        latencyMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
