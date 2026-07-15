'use client'
// Form de edición de producto (admin): datos, flags, imágenes y precios por medida.
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Upload, Trash2, Star, Loader2, Check } from 'lucide-react'

interface VariantDTO {
  id: string
  measure: string
  plaza: string
  priceARS: number
  priceListARS: number | null
  stock: number
  available: boolean
}
export interface ProductDTO {
  id: string
  name: string
  subtitle: string
  description: string
  line: string
  springType: string
  warranty: number
  isActive: boolean
  isFeatured: boolean
  isBestSeller: boolean
  bajoPedido: boolean
  category: string
  images: string[]
  variants: VariantDTO[]
}

const LINEAS = ['', 'entrada', 'media', 'premium', 'ultra']
const TIPOS = ['', 'espuma', 'resorte-continuo', 'pocket']

export default function ProductEditForm({ product }: { product: ProductDTO }) {
  const router = useRouter()
  const [p, setP] = useState(product)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const set = (patch: Partial<ProductDTO>) => setP((prev) => ({ ...prev, ...patch }))
  const setVariant = (id: string, patch: Partial<VariantDTO>) =>
    setP((prev) => ({
      ...prev,
      variants: prev.variants.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    }))

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    setError('')
    try {
      for (const file of files) {
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        const d = await res.json()
        if (!res.ok) {
          setError(d.error || 'No se pudo subir la imagen')
          break
        }
        setP((prev) => ({ ...prev, images: [...prev.images, d.url] }))
      }
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const removeImage = (url: string) => set({ images: p.images.filter((i) => i !== url) })
  const makeMain = (url: string) => set({ images: [url, ...p.images.filter((i) => i !== url)] })

  async function save() {
    setSaving(true)
    setSaved(false)
    setError('')
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: p.name,
          subtitle: p.subtitle,
          description: p.description,
          line: p.line || null,
          springType: p.springType || null,
          warranty: Number(p.warranty) || 0,
          isActive: p.isActive,
          isFeatured: p.isFeatured,
          isBestSeller: p.isBestSeller,
          bajoPedido: p.bajoPedido,
          images: p.images,
          variants: p.variants.map((v) => ({
            id: v.id,
            priceARS: Number(v.priceARS) || 0,
            priceListARS: v.priceListARS ? Number(v.priceListARS) : null,
            stock: Number(v.stock) || 0,
            available: v.available,
          })),
        }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(d.error || 'No se pudo guardar')
      } else {
        setSaved(true)
        router.refresh()
        setTimeout(() => setSaved(false), 2500)
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  const input = 'w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-blue-500'
  const label = 'mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-400'

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">{p.name}</h1>
          <p className="text-sm text-zinc-500">{p.category}</p>
        </div>
      </div>

      {/* Datos */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
        <h2 className="mb-4 text-sm font-black uppercase tracking-wide text-zinc-400">Datos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Nombre</label>
            <input className={input} value={p.name} onChange={(e) => set({ name: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Subtítulo</label>
            <input className={input} value={p.subtitle} onChange={(e) => set({ subtitle: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Descripción</label>
            <textarea rows={3} className={input} value={p.description} onChange={(e) => set({ description: e.target.value })} />
          </div>
          <div>
            <label className={label}>Línea</label>
            <select className={input} value={p.line} onChange={(e) => set({ line: e.target.value })}>
              {LINEAS.map((l) => (
                <option key={l} value={l}>{l || '—'}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Tipo</label>
            <select className={input} value={p.springType} onChange={(e) => set({ springType: e.target.value })}>
              {TIPOS.map((t) => (
                <option key={t} value={t}>{t || '—'}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Garantía (años)</label>
            <input type="number" className={input} value={p.warranty} onChange={(e) => set({ warranty: Number(e.target.value) })} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          {([
            ['isActive', 'Activo'],
            ['isFeatured', 'Destacado'],
            ['isBestSeller', 'Más vendido'],
            ['bajoPedido', 'Bajo pedido'],
          ] as const).map(([key, lbl]) => (
            <label key={key} className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={p[key] as boolean}
                onChange={(e) => set({ [key]: e.target.checked } as Partial<ProductDTO>)}
                className="h-4 w-4 accent-blue-600"
              />
              {lbl}
            </label>
          ))}
        </div>
      </section>

      {/* Imágenes */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wide text-zinc-400">Imágenes</h2>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Subiendo…' : 'Subir imagen'}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
        {p.images.length === 0 ? (
          <p className="text-sm text-zinc-500">Sin imágenes. Subí al menos una (la primera es la principal).</p>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {p.images.map((url, i) => (
              <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800">
                <Image src={url} alt="" fill sizes="120px" className="object-cover" />
                {i === 0 && (
                  <span className="absolute left-1 top-1 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">Principal</span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-black/60 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {i !== 0 && (
                    <button onClick={() => makeMain(url)} title="Hacer principal" className="rounded bg-white/20 p-1 hover:bg-white/30">
                      <Star className="h-3.5 w-3.5 text-white" />
                    </button>
                  )}
                  <button onClick={() => removeImage(url)} title="Quitar" className="rounded bg-red-600/80 p-1 hover:bg-red-600">
                    <Trash2 className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Precios por medida */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
        <h2 className="mb-1 text-sm font-black uppercase tracking-wide text-zinc-400">Precios por medida</h2>
        <p className="mb-4 text-xs text-zinc-500">
          Precio = lo que cobrás. Precio sugerido = el tachado (dejalo vacío para no mostrar tachado).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-zinc-400">
              <tr>
                <th className="py-2 pr-3">Medida</th>
                <th className="py-2 pr-3">Precio ($)</th>
                <th className="py-2 pr-3">Sugerido ($)</th>
                <th className="py-2 pr-3">Stock</th>
                <th className="py-2 pr-3 text-center">Disp.</th>
              </tr>
            </thead>
            <tbody>
              {p.variants.map((v) => (
                <tr key={v.id} className="border-t border-zinc-800">
                  <td className="py-2 pr-3">
                    <span className="font-semibold text-white">{v.measure}</span>
                    <span className="ml-1 text-xs text-zinc-500">{v.plaza}</span>
                  </td>
                  <td className="py-2 pr-3">
                    <input type="number" className={`${input} w-32`} value={v.priceARS}
                      onChange={(e) => setVariant(v.id, { priceARS: Number(e.target.value) })} />
                  </td>
                  <td className="py-2 pr-3">
                    <input type="number" placeholder="—" className={`${input} w-32`} value={v.priceListARS ?? ''}
                      onChange={(e) => setVariant(v.id, { priceListARS: e.target.value === '' ? null : Number(e.target.value) })} />
                  </td>
                  <td className="py-2 pr-3">
                    <input type="number" className={`${input} w-20`} value={v.stock}
                      onChange={(e) => setVariant(v.id, { stock: Number(e.target.value) })} />
                  </td>
                  <td className="py-2 pr-3 text-center">
                    <input type="checkbox" checked={v.available} className="h-4 w-4 accent-blue-600"
                      onChange={(e) => setVariant(v.id, { available: e.target.checked })} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Barra de guardar (sticky) */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur lg:pl-64">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-1">
          <span className="text-sm">
            {error ? <span className="text-red-400">{error}</span> : saved ? <span className="text-emerald-400">Guardado ✓</span> : <span className="text-zinc-500">Cambios sin guardar se pierden al salir.</span>}
          </span>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 font-bold text-white hover:bg-blue-500 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : saved ? <Check className="h-5 w-5" /> : null}
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
