// app/admin/(panel)/productos/page.tsx — Lista de productos (admin).
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { centavosToARS, formatARS } from '@/lib/utils/currency'
import { Pencil } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ categoryRel: { order: 'asc' } }, { name: 'asc' }],
    include: {
      categoryRel: true,
      _count: { select: { variants: true } },
      variants: { select: { price: true } },
    },
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Productos</h1>
          <p className="text-sm text-zinc-400">{products.length} productos en el catálogo</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3 text-right">Desde</th>
              <th className="px-4 py-3 text-center">Medidas</th>
              <th className="px-4 py-3 text-center">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const min = p.variants.length ? Math.min(...p.variants.map((v) => v.price)) : p.price
              return (
                <tr key={p.id} className="border-t border-zinc-800 hover:bg-zinc-900/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                        {p.image && (
                          <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">{p.name}</p>
                        <p className="truncate text-xs text-zinc-500">{p.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{p.categoryRel?.name ?? p.category}</td>
                  <td className="px-4 py-3 text-right">{formatARS(centavosToARS(min))}</td>
                  <td className="px-4 py-3 text-center text-zinc-400">{p._count.variants}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      <Badge on={p.isActive} label={p.isActive ? 'Activo' : 'Inactivo'} color={p.isActive ? 'emerald' : 'zinc'} />
                      {p.isBestSeller && <Badge on label="★ Vendido" color="amber" />}
                      {p.isFeatured && <Badge on label="Destacado" color="blue" />}
                      {p.bajoPedido && <Badge on label="Bajo pedido" color="violet" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/productos/${p.id}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </Link>
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

function Badge({ on, label, color }: { on: boolean; label: string; color: string }) {
  if (!on) return <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400">{label}</span>
  const map: Record<string, string> = {
    emerald: 'bg-emerald-500/15 text-emerald-400',
    amber: 'bg-amber-500/15 text-amber-400',
    blue: 'bg-blue-500/15 text-blue-400',
    violet: 'bg-violet-500/15 text-violet-400',
    zinc: 'bg-zinc-800 text-zinc-400',
  }
  return <span className={`rounded-full px-2 py-0.5 text-[11px] ${map[color] ?? map.zinc}`}>{label}</span>
}
