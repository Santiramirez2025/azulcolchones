// app/admin/(panel)/page.tsx — Dashboard con métricas reales.
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatARS } from '@/lib/utils/currency'
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const [products, activeProducts, orders, paidOrders, leads, revenue, recentOrders] =
      await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { isActive: true } }),
        prisma.order.count(),
        prisma.order.count({ where: { paymentStatus: 'paid' } }),
        prisma.lead.count(),
        prisma.order.aggregate({ where: { paymentStatus: 'paid' }, _sum: { total: true } }),
        prisma.order.findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: { id: true, orderNumber: true, customerName: true, total: true, paymentStatus: true, createdAt: true },
        }),
      ])
    return {
      products,
      activeProducts,
      orders,
      paidOrders,
      leads,
      revenue: revenue._sum.total ?? 0,
      recentOrders,
    }
  } catch {
    return null
  }
}

export default async function AdminDashboard() {
  const s = await getStats()
  if (!s) {
    return <p className="text-zinc-400">No se pudieron cargar las métricas (revisá la conexión a la DB).</p>
  }

  const cards = [
    { label: 'Ventas pagadas', value: formatARS(s.revenue), sub: `${s.paidOrders} órdenes`, icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Órdenes', value: s.orders, sub: `${s.paidOrders} pagadas`, icon: ShoppingBag, color: 'text-blue-400', href: '/admin/ordenes' },
    { label: 'Productos', value: s.products, sub: `${s.activeProducts} activos`, icon: Package, color: 'text-violet-400', href: '/admin/productos' },
    { label: 'Leads', value: s.leads, sub: 'consultas del asesor', icon: Users, color: 'text-amber-400', href: '/admin/leads' },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Dashboard</h1>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon
          const inner = (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 transition-colors hover:border-zinc-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">{c.label}</span>
                <Icon className={`h-5 w-5 ${c.color}`} />
              </div>
              <p className="mt-2 text-xl font-black sm:text-2xl">{c.value}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{c.sub}</p>
            </div>
          )
          return c.href ? (
            <Link key={c.label} href={c.href}>
              {inner}
            </Link>
          ) : (
            <div key={c.label}>{inner}</div>
          )
        })}
      </div>

      <h2 className="mb-3 mt-8 text-lg font-bold">Últimas órdenes</h2>
      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {s.recentOrders.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-zinc-500">
                  Todavía no hay órdenes.
                </td>
              </tr>
            )}
            {s.recentOrders.map((o) => (
              <tr key={o.id} className="border-t border-zinc-800">
                <td className="px-4 py-3 font-mono text-xs">{o.orderNumber}</td>
                <td className="px-4 py-3">{o.customerName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      o.paymentStatus === 'paid'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : o.paymentStatus === 'pending'
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-red-500/15 text-red-400'
                    }`}
                  >
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">{formatARS(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
