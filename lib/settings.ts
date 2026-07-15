// lib/settings.ts — Configuración editable (clave-valor) guardada en la DB.
import { prisma } from '@/lib/prisma'

/** Lee un setting de la DB. Devuelve null si no existe. */
export async function getSetting(key: string): Promise<string | null> {
  try {
    const s = await prisma.setting.findUnique({ where: { key } })
    return s?.value ?? null
  } catch {
    return null
  }
}

/** Setea (upsert) un setting. Valor vacío → lo borra. */
export async function setSetting(key: string, value: string): Promise<void> {
  if (!value) {
    await prisma.setting.deleteMany({ where: { key } })
    return
  }
  await prisma.setting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  })
}

// Claves conocidas
export const SETTING_KEYS = {
  mpAccessToken: 'mp_access_token',
  mpPublicKey: 'mp_public_key',
  mpWebhookSecret: 'mp_webhook_secret',
} as const
