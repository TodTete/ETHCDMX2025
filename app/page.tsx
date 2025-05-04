"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import NetworkSelector from "@/components/network-selector"
import CreatePollForm from "@/components/create-poll-form"
import PollList from "@/components/poll-list"
import ConnectWallet from "@/components/connect-wallet"
import { NETWORKS, POLL_ABI } from "@/lib/constants"
import { useToast } from "@/components/ui/use-toast"
import { ModeToggle } from "@/components/mode-toggle"
import ParticleBackground from "@/components/particle-background"
import FeatureSection from "@/components/feature-section"

export default function Home() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [account, setAccount] = useState<string>("")
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0])
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Animation effect on mount
  useEffect(() => {
    // Use CSS classes instead of anime.js
    const elements = document.querySelectorAll(".animate-fade-in")
    elements.forEach((el, index) => {
      setTimeout(
        () => {
          ;(el as HTMLElement).style.opacity = "1"
          ;(el as HTMLElement).style.transform = "translateY(0)"
        },
        100 * index + 300,
      )
    })
  }, [])

  // Handle wallet connection
  const connectWallet = async () => {
    setIsLoading(true)

    try {
      if (!window.ethereum) {
        toast({
          variant: "destructive",
          title: "Wallet Error",
          description: "No Ethereum wallet detected. Please install MetaMask.",
        })
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      await window.ethereum.request({ method: "eth_requestAccounts" })

      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      setProvider(provider)
      setSigner(signer)
      setAccount(address)
      setIsConnected(true)

      // Initialize contract with the selected network
      initializeContract(signer, selectedNetwork.contractAddress)

      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      })
    } catch (err) {
      console.error("Connection error:", err)
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: err instanceof Error ? err.message : "Failed to connect wallet",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize contract with the selected network
  const initializeContract = (signer: ethers.Signer, contractAddress: string) => {
    try {
      const pollContract = new ethers.Contract(contractAddress, POLL_ABI, signer)
      setContract(pollContract)
    } catch (err) {
      console.error("Contract initialization error:", err)
      toast({
        variant: "destructive",
        title: "Contract Error",
        description: "Failed to initialize contract",
      })
    }
  }

  // Handle network change
  const handleNetworkChange = async (network: (typeof NETWORKS)[0]) => {
    setSelectedNetwork(network)

    if (signer) {
      // Switch network in MetaMask
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.toBeHex(network.chainId) }],
        })

        // Reinitialize contract with new network
        initializeContract(signer, network.contractAddress)

        toast({
          title: "Network Changed",
          description: `Switched to ${network.name}`,
        })
      } catch (err) {
        console.error("Network switch error:", err)
        toast({
          variant: "destructive",
          title: "Network Switch Failed",
          description: "Failed to switch network. Please switch manually in your wallet.",
        })
      }
    }
  }

  return (
    <main className="min-h-screen relative">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="flex justify-end mb-4">
          <ModeToggle />
        </div>

        <Card className="mb-8 border-none shadow-lg animate-fade-in bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Cross-Chain Polling System
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Create and vote on polls across different blockchain networks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <NetworkSelector
                networks={NETWORKS}
                selectedNetwork={selectedNetwork}
                onNetworkChange={handleNetworkChange}
              />
              <ConnectWallet
                isConnected={isConnected}
                account={account}
                isLoading={isLoading}
                onConnect={connectWallet}
              />
            </div>
          </CardContent>
        </Card>

        {!isConnected && <FeatureSection />}

        {isConnected ? (
          <Card className="border-none shadow-lg animate-fade-in bg-background/80 backdrop-blur-sm">
            <Tabs defaultValue="polls" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="polls" className="text-base">
                  View Polls
                </TabsTrigger>
                <TabsTrigger value="create" className="text-base">
                  Create Poll
                </TabsTrigger>
              </TabsList>

              <TabsContent value="polls" className="mt-0">
                <CardHeader>
                  <CardTitle>Available Polls</CardTitle>
                  <CardDescription>Vote on existing polls on {selectedNetwork.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <PollList contract={contract} />
                </CardContent>
              </TabsContent>

              <TabsContent value="create" className="mt-0">
                <CardHeader>
                  <CardTitle>Create a New Poll</CardTitle>
                  <CardDescription>Create a new poll on {selectedNetwork.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CreatePollForm contract={contract} />
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        ) : (
          <Card className="text-center p-8 border-none shadow-lg animate-fade-in bg-background/80 backdrop-blur-sm">
            <CardContent>
              <p className="mb-4 text-lg">Connect your wallet to create and vote on polls</p>
              <Button
                onClick={connectWallet}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
