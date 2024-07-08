import { z } from 'zod'

export const searchPDFSchema = z.object({
  name: z.string().optional(),
})

export type SearchPDFSchema = z.infer<typeof searchPDFSchema>
