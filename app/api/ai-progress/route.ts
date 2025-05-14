import { NextResponse } from "next/server"
import { generateStructuredResponse } from "@/lib/ai-utils"

export interface ProgressAnalysis {
  summary: string
  strengths: string[]
  areas_to_improve: string[]
  recommendations: {
    workout_adjustments: string[]
    nutrition_adjustments: string[]
    recovery_suggestions: string[]
  }
  milestone_predictions: {
    short_term: string
    medium_term: string
    long_term: string
  }
  motivation_tips: string[]
}

export async function POST(request: Request) {
  try {
    const { goal, current_stats, previous_stats, workout_consistency, nutrition_adherence, challenges, timeframe } =
      await request.json()

    const prompt = `
      Analyze fitness progress and provide recommendations based on the following information:
      
      Goal: ${goal}
      Current Stats: ${current_stats}
      Previous Stats (${timeframe || "4 weeks"} ago): ${previous_stats}
      Workout Consistency: ${workout_consistency || "Not specified"}
      Nutrition Plan Adherence: ${nutrition_adherence || "Not specified"}
      Challenges Faced: ${challenges || "None mentioned"}
      
      Provide a comprehensive analysis including:
      1. A summary of progress
      2. Strengths to build upon
      3. Areas that need improvement
      4. Specific recommendations for workout, nutrition, and recovery adjustments
      5. Realistic milestone predictions for short-term (1 month), medium-term (3 months), and long-term (6+ months)
      6. Motivational tips to maintain momentum
    `

    const systemPrompt = `
      You are an expert fitness coach and data analyst specializing in tracking and analyzing fitness progress.
      Provide thoughtful, data-driven insights based on the user's information.
      Be encouraging but honest about areas that need improvement.
      Make specific, actionable recommendations that will help the user reach their goals more effectively.
      Base your analysis on established exercise science and nutrition principles.
    `

    const result = await generateStructuredResponse<ProgressAnalysis>(prompt, systemPrompt)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error("Error generating progress analysis:", error)
    return NextResponse.json({ error: "Failed to generate progress analysis" }, { status: 500 })
  }
}
