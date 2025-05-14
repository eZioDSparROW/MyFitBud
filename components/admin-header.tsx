import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, Bell, Settings, User, TrendingUp } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-green-600" />
          <Link href="/admin">
            <h1 className="text-xl font-bold text-green-600">iFitHub Admin</h1>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/admin" className="hover:text-green-600">
            Dashboard
          </Link>
          <Link href="/admin/posts" className="hover:text-green-600">
            Posts
          </Link>
          <Link href="/admin/trending-blogs" className="hover:text-green-600">
            <span className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Trending
            </span>
          </Link>
          <Link href="/admin/ai-generation" className="hover:text-green-600">
            Generation
          </Link>
          <Link href="/admin/pages" className="hover:text-green-600">
            Pages
          </Link>
          <Link href="/admin/settings" className="hover:text-green-600">
            Settings
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
