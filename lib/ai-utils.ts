import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateAIResponse(prompt: string, systemPrompt?: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system: systemPrompt,
    })

    return { success: true, data: text }
  } catch (error) {
    console.error("Error generating AI response:", error)
    return { success: false, error: "Failed to generate response. Please try again." }
  }
}

export async function generateStructuredResponse<T>(
  prompt: string,
  systemPrompt?: string,
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `${prompt}\n\nRespond with a valid JSON object only.`,
      system:
        systemPrompt ||
        "You are a fitness and nutrition AI assistant. Provide detailed, accurate, and helpful responses in JSON format.",
    })

    // Parse the JSON response
    const data = JSON.parse(text) as T

    return { success: true, data }
  } catch (error) {
    console.error("Error generating structured AI response:", error)
    return { success: false, error: "Failed to generate response. Please try again." }
  }
}
