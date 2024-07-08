import { z } from 'zod'

export const myPDFSchema = z.object({
  name: z.string({
    required_error: 'Digite seu nome!',
  }),
  email: z.string({
    required_error: 'Digite seu email!',
  }),
})

export type MyPDFSchema = z.infer<typeof myPDFSchema>
