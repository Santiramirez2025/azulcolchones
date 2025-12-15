// app/site-access/SiteAccessClient.tsx - CLIENT COMPONENT OPTIMIZED ⚡
'use client'

import { useState, FormEvent, memo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react'

// ============================================================================
// MEMOIZED HEADER SECTION
// ============================================================================
const HeaderSection = memo(() => (
  <header className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-zinc-800/50 p-8 text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20">
      <Shield className="w-8 h-8 text-white" aria-hidden="true" />
    </div>
    <h1 className="text-2xl font-bold text-white mb-2">
      Acceso al Sitio
    </h1>
    <p className="text-zinc-400 text-sm">
      Este sitio está temporalmente protegido. Por favor, ingresá tus credenciales.
    </p>
  </header>
))
HeaderSection.displayName = 'HeaderSection'

// ============================================================================
// MEMOIZED FOOTER SECTION
// ============================================================================
const FooterSection = memo(() => (
  <footer className="bg-zinc-900/30 border-t border-zinc-800/50 p-6">
    <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
      <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
      <span>Conexión segura y cifrada</span>
    </div>
  </footer>
))
FooterSection.displayName = 'FooterSection'

// ============================================================================
// MEMOIZED ERROR MESSAGE
// ============================================================================
const ErrorMessage = memo(({ message }: { message: string }) => (
  <div 
    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
    role="alert"
    aria-live="polite"
  >
    <p className="text-red-400 text-sm flex items-center gap-2">
      <Lock className="w-4 h-4" aria-hidden="true" />
      {message}
    </p>
  </div>
))
ErrorMessage.displayName = 'ErrorMessage'

// ============================================================================
// MEMOIZED PASSWORD TOGGLE BUTTON
// ============================================================================
const PasswordToggle = memo(({ 
  showPassword, 
  onToggle 
}: { 
  showPassword: boolean; 
  onToggle: () => void 
}) => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
  >
    {showPassword ? (
      <EyeOff className="w-5 h-5" aria-hidden="true" />
    ) : (
      <Eye className="w-5 h-5" aria-hidden="true" />
    )}
  </button>
))
PasswordToggle.displayName = 'PasswordToggle'

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================
export function SiteAccessClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Memoized handlers
  const handlePasswordToggle = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/site-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Redirigir a la página original o al home
        const returnUrl = searchParams.get('returnUrl') || '/'
        router.push(returnUrl)
        router.refresh()
      } else {
        setError(data.message || 'Credenciales incorrectas')
      }
    } catch (err) {
      setError('Error al conectar con el servidor')
    } finally {
      setIsLoading(false)
    }
  }, [username, password, searchParams, router])

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">
        {/* Card */}
        <article className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl overflow-hidden">
          <HeaderSection />

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Username */}
              <div className="space-y-2">
                <label 
                  htmlFor="username" 
                  className="block text-sm font-medium text-zinc-300"
                >
                  Usuario
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    aria-required="true"
                    aria-invalid={error ? 'true' : 'false'}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-zinc-300"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    aria-required="true"
                    aria-invalid={error ? 'true' : 'false'}
                    className="w-full px-4 py-3 pr-12 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    placeholder="Ingresa tu contraseña"
                  />
                  <PasswordToggle 
                    showPassword={showPassword} 
                    onToggle={handlePasswordToggle} 
                  />
                </div>
              </div>

              {/* Error message */}
              {error && <ErrorMessage message={error} />}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <div 
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" 
                      role="status"
                      aria-label="Verificando"
                    />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" aria-hidden="true" />
                    <span>Acceder</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <FooterSection />
        </article>

        {/* Support info */}
        <div className="mt-6 text-center">
          <p className="text-zinc-500 text-sm">
            ¿Problemas para acceder?{' '}
            <a 
              href="mailto:soporte@azulcolchones.com.ar" 
              className="text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Contactá con soporte
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}