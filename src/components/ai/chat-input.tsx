"use client"

import * as React from "react"
import { Send, Paperclip, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  isPending?: boolean
}

export function ChatInput({ onSend, disabled, isPending }: ChatInputProps) {
  const [input, setInput] = React.useState("")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [input])

  return (
    <div className="relative rounded-2xl border bg-background/50 backdrop-blur-sm p-3 shadow-sm ring-1 ring-primary/5 transition-all focus-within:ring-primary/20">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask BusinessPilot AI anything about your business..."
        className="min-h-[44px] w-full resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0 shadow-none scrollbar-hide"
        rows={1}
        disabled={disabled}
      />
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground rounded-full" disabled={disabled}>
            <Paperclip className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground rounded-full" disabled={disabled}>
            <Mic className="size-4" />
          </Button>
        </div>
        <Button 
          size="icon-sm" 
          className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={handleSend}
          disabled={!input.trim() || disabled || isPending}
        >
          {isPending ? (
            <span className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
