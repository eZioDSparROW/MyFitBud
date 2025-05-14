"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Categories for fitness content
const categories = [
  "Strength Training",
  "Cardio Workouts",
  "Nutrition",
  "Weight Loss",
  "Muscle Building",
  "Recovery",
  "Flexibility",
  "Mental Health",
  "Supplements",
  "Fitness Technology",
  "random",
]

export function GenerateBlogForm() {
  const [category, setCategory] = useState("random")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/ai-blog-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate blog post")
      }

      const data = await response.json()

      toast({
        title: "Blog post generated!",
        description: `"${data.title}" has been created and saved as a draft.`,
      })

      // In a real app, you would redirect to the edit page for the new post
      // or update the UI to show the new post
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Generation failed",
        description: "There was an error generating the blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate New Blog Post</CardTitle>
        <CardDescription>Use AI to create a new fitness blog post</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "random" ? "Random Category" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isGenerating} className="bg-green-600 hover:bg-green-700">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Blog Post"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
