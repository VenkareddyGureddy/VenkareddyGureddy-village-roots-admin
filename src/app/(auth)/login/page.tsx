"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    if (email === "admin@vr.com" && password === "admin123") {
      document.cookie = "token=admin; path=/"
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[350px] rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Village Roots Admin</h2>
        <input
          className="mb-3 w-full rounded border p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-4 w-full rounded border p-2"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="w-full rounded bg-green-600 py-2 text-white"
        >
          Login
        </button>
      </div>
    </div>
  )
}
