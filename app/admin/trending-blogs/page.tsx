import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin-header"
import { TrendingBlogGenerator } from "@/components/trending-blog-generator"

export default function TrendingBlogsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Trending Blog Generator</h1>
            <p className="text-gray-600">Create high-performing content based on trending fitness topics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <TrendingBlogGenerator />
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>SEO Benefits</CardTitle>
                <CardDescription>Why trending content matters</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      1
                    </span>
                    <span>Higher search rankings for trending keywords</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      2
                    </span>
                    <span>Increased organic traffic from search engines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      3
                    </span>
                    <span>Better engagement metrics (time on page, bounce rate)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      4
                    </span>
                    <span>More social shares and backlinks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      5
                    </span>
                    <span>Establishes your site as an authority in the fitness niche</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Content Optimization</CardTitle>
                <CardDescription>What our generator includes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>Strategic keyword placement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>SEO-optimized headings and structure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>FAQ section with schema markup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>Meta descriptions and title tags</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>Image suggestions with alt text</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>Internal linking opportunities</span>
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
