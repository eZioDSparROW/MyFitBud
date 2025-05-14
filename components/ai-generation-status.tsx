import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for AI generation
const scheduledPosts = [
  {
    id: 201,
    title: "The Benefits of Resistance Training for Women",
    status: "Scheduled",
    date: "May 16, 2025",
    category: "Workouts",
  },
  {
    id: 202,
    title: "Plant-Based Protein Sources for Muscle Building",
    status: "Scheduled",
    date: "May 17, 2025",
    category: "Nutrition",
  },
  {
    id: 203,
    title: "How to Improve Your Running Form",
    status: "Scheduled",
    date: "May 18, 2025",
    category: "Cardio",
  },
]

const generatedPosts = [
  {
    id: 301,
    title: "The Ultimate Guide to HIIT Workouts",
    status: "Generated",
    date: "May 15, 2025",
    category: "Workouts",
    quality: 92,
  },
  {
    id: 302,
    title: "Understanding Macronutrients: A Beginner's Guide",
    status: "Generated",
    date: "May 14, 2025",
    category: "Nutrition",
    quality: 88,
  },
  {
    id: 303,
    title: "10 Stretches to Improve Flexibility",
    status: "Generated",
    date: "May 13, 2025",
    category: "Recovery",
    quality: 95,
  },
]

export function AiGenerationStatus() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-medium mb-2">Daily Generation</h3>
          <div className="text-3xl font-bold text-green-600">1/1</div>
          <p className="text-sm text-gray-500">Posts generated today</p>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-medium mb-2">Weekly Generation</h3>
          <div className="text-3xl font-bold text-green-600">5/7</div>
          <p className="text-sm text-gray-500">Posts generated this week</p>
          <Progress value={71} className="h-2 mt-2" />
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-medium mb-2">Monthly Generation</h3>
          <div className="text-3xl font-bold text-green-600">15/30</div>
          <p className="text-sm text-gray-500">Posts generated this month</p>
          <Progress value={50} className="h-2 mt-2" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">AI Content Management</h3>
        <Button className="bg-green-600 hover:bg-green-700">Generate New Post</Button>
      </div>

      <Tabs defaultValue="scheduled">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="generated">Generated</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="generated">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>Quality Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {generatedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={`mr-2 ${post.quality >= 90 ? "text-green-600" : "text-amber-600"}`}>
                        {post.quality}%
                      </span>
                      <Progress
                        value={post.quality}
                        className={`h-2 w-16 ${post.quality >= 90 ? "bg-green-100" : "bg-amber-100"}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Publish
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-4 p-4 border rounded-lg">
            <div>
              <h4 className="font-medium mb-2">Content Generation Schedule</h4>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-green-100">
                  Daily
                </Button>
                <Button variant="outline" size="sm">
                  Weekly
                </Button>
                <Button variant="outline" size="sm">
                  Custom
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Content Categories</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="bg-green-100">
                  Workouts
                </Button>
                <Button variant="outline" size="sm" className="bg-green-100">
                  Nutrition
                </Button>
                <Button variant="outline" size="sm" className="bg-green-100">
                  Recovery
                </Button>
                <Button variant="outline" size="sm">
                  Mental Health
                </Button>
                <Button variant="outline" size="sm">
                  Supplements
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Content Length</h4>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Short (500-800 words)
                </Button>
                <Button variant="outline" size="sm" className="bg-green-100">
                  Medium (1000-1500 words)
                </Button>
                <Button variant="outline" size="sm">
                  Long (1800+ words)
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button className="bg-green-600 hover:bg-green-700">Save Settings</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
