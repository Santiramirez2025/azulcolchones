'use client'
// app/admin/login/page.tsx — Login del panel de administración.
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/admin'
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.replace(next.startsWith('/admin') ? next : '/admin')
        router.refresh()
      } else {
        const d = await res.json().catch(() => ({}))
        setError(d.error || 'No se pudo iniciar sesión')
        setLoading(false)
      }
    } catch {
      setError('Error de conexión')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="text-center text-xl font-black text-white">Panel Azul Colchones</h1>
        <p className="mt-1 text-center text-sm text-zinc-400">Ingresá la contraseña de administrador</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoFocus
          className="mt-6 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </main>
  )
}
