import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell } from "lucide-react"

export function BlogHeader() {
  return (
    <header className="container mx-auto py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Dumbbell className="h-6 w-6 text-green-600" />
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
        <Link href="/blog" className="text-green-600 font-medium">
          Blog
        </Link>
        <Link href="/login">
          <Button className="bg-green-600 hover:bg-green-700">Login</Button>
        </Link>
      </nav>
    </header>
  )
}
