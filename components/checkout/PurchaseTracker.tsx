'use client'
// Dispara el evento Purchase de Meta Pixel una vez, al confirmarse la compra.
import { useEffect, useRef } from 'react'
import { trackPurchase } from '@/lib/pixel'

export interface PurchaseTrackerProps {
  value: number
  orderId: string
  contents: { id: string; quantity: number; item_price: number }[]
}

export default function PurchaseTracker({ value, orderId, contents }: PurchaseTrackerProps) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    trackPurchase({ value, orderId, contents, numItems: contents.length })
  }, [value, orderId, contents])
  return null
}
