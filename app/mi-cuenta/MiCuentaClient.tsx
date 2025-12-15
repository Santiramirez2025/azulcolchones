// app/mi-cuenta/MiCuentaClient.tsx - CLIENT COMPONENT OPTIMIZED ⚡
'use client'

import { useAuth } from '@/lib/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState, memo, useCallback } from 'react'
import Link from 'next/link'

// ============================================================================
// OPTIMIZED ICONS - Memoized to prevent re-renders
// ============================================================================
const Icons = {
  User: memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )),
  
  Package: memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )),
  
  Logout: memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )),
  
  Settings: memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )),
  
  MapPin: memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )),
  
  Truck: memo(({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  )),
  
  Heart: memo(({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )),
  
  Alert: memo(({ className = "w-10 h-10" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )),
}

// Add display names
Icons.User.displayName = 'UserIcon'
Icons.Package.displayName = 'PackageIcon'
Icons.Logout.displayName = 'LogoutIcon'
Icons.Settings.displayName = 'SettingsIcon'
Icons.MapPin.displayName = 'MapPinIcon'
Icons.Truck.displayName = 'TruckIcon'
Icons.Heart.displayName = 'HeartIcon'
Icons.Alert.displayName = 'AlertIcon'

// ============================================================================
// LOADING SPINNER - Optimized Component
// ============================================================================
const LoadingSpinner = memo(({ size = "w-12 h-12" }: { size?: string }) => (
  <div className={`border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin ${size}`} />
))
LoadingSpinner.displayName = 'LoadingSpinner'

// ============================================================================
// STATUS CONFIGURATION
// ============================================================================
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  PENDING: { label: 'Pendiente', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  PROCESSING: { label: 'Procesando', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  SHIPPED: { label: 'Enviado', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  DELIVERED: { label: 'Entregado', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  CANCELLED: { label: 'Cancelado', color: 'text-red-400', bg: 'bg-red-500/20' },
  REFUNDED: { label: 'Reembolsado', color: 'text-zinc-400', bg: 'bg-zinc-500/20' },
}

// ============================================================================
// TYPES
// ============================================================================
interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: string
}

// ============================================================================
// SIDEBAR NAVIGATION - Memoized Component
// ============================================================================
const SidebarNav = memo(({ onLogout }: { onLogout: () => void }) => (
  <aside className="lg:col-span-1">
    <nav 
      className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 space-y-2 sticky top-24 backdrop-blur-sm"
      aria-label="Navegación de cuenta"
    >
      <Link 
        href="/mi-cuenta/perfil"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-zinc-300 hover:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        <Icons.User className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-semibold">Mi Perfil</span>
      </Link>
      
      <Link 
        href="/mi-cuenta/pedidos"
        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        aria-current="page"
      >
        <Icons.Package className="w-5 h-5" />
        <span>Mis Pedidos</span>
      </Link>

      <Link 
        href="/mi-cuenta/direcciones"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-zinc-300 hover:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        <Icons.MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-semibold">Direcciones</span>
      </Link>

      <Link 
        href="/mi-cuenta/favoritos"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-zinc-300 hover:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        <Icons.Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-semibold">Favoritos</span>
      </Link>

      <Link 
        href="/mi-cuenta/configuracion"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-zinc-300 hover:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        <Icons.Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-semibold">Configuración</span>
      </Link>

      <div className="border-t border-white/10 pt-3 mt-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-all text-red-400 hover:text-red-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <Icons.Logout className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-semibold">Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  </aside>
))
SidebarNav.displayName = 'SidebarNav'

// ============================================================================
// STATS CARDS - Memoized Component
// ============================================================================
const StatsCards = memo(({ user, orders }: { user: any; orders: Order[] }) => (
  <div className="grid md:grid-cols-3 gap-4 mb-8">
    <article className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-2xl p-6 hover:scale-[1.02] transition-transform will-change-transform">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
          <Icons.Package className="w-5 h-5 text-violet-400" />
        </div>
        <div className="text-3xl font-black text-white">
          {user.totalOrders || 0}
        </div>
      </div>
      <div className="text-sm text-zinc-300 font-medium">Pedidos realizados</div>
    </article>

    <article className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-2xl p-6 hover:scale-[1.02] transition-transform will-change-transform">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <Icons.Truck className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="text-3xl font-black text-white">
          {orders.filter(o => o.status === 'DELIVERED').length}
        </div>
      </div>
      <div className="text-sm text-zinc-300 font-medium">Pedidos entregados</div>
    </article>

    <article className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-6 hover:scale-[1.02] transition-transform will-change-transform">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <span className="text-cyan-400 font-black text-lg" aria-label="Pesos argentinos">$</span>
        </div>
        <div className="text-3xl font-black text-white">
          ${(user.totalSpent || 0).toLocaleString('es-AR')}
        </div>
      </div>
      <div className="text-sm text-zinc-300 font-medium">Total invertido</div>
    </article>
  </div>
))
StatsCards.displayName = 'StatsCards'

// ============================================================================
// ORDER CARD - Memoized Component
// ============================================================================
const OrderCard = memo(({ order }: { order: Order }) => {
  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING
  
  return (
    <Link
      href={`/mi-cuenta/pedidos/${order.orderNumber}`}
      className="block p-5 bg-zinc-800/50 hover:bg-zinc-800 border border-white/10 rounded-xl transition-all hover:scale-[1.01] hover:border-violet-500/30 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 will-change-transform"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-bold text-white text-lg mb-1 group-hover:text-violet-300 transition">
            Pedido #{order.orderNumber}
          </div>
          <time 
            className="text-sm text-zinc-400"
            dateTime={order.createdAt}
          >
            {new Date(order.createdAt).toLocaleDateString('es-AR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.color} flex items-center gap-1.5 border border-current/20`}>
          {order.status === 'SHIPPED' && <Icons.Truck className="w-3.5 h-3.5" />}
          {statusConfig.label}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-2xl font-black text-white">
          ${order.total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <span className="text-violet-400 text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Ver detalles <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
})
OrderCard.displayName = 'OrderCard'

// ============================================================================
// MAIN MI CUENTA CLIENT COMPONENT
// ============================================================================
export function MiCuentaClient() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [errorOrders, setErrorOrders] = useState('')

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/mi-cuenta')
    }
  }, [user, loading, router])

  // Load orders when user is available
  useEffect(() => {
    if (user?.id) {
      setLoadingOrders(true)
      setErrorOrders('')
      
      fetch(`/api/orders?userId=${user.id}`)
        .then(async res => {
          if (!res.ok) {
            throw new Error('Error al cargar pedidos')
          }
          return res.json()
        })
        .then(data => {
          setOrders(data.orders || [])
          setLoadingOrders(false)
        })
        .catch(err => {
          console.error('Error loading orders:', err)
          setErrorOrders(err.message || 'Error al cargar los pedidos')
          setLoadingOrders(false)
        })
    }
  }, [user?.id])

  // Memoized logout handler
  const handleLogout = useCallback(async () => {
    try {
      await logout()
      router.push('/')
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }, [logout, router])

  // Memoized retry handler
  const handleRetry = useCallback(() => {
    if (!user?.id) return
    
    setLoadingOrders(true)
    setErrorOrders('')
    
    fetch(`/api/orders?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || [])
        setLoadingOrders(false)
      })
      .catch(err => {
        setErrorOrders(err.message)
        setLoadingOrders(false)
      })
  }, [user?.id])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-center" role="status" aria-live="polite">
          <LoadingSpinner size="w-16 h-16" />
          <p className="text-zinc-400 text-lg mt-4">Cargando tu cuenta...</p>
          <span className="sr-only">Cargando información de la cuenta</span>
        </div>
      </div>
    )
  }

  // Not authenticated - prevents flash
  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Mi Cuenta
          </h1>
          <p className="text-zinc-400 text-lg">
            ¡Hola <span className="text-white font-bold">{user.name || user.email}</span>! 
            <span aria-label="Saludo" role="img"> 👋</span>
          </p>
        </header>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <SidebarNav onLogout={handleLogout} />

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Stats Cards */}
            <StatsCards user={user} orders={orders} />

            {/* Orders Section */}
            <section 
              className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              aria-labelledby="orders-heading"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 id="orders-heading" className="text-2xl font-bold text-white">
                  Pedidos Recientes
                </h2>
                {orders.length > 0 && (
                  <Link 
                    href="/mi-cuenta/pedidos"
                    className="text-sm text-violet-400 hover:text-violet-300 font-semibold transition flex items-center gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded px-2"
                  >
                    Ver todos 
                    <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </Link>
                )}
              </div>

              {loadingOrders ? (
                <div className="text-center py-12" role="status" aria-live="polite">
                  <LoadingSpinner />
                  <p className="text-zinc-400 mt-4">Cargando pedidos...</p>
                  <span className="sr-only">Cargando lista de pedidos</span>
                </div>
              ) : errorOrders ? (
                <div className="text-center py-12" role="alert">
                  <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icons.Alert className="text-red-400" />
                  </div>
                  <p className="text-red-400 mb-4 font-semibold">{errorOrders}</p>
                  <button
                    onClick={handleRetry}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-violet-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    Reintentar
                  </button>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-violet-500/20">
                    <Icons.Package className="w-12 h-12 text-violet-400" />
                  </div>
                  <p className="text-zinc-400 mb-2 text-lg font-semibold">
                    Todavía no realizaste ningún pedido
                  </p>
                  <p className="text-zinc-500 mb-6 text-sm">
                    Empezá a explorar nuestro catálogo de colchones premium
                  </p>
                  <Link 
                    href="/productos"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-violet-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 will-change-transform"
                  >
                    <Icons.Package className="w-5 h-5" />
                    Explorar Catálogo
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}