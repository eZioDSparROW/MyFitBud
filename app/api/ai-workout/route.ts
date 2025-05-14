import { NextResponse } from "next/server"
import { generateStructuredResponse } from "@/lib/ai-utils"

export interface WorkoutPlan {
  title: string
  description: string
  level: "beginner" | "intermediate" | "advanced"
  duration: string
  frequency: string
  goal: string
  exercises: {
    name: string
    sets: number
    reps: string
    rest: string
    description: string
    tips: string[]
  }[]
  warmup: string[]
  cooldown: string[]
  progressionTips: string[]
}

export async function POST(request: Request) {
  try {
    const { goal, level, equipment, timeAvailable, injuries, preferences } = await request.json()

    const prompt = `
      Create a personalized workout plan with the following details:
      
      Goal: ${goal}
      Fitness Level: ${level}
      Available Equipment: ${equipment || "None/Minimal"}
      Time Available: ${timeAvailable || "30-60 minutes"}
      Injuries or Limitations: ${injuries || "None"}
      Preferences: ${preferences || "No specific preferences"}
      
      The workout plan should include:
      1. A title and brief description
      2. Recommended frequency
      3. Total duration
      4. A list of exercises with sets, reps, rest periods, descriptions, and form tips
      5. Warm-up routine
      6. Cool-down routine
      7. Progression tips
    `

    const systemPrompt = `
      You are a certified personal trainer with expertise in creating personalized workout plans.
      Provide evidence-based exercise recommendations that are safe and effective.
      Tailor the workout to the user's specific needs, goals, and constraints.
      Include detailed instructions for proper form to prevent injuries.
    `

    const result = await generateStructuredResponse<WorkoutPlan>(prompt, systemPrompt)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error("Error generating workout plan:", error)
    return NextResponse.json({ error: "Failed to generate workout plan" }, { status: 500 })
  }
}
