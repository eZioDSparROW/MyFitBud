import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogHeader } from "@/components/blog-header"
import { Clock, User, Calendar, Tag } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import { RelatedPosts } from "@/components/related-posts"

// Mock data for a single blog post
const blogPost = {
  id: 1,
  title: "10 Essential Exercises for Building Core Strength",
  content: `
    <p class="mb-4">A strong core is essential for overall fitness and daily activities. It helps improve posture, reduce back pain, and enhance athletic performance. In this article, we'll explore ten effective exercises to strengthen your core muscles.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Why Core Strength Matters</h2>
    
    <p class="mb-4">Your core muscles include not just your abs, but also your obliques, lower back, and pelvic muscles. These muscles work together to stabilize your spine and pelvis, allowing for efficient movement and force transfer throughout your body.</p>
    
    <p class="mb-4">A weak core can lead to poor posture, back pain, and increased risk of injury. By strengthening these muscles, you'll improve your overall fitness and make daily activities easier.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">The 10 Essential Core Exercises</h2>
    
    <h3 class="text-xl font-bold mt-6 mb-3">1. Plank</h3>
    <p class="mb-4">The plank is a fundamental core exercise that engages multiple muscle groups simultaneously. To perform a proper plank:</p>
    <ul class="list-disc pl-6 mb-4">
      <li>Start in a push-up position with your forearms on the ground</li>
      <li>Keep your body in a straight line from head to heels</li>
      <li>Engage your core by pulling your navel toward your spine</li>
      <li>Hold for 30-60 seconds, gradually increasing duration as you get stronger</li>
    </ul>
    
    <h3 class="text-xl font-bold mt-6 mb-3">2. Dead Bug</h3>
    <p class="mb-4">The dead bug is excellent for core stability and coordination:</p>
    <ul class="list-disc pl-6 mb-4">
      <li>Lie on your back with arms extended toward the ceiling</li>
      <li>Bring knees up to a 90-degree angle</li>
      <li>Slowly lower opposite arm and leg while keeping your lower back pressed into the floor</li>
      <li>Return to starting position and repeat with the other side</li>
      <li>Perform 10-12 repetitions per side</li>
    </ul>
    
    <h3 class="text-xl font-bold mt-6 mb-3">3. Bird Dog</h3>
    <p class="mb-4">This exercise improves balance and coordination while strengthening your core:</p>
    <ul class="list-disc pl-6 mb-4">
      <li>Start on all fours with hands under shoulders and knees under hips</li>
      <li>Simultaneously extend your right arm forward and left leg backward</li>
      <li>Keep your hips level and core engaged</li>
      <li>Return to starting position and repeat with the opposite arm and leg</li>
      <li>Perform 10-12 repetitions per side</li>
    </ul>
    
    <h3 class="text-xl font-bold mt-6 mb-3">4. Russian Twists</h3>
    <p class="mb-4">Russian twists target your obliques and rotational strength:</p>
    <ul class="list-disc pl-6 mb-4">
      <li>Sit on the floor with knees bent and feet lifted slightly off the ground</li>
      <li>Lean back slightly to engage your core</li>
      <li>Clasp your hands together and rotate your torso from side to side</li>
      <li>For added difficulty, hold a weight or medicine ball</li>
      <li>Perform 15-20 rotations total</li>
    </ul>
    
    <h3 class="text-xl font-bold mt-6 mb-3">5. Mountain Climbers</h3>
    <p class="mb-4">Mountain climbers combine core strengthening with cardiovascular benefits:</p>
    <ul class="list-disc pl-6 mb-4">
      <li>Start in a high plank position with hands under shoulders</li>
      <li>Drive one knee toward your chest, then quickly switch legs</li>
      <li>Maintain a tight core and flat back throughout the movement</li>
      <li>Continue alternating legs at a brisk pace</li>
      <li>Perform for 30-60 seconds</li>
    </ul>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Implementing These Exercises</h2>
    
    <p class="mb-4">For best results, incorporate these exercises into your routine 2-3 times per week. You can perform them as a dedicated core workout or add them to your existing fitness regimen.</p>
    
    <p class="mb-4">Remember to focus on proper form rather than speed or repetitions. Quality movement is essential for targeting the right muscles and preventing injury.</p>
    
    <p class="mb-4">As you progress, gradually increase the duration, repetitions, or resistance to continue challenging your core muscles.</p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
    
    <p class="mb-4">Building core strength is a vital component of any fitness program. By incorporating these ten essential exercises into your routine, you'll develop a stronger, more stable core that will benefit you in all aspects of life.</p>
    
    <p class="mb-4">Start with modifications if needed, and gradually progress as your strength improves. Consistency is key—even a short core workout done regularly will yield significant results over time.</p>
  `,
  author: "Sarah Johnson",
  date: "May 10, 2025",
  readTime: "8 min read",
  category: "Workouts",
  tags: ["Core Training", "Strength", "Fitness Tips"],
  image: "/placeholder.svg?height=400&width=800",
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen">
      <BlogHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="text-green-600 hover:underline mb-4 inline-block">
            ← Back to Blog
          </Link>

          <h1 className="text-4xl font-bold mt-4 mb-6">{blogPost.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{blogPost.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blogPost.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span>{blogPost.category}</span>
            </div>
          </div>

          <img
            src={blogPost.image || "/placeholder.svg"}
            alt={blogPost.title}
            className="w-full h-auto rounded-lg mb-8"
          />

          <AdBanner position="top" />

          <div className="prose prose-green max-w-none my-8" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

          <AdBanner position="bottom" />

          <div className="flex flex-wrap gap-2 mt-8">
            {blogPost.tags.map((tag, index) => (
              <Link href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`} key={index}>
                <Button variant="outline" size="sm">
                  #{tag}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <RelatedPosts currentPostId={blogPost.id} />
      </div>
    </main>
  )
}
