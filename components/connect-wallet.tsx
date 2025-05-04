"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Wallet } from "lucide-react"
import { useEffect, useRef } from "react"
// Remove the anime.js import
// Remove this line:
// import anime from "animejs/lib/anime.es.js"

type ConnectWalletProps = {
  isConnected: boolean
  account: string
  isLoading: boolean
  onConnect: () => void
}

export default function ConnectWallet({ isConnected, account, isLoading, onConnect }: ConnectWalletProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Format address to show only first 6 and last 4 characters
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Replace the useEffect animation with CSS classes
  useEffect(() => {
    if (!isConnected && buttonRef.current) {
      // Add a CSS class for animation instead of using anime.js
      buttonRef.current.classList.add("pulse-animation")
    }
  }, [isConnected])

  return (
    <div>
      {isConnected ? (
        <Button variant="outline" disabled className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          {formatAddress(account)}
        </Button>
      ) : (
        <Button
          ref={buttonRef}
          onClick={onConnect}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      )}
    </div>
  )
}
