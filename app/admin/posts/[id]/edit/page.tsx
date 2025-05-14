"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { BlogEditor } from "@/components/blog-editor"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the post from your API
    // For now, we'll simulate loading a post
    const fetchPost = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock post data
        setPost({
          id: params.id,
          title: "10 Essential Exercises for Building Core Strength",
          excerpt: "Discover the most effective exercises to strengthen your core and improve overall stability.",
          content: `
            <p>A strong core is essential for overall fitness and daily activities. It helps improve posture, reduce back pain, and enhance athletic performance.</p>
            
            <h2>Why Core Strength Matters</h2>
            
            <p>Your core muscles include not just your abs, but also your obliques, lower back, and pelvic muscles. These muscles work together to stabilize your spine and pelvis, allowing for efficient movement and force transfer throughout your body.</p>
            
            <p>A weak core can lead to poor posture, back pain, and increased risk of injury. By strengthening these muscles, you'll improve your overall fitness and make daily activities easier.</p>
            
            <h2>The 10 Essential Core Exercises</h2>
            
            <h3>1. Plank</h3>
            <p>The plank is a fundamental core exercise that engages multiple muscle groups simultaneously.</p>
            
            <h3>2. Dead Bug</h3>
            <p>The dead bug is excellent for core stability and coordination.</p>
          `,
          category: "Workouts",
          tags: ["Core Training", "Strength", "Fitness Tips"],
        })
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  const handleSave = (updatedPost: any) => {
    // In a real app, you would save to your API
    console.log("Saving post:", updatedPost)
    setPost(updatedPost)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto py-8 px-4">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <BlogEditor post={post} onSave={handleSave} />
        )}
      </div>
    </main>
  )
}
