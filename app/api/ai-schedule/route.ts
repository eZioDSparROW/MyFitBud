import { NextResponse } from "next/server"
import { generateStructuredResponse } from "@/lib/ai-utils"

export interface SchedulePlan {
  summary: string
  weekly_schedule: {
    monday: {
      workout: string
      nutrition: string
      recovery: string
      notes: string
    }
    tuesday: {
      workout: string
      nutrition: string
      recovery: string
      notes: string
    }
    wednesday: {
      workout: string
      nutrition: string
      recovery: string
      notes: string
    }
    thursday: {
      workout: string
      nutrition: string
      recovery: string
      notes: string
    }
    friday: {
      workout: string
      nutrition: string
      recovery: string
      notes: string
    }
    saturday: {
      workout: string
      nutrition: string
      recovery: string
      notes: string
    }
    sunday: {
      workout: string
      nutrition: string
      recovery: string
      notes: string
    }
  }
  reminders: {
    daily: string[]
    weekly: string[]
    monthly: string[]
  }
  habit_building_tips: string[]
  consistency_strategies: string[]
}

export async function POST(request: Request) {
  try {
    const { goal, availability, preferences, current_fitness, lifestyle_factors } = await request.json()

    const prompt = `
      Create a personalized fitness schedule and reminder system with the following details:
      
      Goal: ${goal}
      Weekly Availability: ${availability || "Not specified"}
      Preferences: ${preferences || "No specific preferences"}
      Current Fitness Level: ${current_fitness || "Intermediate"}
      Lifestyle Factors: ${lifestyle_factors || "Not specified"}
      
      The schedule plan should include:
      1. A summary of the overall approach
      2. A detailed weekly schedule with workout, nutrition, and recovery recommendations for each day
      3. Important daily, weekly, and monthly reminders
      4. Habit building tips
      5. Strategies for maintaining consistency
    `

    const systemPrompt = `
      You are an expert fitness coach and scheduling specialist.
      Create a realistic, sustainable schedule that fits into the user's lifestyle.
      Balance workout intensity throughout the week and include adequate recovery.
      Provide specific, actionable reminders that will help the user stay on track.
      Focus on building sustainable habits rather than overwhelming the user with too many changes at once.
    `

    const result = await generateStructuredResponse<SchedulePlan>(prompt, systemPrompt)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error("Error generating schedule plan:", error)
    return NextResponse.json({ error: "Failed to generate schedule plan" }, { status: 500 })
  }
}
