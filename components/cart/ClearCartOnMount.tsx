'use client'
// Limpia el carrito una vez al montar (página de éxito de checkout).
import { useEffect } from 'react'
import { useCartStore } from '@/lib/store/cart-store'

export default function ClearCartOnMount() {
  const clearCart = useCartStore((s) => s.clearCart)
  useEffect(() => {
    clearCart()
    try {
      sessionStorage.removeItem('shippingData')
    } catch {
      /* noop */
    }
  }, [clearCart])
  return null
}
