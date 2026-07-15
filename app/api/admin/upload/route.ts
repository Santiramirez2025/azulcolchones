// app/api/admin/upload/route.ts — Sube una imagen a Vercel Blob. Protegido por middleware.
import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'

const MAX_BYTES = 6 * 1024 * 1024 // 6 MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Almacenamiento de imágenes no configurado (falta BLOB_READ_WRITE_TOKEN).' },
      { status: 503 },
    )
  }

  const form = await req.formData().catch(() => null)
  const file = form?.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No se recibió el archivo.' }, { status: 400 })
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: 'Formato no permitido (usá JPG, PNG, WebP o AVIF).' }, { status: 415 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'La imagen supera los 6 MB.' }, { status: 413 })
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(-60)
  try {
    const blob = await put(`productos/${safeName}`, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
    })
    return NextResponse.json({ url: blob.url })
  } catch (e) {
    return NextResponse.json({ error: 'No se pudo subir la imagen.', detail: String(e) }, { status: 500 })
  }
}
