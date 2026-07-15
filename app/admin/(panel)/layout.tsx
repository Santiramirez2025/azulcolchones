'use client'
// app/admin/(panel)/layout.tsx — Layout del panel (sidebar + logout). Sin el header/footer del sitio.
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/ordenes', label: 'Órdenes', icon: ShoppingBag },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/contenido', label: 'Contenido', icon: FileText },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  const Nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV.map((it) => {
        const Icon = it.icon
        const active = isActive(it.href, it.exact)
        return (
          <Link
            key={it.href}
            href={it.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <Icon className="h-5 w-5" />
            {it.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Topbar mobile */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 lg:hidden">
        <span className="font-black">Azul · Admin</span>
        <button onClick={() => setOpen(!open)} aria-label="Menú" className="rounded-lg bg-zinc-800 p-2">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            open ? 'block' : 'hidden'
          } fixed inset-x-0 top-[57px] z-40 border-b border-zinc-800 bg-zinc-950 p-4 lg:static lg:top-0 lg:block lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r`}
        >
          <div className="flex h-full flex-col">
            <div className="mb-6 hidden px-2 lg:block">
              <p className="text-lg font-black">Azul Colchones</p>
              <p className="text-xs text-zinc-500">Panel de administración</p>
            </div>
            {Nav}
            <div className="mt-4 space-y-1 border-t border-zinc-800 pt-4">
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <ExternalLink className="h-5 w-5" /> Ver el sitio
              </a>
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-red-950/40 hover:text-red-300"
              >
                <LogOut className="h-5 w-5" /> Cerrar sesión
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
