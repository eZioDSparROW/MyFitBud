import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin-header"
import { AiGenerationStatus } from "@/components/ai-generation-status"
import { GenerateBlogForm } from "@/components/generate-blog-form"

export default function AiGenerationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">AI Content Generation</h1>
            <p className="text-gray-600">Generate and manage AI-powered fitness content</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <AiGenerationStatus />
          </div>

          <div>
            <GenerateBlogForm />

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Generation Tips</CardTitle>
                <CardDescription>Get the most out of AI content</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      1
                    </span>
                    <span>Choose specific categories for more focused content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      2
                    </span>
                    <span>Always review AI-generated content before publishing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      3
                    </span>
                    <span>Add your own images and personal insights to enhance articles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      4
                    </span>
                    <span>Schedule posts at optimal times for your audience</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
