import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, User } from "lucide-react"
import { BlogHeader } from "@/components/blog-header"
import { BlogPagination } from "@/components/blog-pagination"

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "10 Essential Exercises for Building Core Strength",
    excerpt: "Discover the most effective exercises to strengthen your core and improve overall stability.",
    author: "Sarah Johnson",
    date: "May 10, 2025",
    readTime: "8 min read",
    category: "Workouts",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Protein: How Much Do You Really Need?",
    excerpt: "Learn about protein requirements for different fitness goals and how to optimize your intake.",
    author: "Michael Chen",
    date: "May 8, 2025",
    readTime: "12 min read",
    category: "Nutrition",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "5 Common Workout Mistakes and How to Fix Them",
    excerpt: "Avoid these common pitfalls that might be hindering your fitness progress.",
    author: "Emma Wilson",
    date: "May 5, 2025",
    readTime: "6 min read",
    category: "Workouts",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "The Science Behind HIIT: Why It Works So Well",
    excerpt: "Understand the physiological benefits of High-Intensity Interval Training and how to implement it.",
    author: "David Rodriguez",
    date: "May 3, 2025",
    readTime: "10 min read",
    category: "Workouts",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Meal Prep 101: Save Time and Stay on Track",
    excerpt:
      "Learn efficient meal preparation strategies to support your fitness goals without spending hours in the kitchen.",
    author: "Lisa Thompson",
    date: "May 1, 2025",
    readTime: "9 min read",
    category: "Nutrition",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Recovery Techniques for Athletes: Maximize Your Rest Days",
    excerpt: "Discover the best practices for recovery to enhance performance and prevent injuries.",
    author: "James Wilson",
    date: "April 28, 2025",
    readTime: "11 min read",
    category: "Recovery",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <BlogHeader />

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Fitness & Nutrition Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                  <span>{post.category}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <BlogPagination currentPage={1} totalPages={5} />
      </div>
    </main>
  )
}
