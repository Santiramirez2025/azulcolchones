// lib/admin/session.ts — Token de sesión admin firmado (HMAC-SHA256).
// Compatible con edge (middleware) y node (rutas API): usa Web Crypto.
const enc = new TextEncoder()

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const u = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let s = ''
  for (const b of u) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromB64url(str: string): string {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4))
  return atob(str.replace(/-/g, '+').replace(/_/g, '/') + pad)
}

async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data))
  return b64url(sig)
}

const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 días

/** Crea un token firmado con expiración. */
export async function createSessionToken(secret: string, ttlMs = DEFAULT_TTL_MS): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify({ exp: Date.now() + ttlMs })))
  const sig = await sign(payload, secret)
  return `${payload}.${sig}`
}

/** Verifica firma + expiración. Devuelve true si es válido. */
export async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  if (!token || !secret) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false
  const expected = await sign(payload, secret)
  if (expected !== sig) return false
  try {
    const { exp } = JSON.parse(fromB64url(payload))
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

export const ADMIN_COOKIE = 'admin_session'
