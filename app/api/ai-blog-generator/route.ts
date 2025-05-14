import { NextResponse } from "next/server"
import { generateBlogPost } from "@/lib/ai-blog-service"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { category = "random" } = await request.json()

    // Get the current user (for author_id)
    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Generate the blog post
    const post = await generateBlogPost(category === "random" ? undefined : category, user?.id)

    return NextResponse.json({
      success: true,
      message: "Blog post generated successfully",
      post,
    })
  } catch (error) {
    console.error("Error generating blog post:", error)
    return NextResponse.json({ error: "Failed to generate blog post" }, { status: 500 })
  }
}
