import { NextResponse } from "next/server"
import { getTrendingFitnessTopics } from "@/lib/trending-blog-service"

export async function GET() {
  try {
    const topics = await getTrendingFitnessTopics()

    return NextResponse.json({
      success: true,
      topics,
    })
  } catch (error) {
    console.error("Error fetching trending topics:", error)
    return NextResponse.json({ error: "Failed to fetch trending topics" }, { status: 500 })
  }
}
