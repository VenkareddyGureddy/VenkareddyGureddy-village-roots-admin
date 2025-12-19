"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Users, Leaf } from "lucide-react"
import clsx from "clsx"

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Users", href: "/users", icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()

  // Better active check: supports nested routes
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <aside className="w-64 border-r bg-[#fafafa] p-4 flex flex-col">
      {/* ====================== Logo Header ====================== */}
      <Link href="/dashboard" className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-lg bg-[#e5ebe8] flex items-center justify-center">
          <Leaf className="w-6 h-6 text-[#88a795]" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">
          Village Roots
        </h1>
      </Link>

      {/* ====================== Navigation ====================== */}
      <nav className="space-y-1 flex-1">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-gray-200 text-gray-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}