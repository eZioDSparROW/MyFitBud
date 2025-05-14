import { createServerClient } from "./supabase"
import { createBlogPost, type BlogPost } from "./blog-service"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface GenerationSchedule {
  frequency: "daily" | "weekly" | "custom"
  categories: string[]
  content_length: "short" | "medium" | "long"
  publish_immediately: boolean
  next_generation_time?: string
}

export async function getGenerationSchedule() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("ai_generation_schedule")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error fetching generation schedule:", error)
    throw error
  }

  return (
    data || {
      frequency: "daily",
      categories: ["Workouts", "Nutrition", "Recovery"],
      content_length: "medium",
      publish_immediately: false,
      next_generation_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }
  )
}

export async function updateGenerationSchedule(schedule: GenerationSchedule) {
  const supabase = createServerClient()

  // Calculate next generation time based on frequency
  const nextGenerationTime = new Date()

  if (schedule.frequency === "daily") {
    nextGenerationTime.setDate(nextGenerationTime.getDate() + 1)
    nextGenerationTime.setHours(8, 0, 0, 0) // 8:00 AM tomorrow
  } else if (schedule.frequency === "weekly") {
    nextGenerationTime.setDate(nextGenerationTime.getDate() + 7)
    nextGenerationTime.setHours(8, 0, 0, 0) // 8:00 AM next week
  }

  const { data, error } = await supabase
    .from("ai_generation_schedule")
    .upsert({
      frequency: schedule.frequency,
      categories: schedule.categories,
      content_length: schedule.content_length,
      publish_immediately: schedule.publish_immediately,
      next_generation_time: schedule.next_generation_time || nextGenerationTime.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error updating generation schedule:", error)
    throw error
  }

  return data
}

export async function generateBlogPost(category?: string, authorId?: string) {
  const supabase = createServerClient()

  let logEntry = null

  try {
    // Get the schedule to determine content length
    const schedule = await getGenerationSchedule()

    // If no category specified, pick a random one from the schedule
    const selectedCategory = category || schedule.categories[Math.floor(Math.random() * schedule.categories.length)]

    // Determine word count based on content length
    let wordCount = 1200
    if (schedule.content_length === "short") wordCount = 800
    if (schedule.content_length === "long") wordCount = 1800

    // Create the prompt
    const prompt = `
      Generate a comprehensive, engaging, and informative fitness blog post about ${selectedCategory}.
      
      The blog post should:
      1. Have a catchy title that includes relevant keywords for SEO
      2. Be approximately ${wordCount} words in length
      3. Include an introduction that hooks the reader
      4. Have 5-7 main sections with descriptive subheadings
      5. Include actionable tips and advice
      6. Cite scientific research where appropriate
      7. Have a conclusion that summarizes key points
      8. Include a call to action at the end
      
      The tone should be professional but conversational, and the content should be accurate, 
      evidence-based, and valuable to readers interested in fitness and health.
      
      Format your response as a JSON object with the following structure:
      {
        "title": "The blog post title",
        "content": "The full HTML content of the blog post",
        "excerpt": "A 150-character summary of the post",
        "tags": ["tag1", "tag2", "tag3"]
      }
    `

    // Log the generation attempt
    const { data: logData } = await supabase
      .from("ai_generation_logs")
      .insert({
        prompt,
        status: "processing",
      })
      .select()
      .single()

    logEntry = logData

    // Generate the blog post using the AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    // Parse the JSON response
    const blogData = JSON.parse(text)

    // Create a slug from the title
    const slug = blogData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    // Get category ID
    let categoryId = null
    const { data: categoryData } = await supabase
      .from("categories")
      .select("id")
      .ilike("name", `%${selectedCategory}%`)
      .limit(1)
      .single()

    if (categoryData) {
      categoryId = categoryData.id
    } else {
      // Create the category if it doesn't exist
      const categorySlug = selectedCategory
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      const { data: newCategory } = await supabase
        .from("categories")
        .insert({
          name: selectedCategory,
          slug: categorySlug,
          description: `Articles about ${selectedCategory}`,
        })
        .select()
        .single()

      if (newCategory) {
        categoryId = newCategory.id
      }
    }

    // Create the blog post
    const blogPost: BlogPost = {
      title: blogData.title,
      slug,
      excerpt: blogData.excerpt,
      content: blogData.content,
      author_id: authorId,
      category_id: categoryId,
      status: schedule.publish_immediately ? "published" : "draft",
      is_ai_generated: true,
      tags: blogData.tags,
      published_at: schedule.publish_immediately ? new Date().toISOString() : undefined,
    }

    const createdPost = await createBlogPost(blogPost)

    // Update the log entry
    await supabase
      .from("ai_generation_logs")
      .update({
        blog_post_id: createdPost.id,
        status: "completed",
      })
      .eq("id", logEntry.id)

    return createdPost
  } catch (error) {
    console.error("Error generating blog post:", error)

    // Log the error
    if (logEntry?.id) {
      await supabase
        .from("ai_generation_logs")
        .update({
          status: "failed",
          error_message: error.message || "Unknown error",
        })
        .eq("id", logEntry.id)
    }

    throw error
  }
}

export async function getGenerationLogs(limit = 10) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("ai_generation_logs")
    .select("*, blog_posts(id, title, status)")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching generation logs:", error)
    throw error
  }

  return data
}
