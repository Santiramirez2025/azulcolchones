// types/inmobiliarias.ts

export interface Pack {
    id: string
    nombre: string
    categoria: 'economico' | 'equilibrio' | 'premium'
    imagen: string
    imagenes: string[]
    incluye: IncludeItem[]
    precioInmobiliaria: number
    precioSugerido: number
    ganancia: number
    porcentajeGanancia: number
    idealPara: string[]
    destacado?: boolean
    badge?: string
    comparativaMercado?: {
      proveedor: string
      precio: number
      incluye: string
    }
  }
  
  export interface IncludeItem {
    producto: string
    modelo: string
    medida: string
    descripcion: string
  }
  
  export interface NivelComision {
    nombre: string
    nivel: 'basico' | 'estandar' | 'premium' | 'platinum'
    unidadesTrimestre: string
    comision: string
    descuentoCompra: string
    beneficios: string[]
    color: string
  }
  
  export interface PackEdificio {
    distribucion: {
      tipo: string
      cantidad: number
      precioUnitario: number
    }[]
    subtotal: number
    descuento: number
    precioNeto: number
    comision: number
    bonus: number
    gananciaTotal: number
  }
  
  export interface Testimonio {
    id: string
    nombre: string
    inmobiliaria: string
    ciudad: string
    foto: string
    texto: string
    rating: number
    fecha: string
  }