'use client'
// Armá tu combo: colchón + sommier oficial + almohada/protector.
// Marketing honesto: el total es la suma real de precios de fábrica. SIN descuentos inventados.
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { MessageCircle, ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota } from '@/lib/utils/pricing'
import type { ComboBuilderData, ComboProduct, ComboVariant } from '@/lib/catalog/combo'

const WHATSAPP = '5493534096566'

function variantByMeasure(p: ComboProduct | null, measure: string): ComboVariant | null {
  if (!p) return null
  return p.variants.find((v) => v.measure === measure) ?? null
}

export default function ComboBuilder({ data }: { data: ComboBuilderData }) {
  const addItem = useCartStore((s) => s.addItem)
  const { mattresses, pillows, protectors } = data

  // Por defecto, el primer colchón que tenga sommier de combo (mejor primera impresión).
  const defaultMattress =
    mattresses.find((m) => m.sommier && m.sommier.variants.length > 0) ?? mattresses[0]
  const [mattressId, setMattressId] = useState(defaultMattress?.id ?? '')
  const mattress = useMemo(
    () => mattresses.find((m) => m.id === mattressId) ?? mattresses[0],
    [mattresses, mattressId],
  )

  const [measure, setMeasure] = useState(mattress?.variants[0]?.measure ?? '')
  // Si cambia el colchón y la medida no existe, caigo a la primera disponible.
  const mVariant = useMemo(() => {
    const v = variantByMeasure(mattress, measure)
    return v ?? mattress?.variants[0] ?? null
  }, [mattress, measure])
  const activeMeasure = mVariant?.measure ?? ''

  const [includeSommier, setIncludeSommier] = useState(true)
  const [includeProtector, setIncludeProtector] = useState(false)
  const [pillowId, setPillowId] = useState<string>('')
  const [added, setAdded] = useState(false)

  const sommierVariant = includeSommier
    ? variantByMeasure(mattress?.sommier ?? null, activeMeasure)
    : null

  // Protector: tomamos el "Procol 4 Elásticos" (o el primero) en la medida.
  const protectorProduct = protectors[0] ?? null
  const protectorVariant = includeProtector
    ? variantByMeasure(protectorProduct, activeMeasure)
    : null

  const pillow = pillows.find((p) => p.id === pillowId) ?? null
  const pillowVariant = pillow?.variants[0] ?? null

  const total =
    (mVariant?.price ?? 0) +
    (sommierVariant?.price ?? 0) +
    (protectorVariant?.price ?? 0) +
    (pillowVariant?.price ?? 0)

  const listOf = (v: ComboVariant | null) => (v ? (v.priceList ?? v.price) : 0)
  const totalList =
    listOf(mVariant) + listOf(sommierVariant) + listOf(protectorVariant) + listOf(pillowVariant)
  const saving = Math.max(0, totalList - total)
  const savingPct = totalList > 0 ? Math.round((saving / totalList) * 100) : 0

  const cuota = getMejorCuota(total)

  function addOne(p: ComboProduct, v: ComboVariant) {
    addItem({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      price: v.price,
      image: p.image ?? '',
      size: v.plaza ?? v.measure,
      variant: v.measure,
      sku: v.sku,
      quantity: 1,
    })
  }

  function handleAddCombo() {
    if (mattress && mVariant) addOne(mattress, mVariant)
    if (mattress?.sommier && sommierVariant) addOne(mattress.sommier, sommierVariant)
    if (protectorProduct && protectorVariant) addOne(protectorProduct, protectorVariant)
    if (pillow && pillowVariant) addOne(pillow, pillowVariant)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const waText = encodeURIComponent(
    `¡Hola! Quiero consultar por un combo:\n` +
      `🛏️ ${mattress?.name} ${activeMeasure}\n` +
      (sommierVariant ? `📦 ${mattress?.sommier?.name} ${activeMeasure}\n` : '') +
      (protectorVariant ? `🛡️ ${protectorProduct?.name} ${activeMeasure}\n` : '') +
      (pillowVariant ? `💤 ${pillow?.name}\n` : '') +
      `💰 Total: ${formatARS(total)}`,
  )

  if (!mattress || !mVariant) {
    return <p className="text-zinc-400">No hay productos disponibles para armar el combo.</p>
  }

  const lineItems = [
    { label: mattress.name, sub: activeMeasure, price: mVariant.price, on: true },
    sommierVariant
      ? { label: mattress.sommier!.name, sub: `${activeMeasure} · sommier oficial`, price: sommierVariant.price, on: true }
      : null,
    protectorVariant
      ? { label: protectorProduct!.name, sub: activeMeasure, price: protectorVariant.price, on: true }
      : null,
    pillowVariant ? { label: pillow!.name, sub: pillow!.variants[0].measure, price: pillowVariant.price, on: true } : null,
  ].filter(Boolean) as { label: string; sub: string; price: number; on: boolean }[]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Selección */}
      <div className="space-y-6">
        {/* Colchón */}
        <section>
          <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-zinc-400">
            1 · Elegí el colchón
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {mattresses.map((m) => {
              const sel = m.id === mattressId
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setMattressId(m.id)
                    const stillThere = m.variants.find((v) => v.measure === activeMeasure)
                    if (!stillThere) setMeasure(m.variants[0]?.measure ?? '')
                  }}
                  className={`flex items-center gap-2 rounded-xl border p-2 text-left text-sm transition-colors ${
                    sel ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-blue-500/40'
                  }`}
                >
                  <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-zinc-800">
                    {m.image && <Image src={m.image} alt={m.name} fill sizes="40px" className="object-cover" />}
                  </span>
                  <span className="leading-tight">{m.name}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Medida */}
        <section>
          <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-zinc-400">2 · Medida</h2>
          <div className="flex flex-wrap gap-2">
            {mattress.variants.map((v) => {
              const sel = v.measure === activeMeasure
              return (
                <button
                  key={v.id}
                  onClick={() => setMeasure(v.measure)}
                  className={`rounded-xl border px-3 py-2 text-sm transition-colors ${
                    sel ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-blue-500/40'
                  }`}
                >
                  <span className="font-semibold">{v.measure}</span>
                  {v.plaza && <span className="ml-1 text-xs text-zinc-500">· {v.plaza}</span>}
                </button>
              )
            })}
          </div>
        </section>

        {/* Sommier oficial */}
        <section>
          <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-zinc-400">
            3 · Sommier oficial
          </h2>
          {mattress.sommier ? (
            sommierVariant || mattress.sommier.variants.length > 0 ? (
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeSommier}
                    onChange={(e) => setIncludeSommier(e.target.checked)}
                    className="h-5 w-5 accent-blue-600"
                  />
                  <span className="text-white">{mattress.sommier.name}</span>
                </span>
                <span className="text-zinc-300">
                  {sommierVariant ? formatARS(sommierVariant.price) : 'Consultar medida'}
                </span>
              </label>
            ) : (
              <p className="text-sm text-zinc-500">Consultá disponibilidad del sommier por WhatsApp.</p>
            )
          ) : (
            <p className="text-sm text-zinc-500">Este modelo no tiene sommier de combo asignado.</p>
          )}
        </section>

        {/* Extras */}
        <section>
          <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-zinc-400">
            4 · Sumá extras (opcional)
          </h2>
          <div className="space-y-2">
            {protectorProduct && (
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeProtector}
                    onChange={(e) => setIncludeProtector(e.target.checked)}
                    className="h-5 w-5 accent-blue-600"
                  />
                  <span className="text-white">{protectorProduct.name}</span>
                </span>
                <span className="text-zinc-300">
                  {protectorVariant
                    ? formatARS(protectorVariant.price)
                    : variantByMeasure(protectorProduct, activeMeasure)
                      ? ''
                      : 'Consultar medida'}
                </span>
              </label>
            )}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
              <label htmlFor="pillow" className="mb-2 block text-sm text-white">
                Almohada
              </label>
              <select
                id="pillow"
                value={pillowId}
                onChange={(e) => setPillowId(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
              >
                <option value="">Sin almohada</option>
                {pillows.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatARS(p.variants[0]?.price ?? 0)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </div>

      {/* Resumen */}
      <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
        <h2 className="mb-3 text-lg font-black text-white">Tu combo</h2>
        <ul className="space-y-2 text-sm">
          {lineItems.map((li, i) => (
            <li key={i} className="flex justify-between gap-3">
              <span className="text-zinc-300">
                {li.label}
                <span className="block text-xs text-zinc-500">{li.sub}</span>
              </span>
              <span className="text-white">{formatARS(li.price)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 border-t border-zinc-800 pt-3">
          {saving > 0 && (
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-zinc-500">Precio sugerido</span>
              <span className="text-zinc-500 line-through">{formatARS(totalList)}</span>
            </div>
          )}
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-white">Total combo</span>
            <span className="text-2xl font-black text-white">{formatARS(total)}</span>
          </div>
          {saving > 0 && (
            <p className="mt-1 text-right text-sm font-semibold text-emerald-400">
              Ahorrás {formatARS(saving)} ({savingPct}%)
            </p>
          )}
        </div>
        <p className="mt-1 text-xs text-zinc-400">
          3 cuotas de {formatARS(cuota.precioCuota)} · directo de fábrica
        </p>

        <button
          onClick={handleAddCombo}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-bold text-white transition-colors hover:bg-blue-500"
        >
          {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
          {added ? 'Agregado al carrito' : 'Agregar combo al carrito'}
        </button>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 py-3 font-semibold text-white transition-colors hover:bg-zinc-800"
        >
          <MessageCircle className="h-5 w-5" /> Consultar por WhatsApp
        </a>
        <p className="mt-3 text-center text-xs text-zinc-500">
          Entrega inmediata con stock en Villa María y Villa Nueva · sin stock, 24-72 hs
        </p>
      </aside>
    </div>
  )
}
