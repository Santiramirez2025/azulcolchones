import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { searchProducts } from '@/lib/api/products'
import { logger } from '@/lib/logger'

const SearchParamsSchema = z.object({
  q: z.string().trim().min(2).max(100),
  limit: z.coerce.number().int().min(1).max(50).default(10),
})

export async function GET(request: NextRequest) {
  const parsed = SearchParamsSchema.safeParse({
    q: request.nextUrl.searchParams.get('q') ?? '',
    limit: request.nextUrl.searchParams.get('limit') ?? undefined,
  })

  if (!parsed.success) {
    return NextResponse.json([], {
      status: 200,
      headers: { 'Cache-Control': 'public, max-age=30' },
    })
  }

  try {
    const results = await searchProducts(parsed.data.q, parsed.data.limit)
    return NextResponse.json(results, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (err) {
    logger.error('[products/search] error:', err)
    return NextResponse.json([], { status: 500 })
  }
}
