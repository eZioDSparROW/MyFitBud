"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, TrendingUp, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { trackEvent, AnalyticsEvents } from "@/lib/analytics"

interface TrendingTopic {
  title: string
  description: string
  keywords: string[]
  estimated_search_volume: string
  difficulty: "low" | "medium" | "high"
}

export function TrendingBlogGenerator() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
  const [publishImmediately, setPublishImmediately] = useState(false)
  const [generatedBlog, setGeneratedBlog] = useState<{ id: string; title: string } | null>(null)

  const fetchTrendingTopics = async () => {
    setIsLoading(true)
    setTrendingTopics([])
    setSelectedTopic(null)

    try {
      const response = await fetch("/api/trending-topics", {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch trending topics")
      }

      const data = await response.json()
      setTrendingTopics(data.topics)

      // Track the event
      trackEvent(AnalyticsEvents.TRENDING_TOPICS_FETCHED, {
        count: data.topics.length,
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error fetching trending topics",
        description: "There was an error fetching trending topics. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateBlog = async () => {
    if (selectedTopic === null) {
      toast({
        title: "No topic selected",
        description: "Please select a topic to generate a blog post.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedBlog(null)

    try {
      const topic = trendingTopics[selectedTopic]
      const response = await fetch("/api/generate-trending-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: topic.title,
          keywords: topic.keywords,
          publishImmediately,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate blog post")
      }

      const data = await response.json()
      setGeneratedBlog({
        id: data.post.id,
        title: data.post.title,
      })

      // Track the event
      trackEvent(AnalyticsEvents.BLOG_GENERATED, {
        title: data.post.title,
        publishImmediately,
        searchVolume: topic.estimated_search_volume,
        difficulty: topic.difficulty,
      })

      toast({
        title: "Blog post generated!",
        description: publishImmediately
          ? `"${data.post.title}" has been published.`
          : `"${data.post.title}" has been saved as a draft.`,
      })
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getVolumeColor = (volume: string) => {
    switch (volume) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trending Blog Generator</CardTitle>
          <CardDescription>
            Generate high-performing blog content based on trending health and fitness topics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Our system analyzes current trends in health and fitness to identify topics with high search potential and
              engagement. Generate SEO-optimized content that will attract more visitors to your site.
            </p>

            <div className="flex items-center space-x-2">
              <Switch id="publish-immediately" checked={publishImmediately} onCheckedChange={setPublishImmediately} />
              <Label htmlFor="publish-immediately">Publish immediately</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={fetchTrendingTopics} disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Trending Topics...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-4 w-4" />
                Find Trending Topics
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {trendingTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Select a Trending Topic</CardTitle>
            <CardDescription>Choose a topic to generate a fully optimized blog post</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedTopic === index ? "border-green-500 bg-green-50" : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedTopic(index)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{topic.title}</h3>
                    {selectedTopic === index && <Check className="h-5 w-5 text-green-500" />}
                  </div>
                  <p className="text-gray-600 mt-2">{topic.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className={getVolumeColor(topic.estimated_search_volume)}>
                      {topic.estimated_search_volume} volume
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                      {topic.difficulty} competition
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {topic.keywords.map((keyword, kidx) => (
                      <Badge key={kidx} variant="secondary" className="bg-gray-100">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={generateBlog}
              disabled={isGenerating || selectedTopic === null}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Blog Post...
                </>
              ) : (
                "Generate Blog Post"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {generatedBlog && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Blog post generated successfully!</h3>
                <p className="text-sm text-gray-600">
                  "{generatedBlog.title}" has been {publishImmediately ? "published" : "saved as a draft"}.
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" asChild>
                <a href={`/admin/posts/${generatedBlog.id}/edit`} target="_blank" rel="noopener noreferrer">
                  Edit Post
                </a>
              </Button>
              {!publishImmediately && (
                <Button variant="outline" size="sm">
                  Publish Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
