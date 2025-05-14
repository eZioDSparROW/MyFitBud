import { NextResponse } from "next/server"
import { generateBlogPost, getGenerationSchedule, updateGenerationSchedule } from "@/lib/ai-blog-service"

// This endpoint would be called by a scheduled task (e.g., cron job)
// In Vercel, you can use Vercel Cron to schedule this endpoint

export async function POST(request: Request) {
  try {
    // Get the current schedule
    const schedule = await getGenerationSchedule()

    // Select a random category from the configured categories
    const categories = schedule.categories
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)]

    // Generate the blog post
    const post = await generateBlogPost(selectedCategory)

    // Update the next generation time
    const nextGenerationTime = new Date()

    if (schedule.frequency === "daily") {
      nextGenerationTime.setDate(nextGenerationTime.getDate() + 1)
      nextGenerationTime.setHours(8, 0, 0, 0) // 8:00 AM tomorrow
    } else if (schedule.frequency === "weekly") {
      nextGenerationTime.setDate(nextGenerationTime.getDate() + 7)
      nextGenerationTime.setHours(8, 0, 0, 0) // 8:00 AM next week
    }

    await updateGenerationSchedule({
      ...schedule,
      next_generation_time: nextGenerationTime.toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Scheduled blog post generated successfully",
      post,
      nextGenerationTime: nextGenerationTime.toISOString(),
    })
  } catch (error) {
    console.error("Error in scheduled blog generation:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate scheduled blog post",
      },
      { status: 500 },
    )
  }
}
