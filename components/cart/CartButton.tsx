'use client'
// Botón de carrito para el header, con contador en vivo (Zustand).
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'

export default function CartButton({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const count = useCartStore((s) => s.getItemCount())
  // Evita mismatch de hidratación (el carrito vive en localStorage).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const badge = mounted && count > 0 ? count : null

  if (variant === 'mobile') {
    return (
      <Link
        href="/carrito"
        aria-label={`Carrito${badge ? ` (${badge})` : ''}`}
        className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/80 border border-zinc-700/50 active:scale-95 transition-transform"
      >
        <ShoppingCart className="w-5 h-5 text-white" />
        {badge && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">
            {badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <Link
      href="/carrito"
      aria-label={`Carrito${badge ? ` (${badge})` : ''}`}
      className="relative flex items-center gap-2 px-4 py-2.5 mr-3 rounded-xl font-semibold text-sm text-white bg-zinc-800/80 border border-zinc-700/50 hover:bg-zinc-700 transition-colors"
    >
      <ShoppingCart className="w-[18px] h-[18px]" />
      <span>Carrito</span>
      {badge && (
        <span className="min-w-[22px] h-[22px] px-1 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
          {badge}
        </span>
      )}
    </Link>
  )
}
