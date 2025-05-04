"use client"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useRef } from "react"

type Network = {
  name: string
  chainId: number
  contractAddress: string
  icon: string
}

type NetworkSelectorProps = {
  networks: Network[]
  selectedNetwork: Network
  onNetworkChange: (network: Network) => void
}

export default function NetworkSelector({ networks, selectedNetwork, onNetworkChange }: NetworkSelectorProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Use CSS transitions instead of anime.js
    if (buttonRef.current) {
      setTimeout(() => {
        buttonRef.current?.classList.add("pulse-animation")
      }, 1000)
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Network:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            className="flex items-center gap-2 transition-all duration-300 hover:bg-primary/10"
          >
            <img
              src={selectedNetwork.icon || "/placeholder.svg"}
              alt={selectedNetwork.name}
              className="w-5 h-5 rounded-full"
            />
            {selectedNetwork.name}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="animate-in fade-in-80 zoom-in-95">
          {networks.map((network) => (
            <DropdownMenuItem
              key={network.chainId}
              onClick={() => onNetworkChange(network)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src={network.icon || "/placeholder.svg"} alt={network.name} className="w-5 h-5 rounded-full" />
              {network.name}
              {selectedNetwork.chainId === network.chainId && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
