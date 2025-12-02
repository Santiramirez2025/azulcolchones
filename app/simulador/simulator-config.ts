// app/simulador/simulator-config.ts - CON PREGUNTA DE MEDIDA
import { 
  Moon, User, Bed, DollarSign, 
  Ruler, Maximize2, Users, Crown
} from 'lucide-react'

export interface SimulatorStep {
  id: string
  key: 'position' | 'weight' | 'firmness' | 'budget' | 'size'
  title: string
  subtitle: string
  options: {
    value: string
    label: string
    desc: string
    icon: any
    gradient: string
  }[]
}

export const SIMULATOR_STEPS: SimulatorStep[] = [
  {
    id: 'position',
    key: 'position',
    title: '¿Cómo dormís habitualmente?',
    subtitle: 'Tu posición de sueño determina el soporte que necesitás',
    options: [
      {
        value: 'side',
        label: 'De lado',
        desc: 'Necesitás alivio de presión en hombros y caderas',
        icon: Moon,
        gradient: 'from-blue-500 to-cyan-600'
      },
      {
        value: 'back',
        label: 'Boca arriba',
        desc: 'Requiere soporte lumbar y alineación espinal',
        icon: User,
        gradient: 'from-purple-500 to-pink-600'
      },
      {
        value: 'stomach',
        label: 'Boca abajo',
        desc: 'Ideal con superficie más firme para el abdomen',
        icon: Bed,
        gradient: 'from-orange-500 to-red-600'
      },
      {
        value: 'mixed',
        label: 'Combinado',
        desc: 'Cambias de posición durante la noche',
        icon: Maximize2,
        gradient: 'from-green-500 to-emerald-600'
      }
    ]
  },
  {
    id: 'size',
    key: 'size',
    title: '¿Qué medida necesitás?',
    subtitle: 'Elegí el tamaño ideal para tu espacio y necesidad',
    options: [
      {
        value: 'single',
        label: '1 Plaza',
        desc: '80-90cm • Ideal para una persona',
        icon: User,
        gradient: 'from-blue-500 to-indigo-600'
      },
      {
        value: 'twin',
        label: '1½ Plaza',
        desc: '100-110cm • Mayor espacio individual',
        icon: User,
        gradient: 'from-cyan-500 to-blue-600'
      },
      {
        value: 'double',
        label: '2 Plazas',
        desc: '130-140cm • Pareja o espacio extra',
        icon: Users,
        gradient: 'from-purple-500 to-violet-600'
      },
      {
        value: 'queen',
        label: 'Queen',
        desc: '150-160cm • Máximo confort para dos',
        icon: Crown,
        gradient: 'from-pink-500 to-rose-600'
      },
      {
        value: 'king',
        label: 'King',
        desc: '180-200cm • Lujo y espacio absoluto',
        icon: Crown,
        gradient: 'from-amber-500 to-orange-600'
      }
    ]
  },
  {
    id: 'weight',
    key: 'weight',
    title: '¿Cuál es tu peso aproximado?',
    subtitle: 'Esto nos ayuda a determinar el nivel de soporte necesario',
    options: [
      {
        value: 'light',
        label: 'Menos de 70kg',
        desc: 'Colchones más suaves te brindarán mejor confort',
        icon: User,
        gradient: 'from-green-500 to-emerald-600'
      },
      {
        value: 'medium',
        label: '70-90kg',
        desc: 'Firmeza media balanceada para soporte óptimo',
        icon: User,
        gradient: 'from-blue-500 to-cyan-600'
      },
      {
        value: 'heavy',
        label: 'Más de 90kg',
        desc: 'Mayor firmeza para soporte y durabilidad',
        icon: User,
        gradient: 'from-orange-500 to-red-600'
      }
    ]
  },
  {
    id: 'firmness',
    key: 'firmness',
    title: '¿Qué nivel de firmeza preferís?',
    subtitle: 'La firmeza afecta directamente tu comodidad y descanso',
    options: [
      {
        value: 'soft',
        label: 'Suave',
        desc: 'Sensación envolvente y acolchada',
        icon: Moon,
        gradient: 'from-pink-500 to-rose-600'
      },
      {
        value: 'medium',
        label: 'Media',
        desc: 'Balance perfecto entre confort y soporte',
        icon: Bed,
        gradient: 'from-blue-500 to-cyan-600'
      },
      {
        value: 'firm',
        label: 'Firme',
        desc: 'Soporte sólido y estructura definida',
        icon: Maximize2,
        gradient: 'from-slate-500 to-zinc-600'
      }
    ]
  },
  {
    id: 'budget',
    key: 'budget',
    title: '¿Cuál es tu presupuesto?',
    subtitle: 'Precios en Pesos Argentinos',
    options: [
      {
        value: 'economic',
        label: 'Económico',
        desc: 'Hasta $300.000 • Excelente relación calidad-precio',
        icon: DollarSign,
        gradient: 'from-green-500 to-emerald-600'
      },
      {
        value: 'standard',
        label: 'Estándar',
        desc: '$300.000 - $600.000 • Mayor confort y durabilidad',
        icon: DollarSign,
        gradient: 'from-blue-500 to-cyan-600'
      },
      {
        value: 'premium',
        label: 'Premium',
        desc: 'Más de $1.000.000 • Tecnología y materiales top',
        icon: DollarSign,
        gradient: 'from-purple-500 to-pink-600'
      }
    ]
  }
]