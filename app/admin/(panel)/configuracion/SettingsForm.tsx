'use client'
// Formulario de credenciales Mercado Pago (admin).
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Check, ShieldCheck, ShieldAlert } from 'lucide-react'

type Status =
  | { set: false }
  | { set: true; source: 'panel' | 'env'; masked: string; mode: 'test' | 'prod' | 'desconocido' }

export default function SettingsForm({
  tokenStatus,
  pubStatus,
  secretStatus,
}: {
  tokenStatus: Status
  pubStatus: Status
  secretStatus: Status
}) {
  const router = useRouter()
  const [values, setValues] = useState({ mpAccessToken: '', mpPublicKey: '', mpWebhookSecret: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  async function save() {
    if (!values.mpAccessToken && !values.mpPublicKey && !values.mpWebhookSecret) {
      setError('Escribí al menos una credencial nueva para guardar.')
      return
    }
    setSaving(true)
    setError('')
    setMsg('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(d.error || 'No se pudo guardar')
      } else {
        setMsg(`Guardado: ${d.updated?.join(', ') || '—'}`)
        setValues({ mpAccessToken: '', mpPublicKey: '', mpWebhookSecret: '' })
        router.refresh()
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <Field
        label="Access Token"
        hint="El de tu app de Mercado Pago. APP_USR- es producción (cobra de verdad), TEST- es sandbox."
        placeholder="APP_USR-… o TEST-…"
        status={tokenStatus}
        value={values.mpAccessToken}
        onChange={(v) => setValues((s) => ({ ...s, mpAccessToken: v }))}
      />
      <Field
        label="Public Key"
        hint="Opcional (no la usa el checkout redirect, pero la guardamos)."
        placeholder="APP_USR-… o TEST-…"
        status={pubStatus}
        value={values.mpPublicKey}
        onChange={(v) => setValues((s) => ({ ...s, mpPublicKey: v }))}
      />
      <Field
        label="Clave secreta del webhook"
        hint="Opcional. La que te da MP al configurar el webhook (valida la firma)."
        placeholder="clave del panel de MP"
        status={secretStatus}
        value={values.mpWebhookSecret}
        onChange={(v) => setValues((s) => ({ ...s, mpWebhookSecret: v }))}
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
      {msg && <p className="text-sm text-emerald-400">{msg}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 font-bold text-white hover:bg-blue-500 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
          {saving ? 'Guardando…' : 'Guardar credenciales'}
        </button>
        <span className="text-xs text-zinc-500">Solo se actualizan los campos que completes.</span>
      </div>

      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-xs text-zinc-400">
        <p className="mb-1 font-semibold text-zinc-300">💡 Cómo cambiar de cuenta</p>
        1. En tu cuenta real de Mercado Pago → Desarrolladores → tu aplicación → Credenciales.
        <br />
        2. Copiá el <b>Access Token de producción</b> y pegalo arriba en “Access Token”.
        <br />
        3. Guardá. El checkout empieza a usar la cuenta nueva al toque (podés probar con una compra
        chica).
      </div>
    </div>
  )
}

function Field({
  label,
  hint,
  placeholder,
  status,
  value,
  onChange,
}: {
  label: string
  hint: string
  placeholder: string
  status: Status
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-white">{label}</span>
        {status.set ? (
          <>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-400">
              <ShieldCheck className="h-3 w-3" /> {status.masked}
            </span>
            {status.mode === 'prod' && (
              <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] text-red-400">
                Producción
              </span>
            )}
            {status.mode === 'test' && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] text-amber-400">
                Test
              </span>
            )}
            <span className="text-[11px] text-zinc-500">
              ({status.source === 'panel' ? 'cargada desde el panel' : 'desde variable de entorno'})
            </span>
          </>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-700/40 px-2 py-0.5 text-[11px] text-zinc-400">
            <ShieldAlert className="h-3 w-3" /> Sin configurar
          </span>
        )}
      </div>
      <p className="mb-2 text-xs text-zinc-500">{hint}</p>
      <input
        type="password"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-blue-500"
      />
    </div>
  )
}
