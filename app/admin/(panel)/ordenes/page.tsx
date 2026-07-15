// app/admin/(panel)/ordenes/page.tsx — Lista de órdenes (ventas).
import { prisma } from '@/lib/prisma'
import { formatARS } from '@/lib/utils/currency'

export const dynamic = 'force-dynamic'

// order.total / subtotal / orderItem.price se guardan en PESOS en el checkout
// (unitPrice = centavosToARS(v.price)). Por eso formatARS directo.

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    paid: 'bg-emerald-500/15 text-emerald-400',
    pending: 'bg-amber-500/15 text-amber-400',
    failed: 'bg-red-500/15 text-red-400',
  }
  return map[status] ?? 'bg-zinc-700/40 text-zinc-300'
}

async function getOrders() {
  try {
    return await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { items: { include: { product: { select: { name: true } } } } },
    })
  } catch {
    return null
  }
}

export default async function OrdenesPage() {
  const orders = await getOrders()

  if (!orders) {
    return <p className="text-zinc-400">No se pudieron cargar las órdenes (revisá la conexión a la DB).</p>
  }

  const paidCount = orders.filter((o) => o.paymentStatus === 'paid').length

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-black">Órdenes</h1>
        <p className="text-sm text-zinc-400">
          {orders.length} en total ·{' '}
          <span className="font-semibold text-emerald-400">{paidCount} pagadas</span>
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-zinc-900 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Pago</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                  Todavía no hay órdenes.
                </td>
              </tr>
            )}
            {orders.map((o) => {
              const totalItems = o.items.reduce((n, it) => n + it.quantity, 0)
              const names = o.items
                .map((it) => it.product?.name)
                .filter(Boolean)
                .join(', ')
              return (
                <tr key={o.id} className="border-t border-zinc-800 align-top">
                  <td className="px-4 py-3 font-mono text-xs">{o.orderNumber}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-400">{fmtDate(o.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{o.customerName}</div>
                    <div className="text-xs text-zinc-500">{o.customerEmail}</div>
                  </td>
                  <td className="max-w-[240px] px-4 py-3">
                    <div className="text-zinc-300">{totalItems} un.</div>
                    <div className="truncate text-xs text-zinc-500" title={names}>
                      {names || '—'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${statusBadge(o.paymentStatus)}`}>
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                    {formatARS(o.total)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
