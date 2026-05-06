import { z } from 'zod'

export const ReservaItemSchema = z.object({
  productId: z.string().min(1).max(64),
  name: z.string().min(1).max(200),
  size: z.string().max(50).optional(),
  variant: z.string().max(50).optional(),
  quantity: z.number().int().positive().max(20),
  price: z.number().positive().finite(),
})

export const ReservaShippingSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email().max(120),
  phone: z.string().min(8).max(20),
  address: z.string().min(3).max(200),
  addressNumber: z.string().max(20).optional(),
  city: z.string().min(2).max(100),
  province: z.string().max(100).optional(),
  postalCode: z.string().max(10).optional(),
  notes: z.string().max(500).optional(),
})

export const ReservaSchema = z.object({
  items: z.array(ReservaItemSchema).min(1).max(20),
  total: z.number().positive().finite(),
  shipping: ReservaShippingSchema,
})

export type ReservaInput = z.infer<typeof ReservaSchema>
export type ReservaItem = z.infer<typeof ReservaItemSchema>
export type ReservaShipping = z.infer<typeof ReservaShippingSchema>
