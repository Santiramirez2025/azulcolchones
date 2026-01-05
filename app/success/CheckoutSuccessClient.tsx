// app/checkout/success/CheckoutSuccessClient.tsx - CLIENT OPTIMIZED ⚡
'use client'

import { useEffect, useState, memo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CheckCircle, Package, Truck, Mail, ArrowRight, Loader2, 
  Shield, Award, CreditCard, MapPin, Phone, Clock
} from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import confetti from 'canvas-confetti'

// ============================================================================
// TYPES
// ============================================================================
interface OrderData {
  orderId?: string
  paymentMethod?: string
  amount?: number
}

interface TrustIndicator {
  icon: any
  text: string
  color: string
}

// ============================================================================
// MEMOIZED COMPONENTS
// ============================================================================

const SuccessIcon = memo(() => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ 
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.2 
    }}
    className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-2xl shadow-emerald-500/50"
  >
    <CheckCircle className="w-14 h-14 text-white" aria-hidden="true" />
  </motion.div>
))
SuccessIcon.displayName = 'SuccessIcon'

const InfoCard = memo(({ 
  icon: Icon, 
  title, 
  description, 
  borderColor,
  delay 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  borderColor: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border ${borderColor} backdrop-blur-sm shadow-xl`}
  >
    <Icon className={`w-10 h-10 ${borderColor.replace('border-', 'text-').replace('/20', '')} mb-4 mx-auto`} aria-hidden="true" />
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
  </motion.div>
))
InfoCard.displayName = 'InfoCard'

const OrderDetails = memo(({ orderData }: { orderData: OrderData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="mb-8 p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-blue-500/20 shadow-xl"
  >
    <h3 className="text-lg font-bold text-white mb-4">Detalles del pedido</h3>
    
    <div className="space-y-3 text-left">
      {orderData.orderId && (
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-sm text-zinc-400">Número de orden:</span>
          <span className="text-sm font-mono font-semibold text-white">{orderData.orderId}</span>
        </div>
      )}
      
      {orderData.paymentMethod && (
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-sm text-zinc-400">Método de pago:</span>
          <span className="text-sm font-semibold text-white capitalize">{orderData.paymentMethod}</span>
        </div>
      )}
      
      {orderData.amount && (
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-zinc-400">Total:</span>
          <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ${orderData.amount.toLocaleString('es-AR')}
          </span>
        </div>
      )}
    </div>
  </motion.div>
))
OrderDetails.displayName = 'OrderDetails'

const TrustIndicatorCard = memo(({ item, index }: { item: TrustIndicator; index: number }) => (
  <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-4 text-center">
    <item.icon className={`w-6 h-6 mx-auto mb-2 text-${item.color}-400`} aria-hidden="true" />
    <p className="text-xs font-semibold text-white">{item.text}</p>
  </div>
))
TrustIndicatorCard.displayName = 'TrustIndicatorCard'

const NextSteps = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
    className="p-6 md:p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-blue-500/20 text-left max-w-2xl mx-auto shadow-xl mb-8"
  >
    <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
      <Clock className="w-6 h-6 text-blue-400" aria-hidden="true" />
      ¿Qué sigue ahora?
    </h3>
    
    <ul className="space-y-4 text-sm text-zinc-300">
      <li className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span>Vas a recibir un email de confirmación con todos los detalles de tu pedido</span>
      </li>
      <li className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span>Te vamos a enviar el número de seguimiento cuando tu pedido sea despachado</span>
      </li>
      <li className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span>Podés hacer el seguimiento de tu pedido desde tu cuenta</span>
      </li>
      <li className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span>Si tenés alguna duda, contactanos por WhatsApp al +54 9 3534 09-6566</span>
      </li>
    </ul>
  </motion.div>
))
NextSteps.displayName = 'NextSteps'

const ContactSection = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.85 }}
    className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl max-w-2xl mx-auto"
  >
    <h3 className="text-lg font-bold text-white mb-4">¿Necesitás ayuda?</h3>
    
    <address className="grid md:grid-cols-2 gap-4 text-left not-italic">
      <div className="flex items-start gap-3">
        <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-white mb-1">WhatsApp</p>
          <a href="tel:+54 9 3534 09-6566" className="text-sm text-zinc-400 hover:text-white transition-colors">
          +54 9 3534 09-6566
          </a>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-white mb-1">Email</p>
          <a href="mailto:hola@azulcolchones.com.ar" className="text-sm text-zinc-400 hover:text-white transition-colors">
            hola@azulcolchones.com.ar
          </a>
        </div>
      </div>
    </address>
  </motion.div>
))
ContactSection.displayName = 'ContactSection'

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================
export function CheckoutSuccessClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const paymentId = searchParams.get('payment_id')
  const externalReference = searchParams.get('external_reference')
  const { clearCart } = useCartStore()
  
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)

  // Memoized data
  const infoCards = [
    { 
      icon: Mail, 
      title: 'Email de confirmación', 
      description: 'Vas a recibir los detalles de tu pedido por email',
      borderColor: 'border-blue-500/20',
      delay: 0.5
    },
    { 
      icon: Package, 
      title: 'Procesando pedido', 
      description: 'Estamos preparando tu pedido para el envío',
      borderColor: 'border-cyan-500/20',
      delay: 0.55
    },
    { 
      icon: Truck, 
      title: 'Entrega Villa María', 
      description: 'Envío gratis • 2-3 días hábiles',
      borderColor: 'border-emerald-500/20',
      delay: 0.6
    }
  ]

  const trustIndicators: TrustIndicator[] = [
    { icon: Shield, text: '3 años garantía', color: 'blue' },
    { icon: Award, text: '100 noches prueba', color: 'emerald' },
    { icon: Truck, text: 'Envío gratis', color: 'cyan' },
    { icon: CreditCard, text: '12 cuotas', color: 'violet' }
  ]

  // Confetti celebration
  useEffect(() => {
    clearCart()

    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [clearCart])

  // Fetch order details
  const fetchOrderDetails = useCallback(async (id: string) => {
    try {
      const lastOrder = sessionStorage.getItem('lastOrder')
      if (lastOrder) {
        const order = JSON.parse(lastOrder)
        setOrderData(order)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching order:', error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (sessionId || paymentId) {
      fetchOrderDetails(sessionId || paymentId || '')
    } else {
      const lastOrder = sessionStorage.getItem('lastOrder')
      if (lastOrder) {
        try {
          setOrderData(JSON.parse(lastOrder))
        } catch (error) {
          console.error('Error parsing order:', error)
        }
      }
      setLoading(false)
    }
  }, [sessionId, paymentId, fetchOrderDetails])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" aria-hidden="true" />
          <p className="text-white text-lg font-semibold">Verificando tu pedido...</p>
          <p className="text-zinc-400 text-sm mt-2">Esto solo tomará un momento</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(16,185,129,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(16,185,129,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <SuccessIcon />

          {/* Main Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
          >
            ¡Pedido confirmado!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Gracias por tu compra. Tu pedido fue procesado correctamente y pronto vas a recibir un email de confirmación.
          </motion.p>

          {/* MercadoPago Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full mb-12"
          >
            <Shield className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-blue-300">
              Pago procesado por MercadoPago
            </span>
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {infoCards.map((card, index) => (
              <InfoCard key={index} {...card} />
            ))}
          </div>

          {/* Order Details */}
          {orderData && <OrderDetails orderData={orderData} />}

          {/* Transaction ID */}
          {(sessionId || paymentId || externalReference) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10 inline-block"
            >
              <p className="text-xs text-zinc-500 mb-1">ID de transacción</p>
              <p className="text-sm font-mono text-zinc-400">
                {sessionId || paymentId || externalReference}
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/mi-cuenta">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-bold shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" aria-hidden="true" />
                Ver mis pedidos
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </Link>

            <Link href="/productos">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                Seguir comprando
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12"
          >
            {trustIndicators.map((item, i) => (
              <TrustIndicatorCard key={i} item={item} index={i} />
            ))}
          </motion.div>

          <NextSteps />
          <ContactSection />

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full text-sm text-zinc-400"
          >
            <MapPin className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span>Villa María, Córdoba • <span className="text-white font-semibold">Argentina</span></span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}