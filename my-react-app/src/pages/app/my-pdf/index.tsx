import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { myPDF } from '~/api/my-pdf'
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
import { Separator } from '~/components/ui/separator'
import { MyPDFSchema, myPDFSchema } from '~/schemas/my-pdf-schema'

import { MyPDFTable } from './_components/my-pdf-table'

export function MyPdfPage() {
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: myPDF,
  })

  const form = useForm<MyPDFSchema>({
    resolver: zodResolver(myPDFSchema),
  })

  const handleSubmit = async (data: MyPDFSchema) => {
    try {
      await mutateAsync({ params: data })
      toast.success('Pesquisa feita com sucesso!')
    } catch {
      toast.error('Erro ao pesquisar!')
    }
  }

  return (
    <Card className="mx-auto mt-4 w-full max-w-4xl border-2 border-gray-300 dark:border-gray-800">
      <CardHeader>
        <CardTitle>Meus PDFs</CardTitle>
        <CardDescription>
          Digite suas credencias pra buscar seus PDFs.
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

            <Button
              type="submit"
              disabled={isPending && form.formState.isSubmitting}
              className="mt-4 w-full"
            >
              Search
            </Button>
          </form>
        </Form>
      </CardContent>

      <Separator />

      <MyPDFTable isPending={isPending} data={data?.list_pdf} />
    </Card>
  )
}
