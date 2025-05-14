import { AiNutritionPlanner } from "@/components/ai-nutrition-planner"
import { Utensils } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NutritionPage() {
  return (
    <main className="min-h-screen">
      <header className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-green-600" />
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
          <Link href="/nutrition" className="text-green-600 font-medium">
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
          <h1 className="text-3xl font-bold mb-2">Nutrition Planning</h1>
          <p className="text-gray-600 mb-8">
            Get personalized meal plans and nutrition advice tailored to your specific goals, preferences, and dietary
            needs.
          </p>

          <AiNutritionPlanner />
        </div>
      </div>
    </main>
  )
}
