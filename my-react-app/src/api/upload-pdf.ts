import { api } from '~/lib/axios'
import { PDF } from '~/types/pdf'

type UploadPDFRequest = {
  name: string
  email: string
  file: File
}

export type UploadPDFResponse = {
  name: string
  email: string
  pdf_info: PDF
}

export async function uploadPDF(request: UploadPDFRequest) {
  const formData = new FormData()

  formData.append('name', request.name)
  formData.append('email', request.email)
  formData.append('file', request.file)

  const response = await api.post<UploadPDFResponse>('/upload-pdf', formData)

  return response.data
}
