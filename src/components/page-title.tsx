"use client"

import { usePathname } from "next/navigation"

export default function PageTitle() {
  const path = usePathname()
  const title = path.split("/").pop()?.toUpperCase()

  return <h2 className="text-xl font-semibold">{title}</h2>
}
