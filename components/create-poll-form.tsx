"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, Trash2, HelpCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type CreatePollFormProps = {
  contract: ethers.Contract | null
}

export default function CreatePollForm({ contract }: CreatePollFormProps) {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState<string[]>(["", ""])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Use CSS classes for animations
    const elements = document.querySelectorAll(".form-element")
    elements.forEach((el, index) => {
      setTimeout(() => {
        ;(el as HTMLElement).style.opacity = "1"
        ;(el as HTMLElement).style.transform = "translateY(0)"
      }, 100 * index)
    })
  }, [])

  const addOption = () => {
    setOptions([...options, ""])
    // Animation will be handled by CSS
  }

  const removeOption = (index: number) => {
    if (options.length <= 2) return // Keep at least 2 options
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const handleOptionChange = (value: string, index: number) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate inputs
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter a question",
      })
      setIsSubmitting(false)
      return
    }

    const filteredOptions = options.filter((opt) => opt.trim() !== "")
    if (filteredOptions.length < 2) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please provide at least 2 options",
      })
      setIsSubmitting(false)
      return
    }

    try {
      if (!contract) {
        throw new Error("Contract not initialized")
      }

      // Call the contract to create a new poll
      const tx = await contract.createPoll(question, filteredOptions)

      toast({
        title: "Transaction Submitted",
        description: "Your poll is being created...",
      })

      await tx.wait()

      // Reset form
      setQuestion("")
      setOptions(["", ""])

      toast({
        title: "Poll Created",
        description: "Your poll has been created successfully!",
        variant: "success",
      })

      // Animate success
      document.querySelector("form")?.classList.add("success-animation")
      setTimeout(() => {
        document.querySelector("form")?.classList.remove("success-animation")
      }, 400)
    } catch (err) {
      console.error("Error creating poll:", err)
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: err instanceof Error ? err.message : "Failed to create poll",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2 form-element">
        <Label htmlFor="question" className="flex items-center gap-1">
          Poll Question
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </Label>
        <Input
          id="question"
          placeholder="What is your favorite blockchain?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isSubmitting}
          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-4 form-element">
        <Label className="flex items-center gap-1">
          Options
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </Label>
        {options.map((option, index) => (
          <div key={index} className="flex gap-2 option-row">
            <Input
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(e.target.value, index)}
              disabled={isSubmitting}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeOption(index)}
              disabled={options.length <= 2 || isSubmitting}
              className="transition-all duration-300 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addOption}
          disabled={isSubmitting}
          className="flex items-center gap-2 transition-all duration-300 hover:bg-primary/10"
        >
          <Plus className="h-4 w-4" />
          Add Option
        </Button>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 form-element"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Poll...
          </>
        ) : (
          "Create Poll"
        )}
      </Button>
    </form>
  )
}
