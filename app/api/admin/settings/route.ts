// app/api/admin/settings/route.ts — Guarda las credenciales de Mercado Pago (admin).
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { setSetting, SETTING_KEYS } from '@/lib/settings'

export const runtime = 'nodejs'

const Schema = z.object({
  mpAccessToken: z.string().max(300).optional(),
  mpPublicKey: z.string().max(300).optional(),
  mpWebhookSecret: z.string().max(300).optional(),
})

export async function POST(req: NextRequest) {
  let data: z.infer<typeof Schema>
  try {
    data = Schema.parse(await req.json())
  } catch (e) {
    return NextResponse.json({ error: 'Datos inválidos', detail: String(e) }, { status: 400 })
  }

  const updated: string[] = []
  // Solo actualizamos los campos que llegan con contenido (vacío = no tocar).
  if (data.mpAccessToken && data.mpAccessToken.trim()) {
    await setSetting(SETTING_KEYS.mpAccessToken, data.mpAccessToken.trim())
    updated.push('Access Token')
  }
  if (data.mpPublicKey && data.mpPublicKey.trim()) {
    await setSetting(SETTING_KEYS.mpPublicKey, data.mpPublicKey.trim())
    updated.push('Public Key')
  }
  if (data.mpWebhookSecret && data.mpWebhookSecret.trim()) {
    await setSetting(SETTING_KEYS.mpWebhookSecret, data.mpWebhookSecret.trim())
    updated.push('Clave secreta del webhook')
  }

  return NextResponse.json({ ok: true, updated })
}
