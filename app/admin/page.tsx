import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin-header"
import { AdminStats } from "@/components/admin-stats"
import { RecentPosts } from "@/components/recent-posts"
import { DraftPosts } from "@/components/draft-posts"
import { AiGenerationStatus } from "@/components/ai-generation-status"

export default function AdminDashboard() {
  // In a real app, you would check authentication here
  // const isAuthenticated = checkAuth();
  // if (!isAuthenticated) redirect('/login');

  return (
    <main className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your content and monitor site performance</p>
          </div>

          <div className="flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700">New Post</Button>
            <Button variant="outline">View Site</Button>
          </div>
        </div>

        <AdminStats />

        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="ai-generation">AI Generation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Manage your published content</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPosts />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Drafts</CardTitle>
                <CardDescription>Continue working on your draft posts</CardDescription>
              </CardHeader>
              <CardContent>
                <DraftPosts />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-generation" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>Monitor and manage AI-generated content</CardDescription>
              </CardHeader>
              <CardContent>
                <AiGenerationStatus />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Site traffic and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Analytics chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Content</CardTitle>
                <CardDescription>Your most viewed articles and pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Popular content metrics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
