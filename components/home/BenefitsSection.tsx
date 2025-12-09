'use client'

import { motion } from 'framer-motion'
import { Banknote, CreditCard, Calendar, Percent, CheckCircle2, AlertCircle } from 'lucide-react'

const paymentPlans = [
  {
    id: 1,
    title: 'Efectivo',
    subtitle: 'Transferencia o Contado',
    percentage: '0%',
    description: 'Sin recargos',
    example: '$220.000',
    icon: Banknote,
    color: 'emerald',
    bgGradient: 'from-emerald-500/10 to-emerald-600/5',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    badge: '✓ Mejor precio',
    featured: true
  },
  {
    id: 2,
    title: '3 Cuotas',
    subtitle: 'Sin interés',
    percentage: '+20%',
    description: 'Con tarjeta',
    example: '$88.000/mes',
    icon: CreditCard,
    color: 'blue',
    bgGradient: 'from-blue-500/10 to-blue-600/5',
    borderColor: 'border-blue-500/20',
    textColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    badge: null,
    featured: false
  },
  {
    id: 3,
    title: '6 Cuotas',
    subtitle: 'Sin interés',
    percentage: '+31%',
    description: 'Con tarjeta',
    example: '$47.855/mes',
    icon: Calendar,
    color: 'violet',
    bgGradient: 'from-violet-500/10 to-violet-600/5',
    borderColor: 'border-violet-500/20',
    textColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    badge: null,
    featured: false
  },
  {
    id: 4,
    title: '12 Cuotas',
    subtitle: 'Sin interés',
    percentage: '+60%',
    description: 'Con tarjeta',
    example: '$29.333/mes',
    icon: Percent,
    color: 'fuchsia',
    bgGradient: 'from-fuchsia-500/10 to-fuchsia-600/5',
    borderColor: 'border-fuchsia-500/20',
    textColor: 'text-fuchsia-400',
    iconBg: 'bg-fuchsia-500/10',
    badge: 'Más plazo',
    featured: false
  }
]

export function BenefitsSection() {
  return (
    <section 
      className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      {/* Background Effects - Subtle en mobile */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header - SIMPLIFICADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          {/* Badge compacto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 rounded-full border border-emerald-500/20 mb-4 sm:mb-6"
          >
            <Banknote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-300">Formas de pago</span>
          </motion.div>

          {/* Título CLARO y DIRECTO */}
          <h2 
            id="benefits-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight"
          >
            <span className="block">Conocé nuestras formas de pago</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mt-1">
              Elegí tu opción
            </span>
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Contado con descuento o cuotas sin interés
          </p>
        </motion.div>

        {/* Payment Cards Grid - MOBILE OPTIMIZED */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
          {paymentPlans.map((plan, index) => {
            const Icon = plan.icon
            
            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut"
                }}
                className="group relative"
              >
                {/* Featured Badge - MÁS VISIBLE */}
                {plan.featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 + 0.2, type: "spring" }}
                    className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 z-20"
                  >
                    <div className="px-2.5 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg sm:rounded-full text-white text-[10px] sm:text-xs font-bold shadow-lg shadow-emerald-500/50">
                      💰 MEJOR PRECIO
                    </div>
                  </motion.div>
                )}

                {/* Card - SIMPLIFICADO */}
                <div className={`relative h-full bg-gradient-to-br ${plan.bgGradient} backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 ${
                  plan.featured 
                    ? `${plan.borderColor} shadow-lg shadow-emerald-500/10` 
                    : `${plan.borderColor} hover:border-opacity-40`
                } ${plan.featured ? 'scale-[1.02] sm:scale-105' : ''}`}>
                  
                  {/* Top Bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${plan.featured ? 'from-emerald-500 to-emerald-600' : `from-${plan.color}-500 to-${plan.color}-600`}`} />
                  
                  <div className="p-4 sm:p-5 md:p-6">
                    
                    {/* Icon + Badge */}
                    <div className="flex items-start justify-between mb-4 sm:mb-5">
                      <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${plan.iconBg} rounded-lg sm:rounded-xl border border-white/10`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${plan.textColor}`} />
                      </div>
                      
                      {/* Badge con recargo */}
                      <div className={`px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg ${
                        plan.featured 
                          ? 'bg-emerald-500/20 border border-emerald-500/30'
                          : 'bg-zinc-800/50 border border-zinc-700/50'
                      }`}>
                        <span className={`text-xs sm:text-sm font-bold ${
                          plan.featured ? 'text-emerald-400' : 'text-zinc-400'
                        }`}>
                          {plan.percentage}
                        </span>
                      </div>
                    </div>

                    {/* Title - MÁS GRANDE */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">
                      {plan.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm text-zinc-400 mb-3 sm:mb-4">
                      {plan.subtitle}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent mb-3 sm:mb-4" />

                    {/* Example Price - DESTACADO */}
                    <div className="mb-3 sm:mb-4">
                      <div className="text-xs text-zinc-500 mb-1">Ejemplo:</div>
                      <div className={`text-lg sm:text-xl md:text-2xl font-black ${plan.textColor}`}>
                        {plan.example}
                      </div>
                    </div>

                    {/* Description con ícono */}
                    <div className="flex items-center gap-2">
                      {plan.featured ? (
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 flex-shrink-0" />
                      )}
                      <span className="text-xs sm:text-sm text-zinc-400">
                        {plan.description}
                      </span>
                    </div>

                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Info Note - MÁS CLARA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-white">
                  💡 Importante sobre los precios
                </h4>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  <p>
                    • <span className="text-emerald-400 font-semibold">Efectivo/Transferencia:</span> Precio de lista sin recargos
                  </p>
                  <p>
                    • <span className="text-blue-400 font-semibold">Cuotas con tarjeta:</span> Incluyen recargo financiero según cantidad de cuotas
                  </p>
                  <p className="text-zinc-500 text-[11px] sm:text-xs">
                    Los porcentajes indicados son el recargo sobre el precio de contado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA - OPCIONAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 sm:mt-10 md:mt-12"
        >
          <a 
            href="https://wa.me/5493534017332?text=Hola!%20Quiero%20consultar%20sobre%20formas%20de%20pago"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
          >
            <span>Consultar financiación</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}