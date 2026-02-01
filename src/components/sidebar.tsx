"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Leaf,
} from "lucide-react"
import { cn } from "@/lib/utils" // Make sure you have this utility

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Users", href: "/users", icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-">
      {/* Sticky Header */}
      <Link
        href="/dashboard"
        className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-border bg-custom-bg px-4"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3d8159]">
          <Leaf className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold font-serif text-gray-900">
          Village Roots
        </h1>
      </Link>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-gray-200 text-gray-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon size={20} aria-hidden="true" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}