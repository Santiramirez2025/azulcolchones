// app/api/asesor/precios/route.ts — Precios del asesor (para embeds client-side)
import { NextResponse } from 'next/server'
import { getPreciosAsesor } from '@/lib/asesor/precios'

export const runtime = 'nodejs'
export const revalidate = 3600

export async function GET() {
  try {
    const precios = await getPreciosAsesor()
    return NextResponse.json(precios, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch {
    return NextResponse.json({}, { status: 200 })
  }
}
