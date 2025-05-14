import { NextResponse } from "next/server"
import { generateStructuredResponse } from "@/lib/ai-utils"

export interface NutritionPlan {
  title: string
  description: string
  dailyCalories: number
  macroBreakdown: {
    protein: string
    carbs: string
    fats: string
  }
  mealPlan: {
    breakfast: {
      options: string[]
      notes: string
    }
    lunch: {
      options: string[]
      notes: string
    }
    dinner: {
      options: string[]
      notes: string
    }
    snacks: {
      options: string[]
      notes: string
    }
  }
  groceryList: string[]
  hydrationTips: string[]
  nutritionTips: string[]
  supplementRecommendations?: string[]
}

export async function POST(request: Request) {
  try {
    const { goal, age, gender, weight, height, activityLevel, dietaryRestrictions, allergies, preferences } =
      await request.json()

    const prompt = `
      Create a personalized nutrition plan with the following details:
      
      Goal: ${goal}
      Age: ${age || "Not specified"}
      Gender: ${gender || "Not specified"}
      Weight: ${weight || "Not specified"}
      Height: ${height || "Not specified"}
      Activity Level: ${activityLevel || "Moderate"}
      Dietary Restrictions: ${dietaryRestrictions || "None"}
      Allergies: ${allergies || "None"}
      Food Preferences: ${preferences || "No specific preferences"}
      
      The nutrition plan should include:
      1. A title and brief description
      2. Estimated daily calorie needs
      3. Recommended macro breakdown (protein, carbs, fats)
      4. Meal plan with options for breakfast, lunch, dinner, and snacks
      5. Grocery list of essential items
      6. Hydration recommendations
      7. General nutrition tips
      8. Optional supplement recommendations if appropriate
    `

    const systemPrompt = `
      You are a certified nutritionist with expertise in creating personalized meal plans.
      Provide evidence-based nutrition recommendations that are safe and effective.
      Tailor the plan to the user's specific needs, goals, and constraints.
      Include practical, easy-to-follow advice that promotes sustainable healthy eating habits.
    `

    const result = await generateStructuredResponse<NutritionPlan>(prompt, systemPrompt)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error("Error generating nutrition plan:", error)
    return NextResponse.json({ error: "Failed to generate nutrition plan" }, { status: 500 })
  }
}
