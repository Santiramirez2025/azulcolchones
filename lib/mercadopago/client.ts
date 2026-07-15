// lib/mercadopago/client.ts — Cliente server-side de Mercado Pago (Checkout Pro).
// El Access Token se lee primero de la DB (editable desde /admin) y si no, de la env var.
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago'
import { getSetting, SETTING_KEYS } from '@/lib/settings'

/** Access Token: DB (panel) → env var. */
export async function getMpAccessToken(): Promise<string | null> {
  const fromDb = await getSetting(SETTING_KEYS.mpAccessToken)
  return fromDb || process.env.MP_ACCESS_TOKEN || null
}

/** Public Key: DB (panel) → env var. */
export async function getMpPublicKey(): Promise<string | null> {
  const fromDb = await getSetting(SETTING_KEYS.mpPublicKey)
  return fromDb || process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || null
}

/** Secret del webhook: DB (panel) → env var. */
export async function getMpWebhookSecret(): Promise<string | null> {
  const fromDb = await getSetting(SETTING_KEYS.mpWebhookSecret)
  return fromDb || process.env.MP_WEBHOOK_SECRET || null
}

async function getMpClient(): Promise<MercadoPagoConfig> {
  const accessToken = await getMpAccessToken()
  if (!accessToken) throw new Error('MP_ACCESS_TOKEN no configurado')
  return new MercadoPagoConfig({ accessToken, options: { timeout: 10000 } })
}

export async function getPreferenceClient(): Promise<Preference> {
  return new Preference(await getMpClient())
}

export async function getPaymentClient(): Promise<Payment> {
  return new Payment(await getMpClient())
}

/** True si hay algún access token configurado (DB o env). */
export async function isMpConfigured(): Promise<boolean> {
  return Boolean(await getMpAccessToken())
}

/** Base URL pública para back_urls y notification_url. */
export function getBaseUrl(): string {
  return (
    process.env.MP_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://azulcolchones.com'
      : 'http://localhost:3000')
  ).replace(/\/$/, '')
}
