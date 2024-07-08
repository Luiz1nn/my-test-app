import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { searchPDF } from '~/api/search-pdf'
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
import { SearchPDFSchema, searchPDFSchema } from '~/schemas/search-pdf-schema'

import { SearchTable } from './_components/search-table'

export function SearchPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['search-pdf'],
    queryFn: () => searchPDF({}),
  })

  const {
    mutateAsync: searchPDFFn,
    isPending,
    data: newData,
  } = useMutation({
    mutationFn: searchPDF,
  })

  const form = useForm<SearchPDFSchema>({
    resolver: zodResolver(searchPDFSchema),
  })

  const handleSubmit = async (data: SearchPDFSchema) => {
    try {
      await searchPDFFn({ params: data })
      toast.success('Pesquisa feita com sucesso!')
    } catch {
      toast.error('Erro ao pesquisar!')
    }
  }

  return (
    <Card className="mx-auto mt-4 w-full max-w-4xl border-2 border-gray-300 dark:border-gray-800">
      <CardHeader>
        <CardTitle>Pesquisar PDFs</CardTitle>
        <CardDescription>
          Digite suas credencias pra buscar PDFs.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold">Nome do Arquivo</FormLabel>
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

      <SearchTable
        isLoading={isLoading}
        isPending={isPending}
        data={newData?.list_pdf ?? data?.list_pdf}
      />
    </Card>
  )
}
