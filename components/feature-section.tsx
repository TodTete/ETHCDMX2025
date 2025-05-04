"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Vote, Globe, Shield, Zap } from "lucide-react"

export default function FeatureSection() {
  useEffect(() => {
    // Use CSS for animations instead of anime.js
    const cards = document.querySelectorAll(".feature-card")
    cards.forEach((card, index) => {
      setTimeout(
        () => {
          ;(card as HTMLElement).style.opacity = "1"
          ;(card as HTMLElement).style.transform = "translateY(0)"
        },
        150 * index + 500,
      )
    })
  }, [])

  const features = [
    {
      icon: <Vote className="h-8 w-8 text-purple-500" />,
      title: "Decentralized Voting",
      description: "Create and participate in polls with complete transparency and immutability.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Cross-Chain Compatibility",
      description: "Seamlessly switch between Scroll and Arbitrum networks.",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: "Secure & Transparent",
      description: "All votes are recorded on the blockchain, ensuring integrity and auditability.",
    },
    {
      icon: <Zap className="h-8 w-8 text-violet-500" />,
      title: "Fast & Responsive",
      description: "Enjoy a smooth user experience with real-time updates and animations.",
    },
  ]

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-8 animate-fade-in">Why Use Our Polling System?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="feature-card border-none shadow-md hover:shadow-lg transition-all duration-300 bg-background/80 backdrop-blur-sm opacity-0"
          >
            <CardContent className="flex items-start p-6">
              <div className="mr-4 p-3 rounded-full bg-primary/10">{feature.icon}</div>
              <div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
