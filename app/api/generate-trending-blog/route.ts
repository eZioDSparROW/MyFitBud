import { NextResponse } from "next/server"
import { generateAndPublishTrendingBlog } from "@/lib/trending-blog-service"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { title, keywords, publishImmediately } = await request.json()

    // Get the current user (for author_id)
    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Generate and publish the blog post
    const result = await generateAndPublishTrendingBlog(title, keywords, user?.id, publishImmediately)

    return NextResponse.json({
      success: true,
      message: "Blog post generated successfully",
      post: result.post,
      imagePrompts: result.imagePrompts,
    })
  } catch (error) {
    console.error("Error generating trending blog:", error)
    return NextResponse.json({ error: "Failed to generate blog post" }, { status: 500 })
  }
}
