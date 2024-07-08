import { api } from '~/lib/axios'
import { PDF } from '~/types/pdf'

type SearchPdfRequest = {
  params: {
    name: string
    email: string
  }
}

export type SearchPdfResponse = {
  list_pdf: PDF[]
}

export async function myPDF(request: SearchPdfRequest) {
  const response = await api.get<SearchPdfResponse>('/my-pdf', {
    params: request.params,
  })

  return response.data
}
