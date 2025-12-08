'use client'

import { motion } from 'framer-motion'
import { Banknote, CreditCard, Calendar, TrendingUp } from 'lucide-react'

const paymentPlans = [
  {
    id: 1,
    badge: 'Mejor precio',
    title: 'Efectivo/Transferencia',
    description: 'Precio de lista sin recargos',
    icon: Banknote,
    highlight: 'Precio real',
    color: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
    featured: true
  },
  {
    id: 2,
    badge: '+20%',
    title: '3 Cuotas',
    description: 'Sin interés con tarjeta',
    icon: CreditCard,
    highlight: 'Pago flexible',
    color: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    featured: false
  },
  {
    id: 3,
    badge: '+31%',
    title: '6 Cuotas',
    description: 'Sin interés con tarjeta',
    icon: Calendar,
    highlight: 'Más plazo',
    color: 'from-violet-500 to-purple-500',
    iconBg: 'bg-gradient-to-br from-violet-500/20 to-purple-500/20',
    featured: false
  },
  {
    id: 4,
    badge: '+60%',
    title: '12 Cuotas',
    description: 'Sin interés con tarjeta',
    icon: TrendingUp,
    highlight: 'Máximo plazo',
    color: 'from-fuchsia-500 to-pink-500',
    iconBg: 'bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20',
    featured: false
  }
]

export function BenefitsSection() {
  return (
    <section 
      className="py-24 md:py-32 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full border border-emerald-500/20 mb-6"
          >
            <Banknote className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Financiación disponible</span>
          </motion.div>

          <h2 
            id="benefits-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
          >
            Elegí tu forma
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              de pago ideal
            </span>
          </h2>
          
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
            Comprá al mejor precio en efectivo o financiá en cuotas sin interés
          </p>
        </motion.div>

        {/* Payment Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {paymentPlans.map((plan, index) => {
            const Icon = plan.icon
            
            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="group relative"
              >
                {/* Featured Badge - Solo para efectivo */}
                {plan.featured && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                  >
                    <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white text-xs font-bold shadow-lg shadow-emerald-500/50">
                      ⭐ RECOMENDADO
                    </div>
                  </motion.div>
                )}

                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 ${plan.featured ? 'opacity-10' : ''}`} />
                
                {/* Card */}
                <div className={`relative h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl rounded-3xl overflow-hidden border transition-all duration-500 shadow-2xl group-hover:shadow-3xl ${
                  plan.featured 
                    ? 'border-emerald-500/30 group-hover:border-emerald-500/50 scale-105 lg:scale-110' 
                    : 'border-white/5 group-hover:border-white/10'
                }`}>
                  {/* Top Gradient Bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${plan.color}`} />
                  
                  <div className="p-8">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className={`inline-flex items-center justify-center w-16 h-16 ${plan.iconBg} rounded-2xl mb-6 border border-white/10`}
                    >
                      <Icon className={`w-8 h-8 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`} />
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.1 + 0.2
                      }}
                      className="mb-4"
                    >
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                        plan.featured 
                          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30'
                          : 'bg-zinc-800/50 border-zinc-700/50'
                      }`}>
                        <span className={`text-sm font-bold ${
                          plan.featured ? 'text-emerald-400' : 'text-zinc-400'
                        }`}>
                          {plan.badge}
                        </span>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-base leading-relaxed mb-6">
                      {plan.description}
                    </p>

                    {/* Highlight */}
                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
                      plan.featured 
                        ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20'
                        : 'bg-zinc-800/30'
                    }`}>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${plan.color} animate-pulse`} />
                      <span className={`text-sm font-medium ${
                        plan.featured ? 'text-emerald-300' : 'text-zinc-300'
                      }`}>
                        {plan.highlight}
                      </span>
                    </div>

                    {/* Hover Effect Line */}
                    <motion.div
                      className={`h-0.5 w-0 bg-gradient-to-r ${plan.color} mt-6 group-hover:w-full transition-all duration-500`}
                    />
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <p className="text-zinc-500 text-sm leading-relaxed">
            Los precios en cuotas incluyen el recargo financiero correspondiente. 
            <span className="text-zinc-400 font-medium"> El precio de lista siempre es en efectivo o transferencia.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}