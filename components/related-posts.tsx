import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for related posts
const relatedPosts = [
  {
    id: 2,
    title: "7 Dynamic Warm-Up Exercises for Better Workouts",
    excerpt: "Prepare your body properly with these effective warm-up routines.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: 3,
    title: "How to Progress Your Core Training Safely",
    excerpt: "Learn the right way to advance your core workouts without risking injury.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: 4,
    title: "Core Strength for Runners: Why It Matters",
    excerpt: "Discover how a strong core can improve your running performance and prevent injuries.",
    image: "/placeholder.svg?height=150&width=300",
  },
]

interface RelatedPostsProps {
  currentPostId: number
}

export function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-32 object-cover" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${post.id}`} className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Read Article
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
