// app/checkout/exito/page.tsx — Back URL de éxito. Reconcilia el pago (fallback del webhook).
import Link from 'next/link'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { confirmPaymentById } from '@/lib/mercadopago/orders'
import { formatARS } from '@/lib/utils/currency'
import ClearCartOnMount from '@/components/cart/ClearCartOnMount'
import PurchaseTracker from '@/components/checkout/PurchaseTracker'

export const metadata: Metadata = {
  title: 'Compra confirmada | Azul Colchones',
  robots: { index: false, follow: false },
}

type SP = Promise<{
  payment_id?: string
  collection_id?: string
  status?: string
  external_reference?: string
}>

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const paymentId = sp.payment_id || sp.collection_id

  // Reconciliación idempotente (por si el webhook aún no llegó)
  if (paymentId) {
    await confirmPaymentById(paymentId).catch(() => {})
  }

  const order = sp.external_reference
    ? await prisma.order.findUnique({
        where: { id: sp.external_reference },
        include: { items: { include: { product: true } } },
      })
    : null

  const paid = order?.paymentStatus === 'paid'

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-16">
      {paid && <ClearCartOnMount />}
      {paid && order && (
        <PurchaseTracker
          value={order.total}
          orderId={order.id}
          contents={order.items.map((it) => ({
            id: it.product?.slug ?? it.productId,
            quantity: it.quantity,
            item_price: it.price,
          }))}
        />
      )}
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-3xl">
          {paid ? '✅' : '🕓'}
        </div>
        <h1 className="text-2xl font-black">
          {paid ? '¡Gracias por tu compra!' : 'Estamos confirmando tu pago'}
        </h1>
        <p className="mt-2 text-zinc-400">
          {paid
            ? 'Tu pago fue aprobado. Te enviamos un email con el detalle.'
            : 'Apenas se acredite, te llega el email de confirmación.'}
        </p>

        {order && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 text-left">
            <p className="text-sm text-zinc-400">
              Pedido <span className="font-mono text-white">#{order.orderNumber}</span>
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {order.items.map((it) => (
                <li key={it.id} className="flex justify-between gap-3">
                  <span className="text-zinc-300">
                    {it.product?.name}
                    {it.size ? ` · ${it.size}` : ''} × {it.quantity}
                  </span>
                  <span className="text-white">{formatARS(it.price * it.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-zinc-800 pt-3 font-bold">
              <span>Total</span>
              <span>{formatARS(order.total)}</span>
            </div>
          </div>
        )}

        <p className="mt-6 text-sm text-zinc-400">
          Coordinamos la entrega por WhatsApp. Entrega inmediata con stock en Villa María y Villa
          Nueva; sin stock, 24-72 hs.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/catalogo"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Seguir comprando
          </Link>
          <a
            href="https://wa.me/5493534096566"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-white hover:bg-zinc-800"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
