"use client"

import * as React from "react"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { SuggestedPrompts } from "./suggested-prompts"
import { AiThinking } from "./ai-thinking"
import { BusinessReportCard } from "./business-report-card"
import { suggestedPrompts } from "./data"
import { createMessage } from "@/actions/ai/create-message"
import { useRouter } from "next/navigation"
import type { ChatMessageData } from "./types"

interface AiChatProps {
  onExportReport: () => void
  initialMessages?: ChatMessageData[]
  conversationId?: string
}

export function AiChat({ onExportReport, initialMessages = [], conversationId }: AiChatProps) {
  const router = useRouter()
  const [messages, setMessages] = React.useState<ChatMessageData[]>(initialMessages)
  const [isThinking, setIsThinking] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = React.useTransition()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  React.useEffect(() => {
    setMessages(initialMessages)
  }, [conversationId, initialMessages])

  const handleSend = (text: string) => {
    if (!conversationId) {
      setError("Please select or create a conversation first.")
      return
    }

    startTransition(async () => {
      setError(null)
      setIsThinking(true)

      const response = await createMessage({
        conversationId,
        content: text
      })

      if (response.isSuccess) {
        router.refresh()
      } else {
        setError(response.message)
      }
      
      setIsThinking(false)
    })
  }
      


  return (
    <div className="flex h-full flex-col relative">
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-2">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg ring-4 ring-primary/10">
                <span className="text-3xl text-white">👋</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Good morning, Alex</h2>
              <p className="text-muted-foreground">I'm your AI Business Advisor.</p>
            </div>
            
            <div className="rounded-2xl border bg-card/50 backdrop-blur p-6 shadow-sm max-w-sm w-full text-center">
              <p className="text-sm font-medium mb-4">I have analyzed your:</p>
              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2 bg-background rounded-lg py-2 border shadow-sm">✓ Revenue</div>
                <div className="flex items-center justify-center gap-2 bg-background rounded-lg py-2 border shadow-sm">✓ Customers</div>
                <div className="flex items-center justify-center gap-2 bg-background rounded-lg py-2 border shadow-sm">✓ Products</div>
                <div className="flex items-center justify-center gap-2 bg-background rounded-lg py-2 border shadow-sm">✓ Inventory</div>
              </div>
            </div>

            <div className="pt-4 space-y-4 w-full">
              <p className="text-center text-sm font-medium">What would you like to improve today?</p>
              <SuggestedPrompts prompts={suggestedPrompts} onSelect={handleSend} />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl pb-20">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isThinking && <AiThinking />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 md:px-8 bg-gradient-to-t from-background via-background to-transparent pt-10">
        <div className="mx-auto max-w-3xl">
          {error && (
            <div className="mb-3 rounded-lg bg-destructive/15 p-3 text-sm text-destructive text-center">
              {error}
            </div>
          )}
          <ChatInput onSend={handleSend} disabled={isThinking || isPending || !conversationId} isPending={isPending} />
          <p className="text-center text-xs text-muted-foreground mt-3">
            BusinessPilot AI can make mistakes. Consider verifying important information.
          </p>
        </div>
      </div>
    </div>
  )
}
