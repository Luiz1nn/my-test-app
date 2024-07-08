import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { uploadPDF } from '~/api/upload-pdf'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { UploadPDFSchema, uploadPDFSchema } from '~/schemas/upload-pdf-schema'
import { PDF } from '~/types/pdf'

import { PDFInfo } from './_components/pdf-info'

export function HomePage() {
  const [pdfInfo, setPDFInfo] = useState<PDF | undefined>(undefined)

  const { mutateAsync: uploadPDFFn, isPending } = useMutation({
    mutationFn: uploadPDF,
  })

  const form = useForm<UploadPDFSchema>({
    resolver: zodResolver(uploadPDFSchema),
  })

  const handleSubmit = async (data: UploadPDFSchema) => {
    try {
      const result = await uploadPDFFn(data)
      setPDFInfo(result.pdf_info)

      toast.success('PDF Enviado!')
    } catch {
      toast.error('Erro ao enviar PDF!')
    }
  }

  return (
    <Card className="mx-auto mt-4 w-full max-w-4xl border-2 border-gray-300 dark:border-gray-800">
      <CardHeader>
        <CardTitle>Enviar PDF</CardTitle>
        <CardDescription>
          Digite suas credencias pra enviar PDFs.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-col gap-4 lg:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold">Nome</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digite seu nome"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu email"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold">Documento PDF</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={({ target }) => {
                        if (target.files && target.files[0])
                          field.onChange(target.files[0])
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending && form.formState.isSubmitting}
              className="mt-4 w-full"
            >
              Enviar Documento
            </Button>
          </form>
        </Form>
      </CardContent>

      {pdfInfo && <PDFInfo pdfInfo={pdfInfo} />}
    </Card>
  )
}
