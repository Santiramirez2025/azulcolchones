// app/admin/(panel)/configuracion/page.tsx — Configuración (credenciales Mercado Pago).
import { getSetting, SETTING_KEYS } from '@/lib/settings'
import SettingsForm from './SettingsForm'

export const dynamic = 'force-dynamic'

function mask(v: string): string {
  if (v.length <= 12) return v.slice(0, 3) + '…'
  return `${v.slice(0, 8)}…${v.slice(-4)}`
}

async function status(dbVal: string | null, envVal: string | undefined) {
  const val = dbVal || envVal || null
  if (!val) return { set: false as const }
  const isTest = val.startsWith('TEST-')
  const isProd = val.startsWith('APP_USR-')
  return {
    set: true as const,
    source: dbVal ? ('panel' as const) : ('env' as const),
    masked: mask(val),
    mode: isTest ? ('test' as const) : isProd ? ('prod' as const) : ('desconocido' as const),
  }
}

export default async function ConfiguracionPage() {
  const [dbToken, dbPub, dbSecret] = await Promise.all([
    getSetting(SETTING_KEYS.mpAccessToken),
    getSetting(SETTING_KEYS.mpPublicKey),
    getSetting(SETTING_KEYS.mpWebhookSecret),
  ])

  const tokenStatus = await status(dbToken, process.env.MP_ACCESS_TOKEN)
  const pubStatus = await status(dbPub, process.env.NEXT_PUBLIC_MP_PUBLIC_KEY)
  const secretStatus = await status(dbSecret, process.env.MP_WEBHOOK_SECRET)

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 text-2xl font-black">Configuración</h1>
      <p className="mb-6 text-sm text-zinc-400">
        Credenciales de Mercado Pago. Se guardan en la base y el checkout las usa al instante — no
        hace falta re-deployar.
      </p>

      <SettingsForm
        tokenStatus={tokenStatus}
        pubStatus={pubStatus}
        secretStatus={secretStatus}
      />
    </div>
  )
}
