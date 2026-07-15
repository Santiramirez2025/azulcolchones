// app/admin/(panel)/contenido/page.tsx — Contenido / Configuración del negocio.
import Link from 'next/link'
import { MapPin, Phone, Clock, Package, ExternalLink, Info } from 'lucide-react'

export const dynamic = 'force-dynamic'

const NEGOCIO = {
  direccion: 'Balerdi 855, Villa María, Córdoba (5900)',
  whatsapp: '+54 9 3534 09-6566',
  horarios: 'Lun a Vie 9:00–19:00 · Sáb 9:00–13:00',
}

export default function ContenidoPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-black">Contenido</h1>
      <p className="mb-6 text-sm text-zinc-500">Datos del negocio y configuración del sitio.</p>

      {/* Datos del negocio */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <MapPin className="mb-3 h-5 w-5 text-blue-400" />
          <p className="text-xs text-zinc-400">Dirección</p>
          <p className="mt-1 font-medium">{NEGOCIO.direccion}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <Phone className="mb-3 h-5 w-5 text-emerald-400" />
          <p className="text-xs text-zinc-400">WhatsApp</p>
          <p className="mt-1 font-medium">{NEGOCIO.whatsapp}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <Clock className="mb-3 h-5 w-5 text-amber-400" />
          <p className="text-xs text-zinc-400">Horarios</p>
          <p className="mt-1 font-medium">{NEGOCIO.horarios}</p>
        </div>
      </div>

      {/* Nota próxima etapa */}
      <div className="mt-4 flex gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
        <div>
          <p className="font-semibold text-white">Edición de textos y SEO</p>
          <p className="mt-1 text-sm text-zinc-400">
            La edición de los textos del sitio, metadatos y datos de contacto desde el panel se
            agrega en la próxima etapa. Por ahora estos valores están fijos en el código. Lo que ya
            podés manejar por completo son los <strong className="text-zinc-200">productos</strong>{' '}
            (precios, medidas, imágenes, destacados).
          </p>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link
          href="/admin/productos"
          className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-blue-500/50"
        >
          <Package className="h-5 w-5 text-violet-400" />
          <div>
            <p className="font-semibold">Editar productos</p>
            <p className="text-sm text-zinc-500">Precios, medidas, imágenes, destacados</p>
          </div>
        </Link>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-blue-500/50"
        >
          <ExternalLink className="h-5 w-5 text-zinc-300" />
          <div>
            <p className="font-semibold">Ver el sitio</p>
            <p className="text-sm text-zinc-500">Abrí la web pública en otra pestaña</p>
          </div>
        </a>
      </div>
    </div>
  )
}
