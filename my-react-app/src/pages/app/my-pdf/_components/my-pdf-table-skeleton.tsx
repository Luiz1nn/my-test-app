import { DownloadIcon, FileIcon } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { CardContent } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

export function MyPDFTableSkeleton() {
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
          <TableRow>
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button disabled variant="outline" size="icon">
                  <FileIcon className="h-4 w-4" />
                  <span className="sr-only">Download PDF</span>
                </Button>
                <Button disabled variant="outline" size="icon">
                  <DownloadIcon className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  )
}
