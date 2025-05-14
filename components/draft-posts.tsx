import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for draft posts
const draftPosts = [
  {
    id: 101,
    title: "How to Design a Progressive Overload Program",
    lastEdited: "May 12, 2025",
    author: "Sarah Johnson",
  },
  {
    id: 102,
    title: "The Best Post-Workout Nutrition Strategies",
    lastEdited: "May 11, 2025",
    author: "Michael Chen",
  },
  {
    id: 103,
    title: "Bodyweight Exercises for Travelers",
    lastEdited: "May 9, 2025",
    author: "Emma Wilson",
  },
]

export function DraftPosts() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Last Edited</TableHead>
          <TableHead>Author</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {draftPosts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell>{post.lastEdited}</TableCell>
            <TableCell>{post.author}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Preview</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Publish</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
