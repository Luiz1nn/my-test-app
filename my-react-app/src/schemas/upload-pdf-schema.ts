import { z } from 'zod'

export const uploadPDFSchema = z.object({
  name: z.string({
    required_error: 'Digite seu nome!',
  }),
  email: z.string({
    required_error: 'Digite seu email!',
  }),
  file: z.instanceof(File, {
    message: 'Selecione o arquivo!',
  }),
})

export type UploadPDFSchema = z.infer<typeof uploadPDFSchema>
