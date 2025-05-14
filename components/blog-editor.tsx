"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface BlogEditorProps {
  post?: {
    id?: string
    title: string
    content: string
    excerpt: string
    category: string
    tags: string[]
  }
  onSave?: (post: any) => void
}

export function BlogEditor({ post, onSave }: BlogEditorProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [category, setCategory] = useState(post?.category || "")
  const [tags, setTags] = useState(post?.tags?.join(", ") || "")
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // In a real app, you would save to your database
      // For now, we'll just simulate a save
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const savedPost = {
        id: post?.id || `post-${Date.now()}`,
        title,
        content,
        excerpt,
        category,
        tags: tags.split(",").map((tag) => tag.trim()),
        updatedAt: new Date().toISOString(),
      }

      if (onSave) {
        onSave(savedPost)
      }

      toast({
        title: "Post saved",
        description: "Your blog post has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving post:", error)
      toast({
        title: "Save failed",
        description: "There was an error saving your post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{post?.id ? "Edit Post" : "New Post"}</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button variant="outline">Publish</Button>
        </div>
      </div>

      {previewMode ? (
        <Card>
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-6">{excerpt}</p>
            <div className="prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the post"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (HTML)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Post content in HTML format"
              rows={20}
              className="font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Nutrition, Workouts"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., protein, muscle building, diet"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
