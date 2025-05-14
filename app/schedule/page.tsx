import { AiSchedulePlanner } from "@/components/ai-schedule-planner"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SchedulePage() {
  return (
    <main className="min-h-screen">
      <header className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-green-600" />
          <Link href="/">
            <h1 className="text-xl font-bold text-green-600">iFitHub</h1>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <Link href="/workouts" className="hover:text-green-600">
            Workouts
          </Link>
          <Link href="/nutrition" className="hover:text-green-600">
            Nutrition
          </Link>
          <Link href="/blog" className="hover:text-green-600">
            Blog
          </Link>
          <Link href="/login">
            <Button className="bg-green-600 hover:bg-green-700">Login</Button>
          </Link>
        </nav>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Schedule & Reminders</h1>
          <p className="text-gray-600 mb-8">
            Create a personalized fitness schedule with smart reminders to help you stay consistent and reach your
            goals.
          </p>

          <AiSchedulePlanner />
        </div>
      </div>
    </main>
  )
}
