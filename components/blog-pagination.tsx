import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
}

export function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Button variant="outline" size="icon" disabled={currentPage === 1} asChild>
        <Link href={`/blog?page=${currentPage - 1}`}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          className={page === currentPage ? "bg-green-600 hover:bg-green-700" : ""}
          asChild
        >
          <Link href={`/blog?page=${page}`}>{page}</Link>
        </Button>
      ))}

      <Button variant="outline" size="icon" disabled={currentPage === totalPages} asChild>
        <Link href={`/blog?page=${currentPage + 1}`}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
