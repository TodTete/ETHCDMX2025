"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  useEffect(() => {
    // Use CSS classes and setTimeout for animations
    setTimeout(() => {
      document.querySelector(".not-found-icon")?.classList.add("animate-in")
      document.querySelector(".not-found-title")?.classList.add("animate-in")

      setTimeout(() => {
        document.querySelector(".not-found-description")?.classList.add("animate-in")

        setTimeout(() => {
          document.querySelector(".not-found-button")?.classList.add("animate-in")
        }, 200)
      }, 400)
    }, 100)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/90">
      <div className="not-found-icon mb-8 opacity-0 transform scale-50 rotate-45 transition-all duration-700">
        <AlertTriangle className="h-24 w-24 text-yellow-500" />
      </div>
      <h1 className="not-found-title text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent opacity-0 transform translate-y-12 transition-all duration-500">
        404 - Page Not Found
      </h1>
      <p className="not-found-description text-xl text-center text-muted-foreground mb-8 max-w-md opacity-0 transform translate-y-6 transition-all duration-500 delay-100">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        asChild
        className="not-found-button bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 opacity-0 transform translate-y-6 transition-all duration-500 delay-200"
        size="lg"
      >
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
