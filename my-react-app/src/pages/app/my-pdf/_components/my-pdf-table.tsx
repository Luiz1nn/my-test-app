import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { DownloadIcon, FileIcon } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { CardContent } from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { PDF } from '~/types/pdf'

import { MyPDFTableSkeleton } from './my-pdf-table-skeleton'

type Props = {
  isPending: boolean
  data: PDF[] | undefined
}

export function MyPDFTable({ isPending, data }: Props) {
  if (isPending) return <MyPDFTableSkeleton />

  const handleDownloadImages = async () => {
    if (!data) return
    const zip = new JSZip()

    data[0].images.forEach((image, index) => {
      zip.file(`image-${index}.jpg`, image, { base64: true })
    })

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'images.zip')
  }

  const handleDownloadText = async () => {
    if (!data) return

    const blob = new Blob([data[0].text_content ?? ''], {
      type: 'text/plain;charset=utf-8',
    })
    saveAs(blob, 'text-pdf.txt')
  }

  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Arquivo</TableHead>
            <TableHead>Tamanho</TableHead>
            <TableHead>Total de Palavras</TableHead>
            <TableHead>Palavra de Maior Ocorrência</TableHead>
            <TableHead>Quantidade de Imagens</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileIcon className="h-5 w-5" />
                    <span>{item.file_name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.file_size}</TableCell>
                <TableCell>{item.total_words}</TableCell>
                <TableCell>{item.most_common_word}</TableCell>
                <TableCell>{item.total_images}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleDownloadImages}
                      variant="outline"
                      size="icon"
                    >
                      <FileIcon className="h-4 w-4" />
                      <span className="sr-only">Download PDF</span>
                    </Button>
                    <Button
                      onClick={handleDownloadText}
                      variant="outline"
                      size="icon"
                    >
                      <DownloadIcon className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Sem nenhuma lista
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  )
}
