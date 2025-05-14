import { generateStructuredResponse } from "@/lib/ai-utils"
import { createBlogPost, type BlogPost } from "@/lib/blog-service"
import { createServerClient } from "@/lib/supabase"

export interface TrendingTopicResponse {
  topics: {
    title: string
    description: string
    keywords: string[]
    estimated_search_volume: string
    difficulty: "low" | "medium" | "high"
  }[]
}

export interface BlogGenerationParams {
  title: string
  keywords: string[]
  wordCount: number
  includeFAQ: boolean
  targetAudience: string
  contentType: "informational" | "how-to" | "listicle"
}

export interface GeneratedBlogContent {
  title: string
  slug: string
  excerpt: string
  content: string
  meta_description: string
  keywords: string[]
  tags: string[]
  faq_section?: {
    questions: {
      question: string
      answer: string
    }[]
  }
  image_prompts: string[]
}

export async function getTrendingFitnessTopics() {
  try {
    const prompt = `
      Identify 5 currently trending health and fitness topics that would make excellent blog posts.
      
      For each topic:
      1. Create a compelling blog title
      2. Write a brief description of what the article would cover
      3. List 5-7 relevant SEO keywords
      4. Estimate the search volume (high, medium, or low)
      5. Rate the competition difficulty (high, medium, or low)
      
      Focus on topics that are:
      - Currently trending or seasonal
      - Have good search potential
      - Address common pain points or questions
      - Would be valuable to fitness enthusiasts
    `

    const systemPrompt = `
      You are an SEO and content strategy expert specializing in the health and fitness industry.
      Identify trending topics with strong search potential and relatively low competition.
      Focus on topics that would genuinely help fitness enthusiasts and have potential for high engagement.
      Base your recommendations on current trends, seasonal interests, and evergreen topics with consistent search volume.
    `

    const result = await generateStructuredResponse<TrendingTopicResponse>(prompt, systemPrompt)

    if (!result.success) {
      throw new Error(result.error)
    }

    return result.data.topics
  } catch (error) {
    console.error("Error getting trending fitness topics:", error)
    throw error
  }
}

export async function generateSEOBlogContent(params: BlogGenerationParams) {
  try {
    const { title, keywords, wordCount, includeFAQ, targetAudience, contentType } = params

    const prompt = `
      Create a comprehensive, SEO-optimized blog post with the following details:
      
      Title: ${title}
      Target Keywords: ${keywords.join(", ")}
      Word Count: ${wordCount || 1800}
      Target Audience: ${targetAudience || "Fitness enthusiasts"}
      Content Type: ${contentType || "informational"}
      Include FAQ Section: ${includeFAQ ? "Yes" : "No"}
      
      The blog post should:
      1. Have an engaging introduction that hooks the reader
      2. Include proper H2 and H3 headings structured for SEO
      3. Incorporate the target keywords naturally throughout the content
      4. Include practical, actionable advice
      5. Have a compelling conclusion with a call to action
      ${includeFAQ ? "6. Include a FAQ section with 5 common questions and detailed answers related to the topic" : ""}
      7. Suggest 3 image prompts that would complement the article
      
      Format your response as a JSON object with the following structure:
      {
        "title": "The final blog post title",
        "slug": "seo-friendly-url-slug",
        "excerpt": "A compelling 150-character summary of the post",
        "content": "The full HTML content of the blog post",
        "meta_description": "SEO meta description under 160 characters",
        "keywords": ["keyword1", "keyword2", ...],
        "tags": ["tag1", "tag2", ...],
        "faq_section": {
          "questions": [
            {
              "question": "Common question 1?",
              "answer": "Detailed answer 1"
            },
            ...
          ]
        },
        "image_prompts": ["Image prompt 1", "Image prompt 2", "Image prompt 3"]
      }
    `

    const systemPrompt = `
      You are an expert SEO content writer specializing in health and fitness.
      Create engaging, valuable content that ranks well in search engines while providing genuine value to readers.
      Follow SEO best practices including:
      - Proper heading structure (H2, H3)
      - Strategic keyword placement (title, headings, first paragraph, conclusion)
      - Optimal content length and readability
      - Internal linking opportunities
      - Schema-ready FAQ section when requested
      
      Write in a conversational yet authoritative tone. Include scientific backing where appropriate.
      Focus on creating content that genuinely helps the reader while being optimized for search engines.
    `

    const result = await generateStructuredResponse<GeneratedBlogContent>(prompt, systemPrompt)

    if (!result.success) {
      throw new Error(result.error)
    }

    return result.data
  } catch (error) {
    console.error("Error generating SEO blog content:", error)
    throw error
  }
}

export async function generateAndPublishTrendingBlog(
  topic: string,
  keywords: string[],
  authorId?: string,
  publishImmediately = false,
) {
  try {
    // Generate the blog content
    const blogContent = await generateSEOBlogContent({
      title: topic,
      keywords,
      wordCount: 1800,
      includeFAQ: true,
      targetAudience: "Fitness enthusiasts",
      contentType: "informational",
    })

    // Get category ID
    const supabase = createServerClient()
    let categoryId = null
    const { data: categoryData } = await supabase
      .from("categories")
      .select("id")
      .ilike("name", `%${keywords[0]}%`)
      .limit(1)
      .single()

    if (categoryData) {
      categoryId = categoryData.id
    }

    // Create the blog post
    const blogPost: BlogPost = {
      title: blogContent.title,
      slug: blogContent.slug,
      excerpt: blogContent.excerpt,
      content: blogContent.content,
      author_id: authorId,
      category_id: categoryId,
      status: publishImmediately ? "published" : "draft",
      is_ai_generated: true,
      tags: blogContent.tags,
      published_at: publishImmediately ? new Date().toISOString() : undefined,
    }

    const createdPost = await createBlogPost(blogPost)

    // Log the image prompts for later use
    await supabase.from("blog_image_prompts").insert({
      blog_post_id: createdPost.id,
      prompts: blogContent.image_prompts,
    })

    // Store SEO metadata
    await supabase.from("blog_seo_metadata").insert({
      blog_post_id: createdPost.id,
      meta_description: blogContent.meta_description,
      keywords: blogContent.keywords,
      has_faq: blogContent.faq_section ? true : false,
    })

    return {
      post: createdPost,
      imagePrompts: blogContent.image_prompts,
    }
  } catch (error) {
    console.error("Error generating and publishing trending blog:", error)
    throw error
  }
}
