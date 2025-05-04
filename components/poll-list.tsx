"use client"

import { useState, useEffect } from "react"
import type { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Loader2, Vote, BarChart3 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Poll = {
  id: number
  question: string
  options: string[]
  votes: number[]
  totalVotes: number
}

type PollListProps = {
  contract: ethers.Contract | null
}

export default function PollList({ contract }: PollListProps) {
  const [polls, setPolls] = useState<Poll[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [votingPollId, setVotingPollId] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (contract) {
      fetchPolls()
    }
  }, [contract])

  const fetchPolls = async () => {
    setIsLoading(true)

    try {
      if (!contract) {
        throw new Error("Contract not initialized")
      }

      const pollCount = await contract.getPollCount()
      const fetchedPolls: Poll[] = []

      for (let i = 0; i < pollCount; i++) {
        const poll = await contract.getPoll(i)

        // Convert BigInt values to numbers
        const votes = poll.votes.map((vote: bigint) => Number(vote))
        const totalVotes = votes.reduce((sum: number, vote: number) => sum + vote, 0)

        fetchedPolls.push({
          id: i,
          question: poll.question,
          options: poll.options,
          votes,
          totalVotes,
        })
      }

      setPolls(fetchedPolls)

      // Animate polls appearing
      setTimeout(() => {
        const pollCards = document.querySelectorAll(".poll-card")
        pollCards.forEach((card, index) => {
          setTimeout(() => {
            ;(card as HTMLElement).style.opacity = "1"
            ;(card as HTMLElement).style.transform = "translateY(0)"
          }, 150 * index)
        })
      }, 100)
    } catch (err) {
      console.error("Error fetching polls:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to fetch polls",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (pollId: number, optionIndex: number) => {
    setVotingPollId(pollId)

    try {
      if (!contract) {
        throw new Error("Contract not initialized")
      }

      const tx = await contract.vote(pollId, optionIndex)

      toast({
        title: "Vote Submitted",
        description: "Your vote is being processed...",
      })

      await tx.wait()

      // Refresh polls after voting
      await fetchPolls()

      toast({
        title: "Vote Recorded",
        description: "Your vote has been recorded successfully!",
        variant: "success",
      })

      // Animate the voted option
      const progressBar = document.querySelector(`.poll-${pollId} .option-${optionIndex} .progress-bar`)
      if (progressBar) {
        progressBar.classList.add("highlight-animation")
        setTimeout(() => {
          progressBar.classList.remove("highlight-animation")
        }, 800)
      }
    } catch (err) {
      console.error("Error voting:", err)
      toast({
        variant: "destructive",
        title: "Vote Failed",
        description: err instanceof Error ? err.message : "Failed to vote",
      })
    } finally {
      setVotingPollId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading polls...</p>
      </div>
    )
  }

  if (polls.length === 0) {
    return (
      <div className="text-center p-12 border-2 border-dashed border-muted rounded-lg">
        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-xl font-medium mb-2">No polls found</p>
        <p className="text-muted-foreground mb-4">Create a new poll to get started!</p>
        <Button
          variant="outline"
          onClick={() => document.querySelector('[value="create"]')?.dispatchEvent(new Event("click"))}
        >
          Create Your First Poll
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {polls.map((poll) => (
        <Card
          key={poll.id}
          className={`poll-card poll-${poll.id} overflow-hidden opacity-0 border-none shadow-md hover:shadow-lg transition-all duration-300`}
        >
          <CardHeader className="bg-gradient-to-r from-purple-600/10 to-blue-500/10">
            <CardTitle className="text-xl">{poll.question}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              {poll.options.map((option, optionIndex) => {
                const voteCount = poll.votes[optionIndex]
                const percentage = poll.totalVotes > 0 ? Math.round((voteCount / poll.totalVotes) * 100) : 0

                return (
                  <div key={optionIndex} className={`space-y-2 option-${optionIndex}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{option}</span>
                      <span className="text-sm text-muted-foreground">
                        {voteCount} votes ({percentage}%)
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="relative flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="progress-bar absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleVote(poll.id, optionIndex)}
                        disabled={votingPollId === poll.id}
                        className="transition-all duration-300 hover:scale-105"
                      >
                        {votingPollId === poll.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Vote className="h-4 w-4 mr-1" />
                            Vote
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 py-3">
            <div className="text-sm text-muted-foreground">Total votes: {poll.totalVotes}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
