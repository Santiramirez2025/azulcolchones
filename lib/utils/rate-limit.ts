// In-memory rate limiter. En Fluid Compute las instancias se reusan,
// así que protege contra el grueso del abuso, pero no es 100% efectivo
// entre regiones / cold starts. Migrar a Upstash Redis en Etapa 6.

type Bucket = { count: number; resetAt: number }

const BUCKETS = new Map<string, Bucket>()
const MAX_BUCKETS = 10_000

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetIn: number
}

export interface RateLimitOptions {
  key: string
  limit: number
  windowMs: number
}

export function rateLimit({ key, limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const bucket = BUCKETS.get(key)

  if (!bucket || now > bucket.resetAt) {
    BUCKETS.set(key, { count: 1, resetAt: now + windowMs })
    if (BUCKETS.size > MAX_BUCKETS) evictOldest(now)
    return { allowed: true, remaining: limit - 1, resetIn: Math.ceil(windowMs / 1000) }
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((bucket.resetAt - now) / 1000),
    }
  }

  bucket.count++
  return {
    allowed: true,
    remaining: limit - bucket.count,
    resetIn: Math.ceil((bucket.resetAt - now) / 1000),
  }
}

function evictOldest(now: number) {
  for (const [k, b] of BUCKETS) {
    if (b.resetAt < now) BUCKETS.delete(k)
  }
  if (BUCKETS.size > MAX_BUCKETS) {
    const firstKey = BUCKETS.keys().next().value
    if (firstKey) BUCKETS.delete(firstKey)
  }
}

export function getClientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]?.trim() || 'unknown'
  return headers.get('x-real-ip') || 'unknown'
}
