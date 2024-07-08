import { api } from '~/lib/axios'
import { PDF } from '~/types/pdf'

type SearchPdfRequest = {
  params?: {
    name?: string
  }
}

export type SearchPdfResponse = {
  list_pdf: PDF[]
}

export async function searchPDF(request: SearchPdfRequest) {
  const response = await api.get<SearchPdfResponse>('/search-pdf', {
    params: request.params,
  })

  return response.data
}
