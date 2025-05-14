import { createServerClient } from "./supabase"

export interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  author_id?: string
  category_id?: string
  status: "draft" | "published"
  is_ai_generated: boolean
  view_count?: number
  published_at?: string
  created_at?: string
  updated_at?: string
  tags?: string[]
}

export async function getAllBlogPosts(page = 1, limit = 10, status = "published") {
  const supabase = createServerClient()
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from("blog_posts")
    .select("*, users(first_name, last_name), categories(name, slug)", { count: "exact" })
    .eq("status", status)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching blog posts:", error)
    throw error
  }

  // Get tags for each post
  const postsWithTags = await Promise.all(
    data.map(async (post) => {
      const { data: tagData } = await supabase
        .from("blog_post_tags")
        .select("tags(id, name, slug)")
        .eq("blog_post_id", post.id)

      return {
        ...post,
        tags: tagData?.map((t) => t.tags) || [],
      }
    }),
  )

  return {
    posts: postsWithTags,
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, users(first_name, last_name), categories(name, slug)")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching blog post:", error)
    throw error
  }

  // Get tags for the post
  const { data: tagData } = await supabase
    .from("blog_post_tags")
    .select("tags(id, name, slug)")
    .eq("blog_post_id", data.id)

  return {
    ...data,
    tags: tagData?.map((t) => t.tags) || [],
  }
}

export async function createBlogPost(post: BlogPost) {
  const supabase = createServerClient()

  // Create slug from title if not provided
  if (!post.slug) {
    post.slug = post.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }

  // Insert the blog post
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      author_id: post.author_id,
      category_id: post.category_id,
      status: post.status,
      is_ai_generated: post.is_ai_generated,
      published_at: post.status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating blog post:", error)
    throw error
  }

  // Add tags if provided
  if (post.tags && post.tags.length > 0) {
    for (const tagName of post.tags) {
      // First check if tag exists
      const { data: existingTag } = await supabase.from("tags").select("id").eq("name", tagName).single()

      let tagId

      if (!existingTag) {
        // Create tag if it doesn't exist
        const slug = tagName
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")
        const { data: newTag, error: tagError } = await supabase
          .from("tags")
          .insert({ name: tagName, slug })
          .select()
          .single()

        if (tagError) {
          console.error("Error creating tag:", tagError)
          continue
        }

        tagId = newTag.id
      } else {
        tagId = existingTag.id
      }

      // Associate tag with post
      await supabase.from("blog_post_tags").insert({ blog_post_id: data.id, tag_id: tagId })
    }
  }

  return data
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>) {
  const supabase = createServerClient()

  // Update the blog post
  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      ...post,
      updated_at: new Date().toISOString(),
      published_at: post.status === "published" && !post.published_at ? new Date().toISOString() : post.published_at,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating blog post:", error)
    throw error
  }

  // Update tags if provided
  if (post.tags) {
    // First remove all existing tags
    await supabase.from("blog_post_tags").delete().eq("blog_post_id", id)

    // Then add the new tags
    for (const tagName of post.tags) {
      // Check if tag exists
      const { data: existingTag } = await supabase.from("tags").select("id").eq("name", tagName).single()

      let tagId

      if (!existingTag) {
        // Create tag if it doesn't exist
        const slug = tagName
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")
        const { data: newTag, error: tagError } = await supabase
          .from("tags")
          .insert({ name: tagName, slug })
          .select()
          .single()

        if (tagError) {
          console.error("Error creating tag:", tagError)
          continue
        }

        tagId = newTag.id
      } else {
        tagId = existingTag.id
      }

      // Associate tag with post
      await supabase.from("blog_post_tags").insert({ blog_post_id: id, tag_id: tagId })
    }
  }

  return data
}

export async function deleteBlogPost(id: string) {
  const supabase = createServerClient()

  // Delete the blog post (this will cascade delete the blog_post_tags entries)
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    throw error
  }

  return true
}

export async function incrementViewCount(id: string) {
  const supabase = createServerClient()

  const { error } = await supabase.rpc("increment_view_count", { post_id: id })

  if (error) {
    console.error("Error incrementing view count:", error)
    // Don't throw error for view count - non-critical operation
  }
}
