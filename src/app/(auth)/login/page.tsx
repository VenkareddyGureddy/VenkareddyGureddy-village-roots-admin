"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const login = () => {
    setError("")

    if (email === "admin@vr.com" && password === "admin123") {
      document.cookie = "token=admin; path=/"
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[350px] rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-center">
          Village Roots Admin
        </h2>

        {error && (
          <p className="mb-3 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        <input
          className="mb-3 w-full rounded border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded border p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
        >
          Login
        </button>

        {/* Demo credentials */}
        <div className="mt-4 rounded bg-gray-100 p-3 text-sm">
          <p><strong>Email:</strong> admin@vr.com</p>
          <p><strong>Password:</strong> admin123</p>
        </div>
      </div>
    </div>
  )
}
