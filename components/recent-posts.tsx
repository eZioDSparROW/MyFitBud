import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for recent posts
const recentPosts = [
  {
    id: 1,
    title: "10 Essential Exercises for Building Core Strength",
    status: "Published",
    date: "May 10, 2025",
    views: 1245,
    comments: 32,
  },
  {
    id: 2,
    title: "The Ultimate Guide to Protein: How Much Do You Really Need?",
    status: "Published",
    date: "May 8, 2025",
    views: 987,
    comments: 18,
  },
  {
    id: 3,
    title: "5 Common Workout Mistakes and How to Fix Them",
    status: "Published",
    date: "May 5, 2025",
    views: 756,
    comments: 24,
  },
  {
    id: 4,
    title: "The Science Behind HIIT: Why It Works So Well",
    status: "Published",
    date: "May 3, 2025",
    views: 1102,
    comments: 27,
  },
  {
    id: 5,
    title: "Meal Prep 101: Save Time and Stay on Track",
    status: "Published",
    date: "May 1, 2025",
    views: 843,
    comments: 15,
  },
]

export function RecentPosts() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Views</TableHead>
          <TableHead className="text-right">Comments</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentPosts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {post.status}
              </span>
            </TableCell>
            <TableCell>{post.date}</TableCell>
            <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
            <TableCell className="text-right">{post.comments}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
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
