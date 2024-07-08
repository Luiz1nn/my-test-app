import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { DownloadIcon, FileIcon } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { CardFooter } from '~/components/ui/card'
import { formatBytes } from '~/helpers/format-bytes'
import { PDF } from '~/types/pdf'

type Props = {
  pdfInfo: PDF
}

export function PDFInfo({ pdfInfo }: Props) {
  const handleDownloadImages = async () => {
    const zip = new JSZip()

    pdfInfo.images.forEach((image, index) => {
      zip.file(`image-${index}.jpg`, image, { base64: true })
    })

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'images.zip')
  }

  const handleDownloadText = async () => {
    const blob = new Blob([pdfInfo.text_content ?? ''], {
      type: 'text/plain;charset=utf-8',
    })
    saveAs(blob, 'text-pdf.txt')
  }

  return (
    <CardFooter>
      <div className="w-full space-y-4">
        <h3 className="font-bold">Informações do Arquivo Enviado</h3>

        <div className="grid w-full gap-2">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Nome do Arquivo:</p>
            <p>{pdfInfo.file_name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Tamanho do Arquivo:</p>
            <p>{formatBytes(pdfInfo.file_size)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Total de Palavras:</p>
            <p>{pdfInfo.total_words}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Palavra de Maior Ocorrência:
            </p>
            <p>{pdfInfo.most_common_word}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Quantidade de Imagens:</p>
            <p>{pdfInfo.total_images}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Download das Imagens:</p>
            <Button onClick={handleDownloadImages}>
              <FileIcon className="h-4 w-4" />
              <span className="sr-only">Download PDF</span>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Download do Texto:</p>
            <Button onClick={handleDownloadText}>
              <DownloadIcon className="h-4 w-4" />
              <span className="sr-only">Download do Texto</span>
            </Button>
          </div>
        </div>
      </div>
    </CardFooter>
  )
}
