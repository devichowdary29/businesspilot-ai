"use client"

import * as React from "react"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { SuggestedPrompts } from "./suggested-prompts"
import { AiThinking } from "./ai-thinking"
import { BusinessReportCard } from "./business-report-card"
import { suggestedPrompts } from "./data"
import type { ChatMessageData } from "./types"

interface AiChatProps {
  onExportReport: () => void
}

export function AiChat({ onExportReport }: AiChatProps) {
  const [messages, setMessages] = React.useState<ChatMessageData[]>([])
  const [isThinking, setIsThinking] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSend = (text: string) => {
    const newUserMsg: ChatMessageData = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, newUserMsg])
    setIsThinking(true)

    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false)
      
      let aiContent: React.ReactNode = ""
      
      if (text.toLowerCase().includes("report")) {
        aiContent = (
          <div className="space-y-4">
            <p>I've generated your weekly business report based on your latest data:</p>
            <BusinessReportCard onExport={onExportReport} />
          </div>
        )
      } else if (text.toLowerCase().includes("sales") || text.toLowerCase().includes("revenue")) {
        aiContent = (
          <div className="space-y-3">
            <p>After analyzing your business data, I found three major reasons for the recent changes:</p>
            <div className="space-y-2">
              <p><strong>1. Inventory Issue</strong><br/>Wireless Mouse stock dropped below the safe threshold.<br/><span className="text-muted-foreground">Impact: Potential loss ₹45,000.</span></p>
              <p><strong>2. Customer Retention</strong><br/>8 VIP customers have not purchased in 30 days.</p>
              <p><strong>3. Product Mix</strong><br/>Accessory sales decreased by 12%.</p>
            </div>
            <p className="font-semibold pt-2">Recommended Actions:</p>
            <ul className="list-inside space-y-1">
              <li>✓ Restock Wireless Mouse immediately.</li>
              <li>✓ Send a personalized offer to inactive VIP customers.</li>
              <li>✓ Create a bundle campaign for accessories.</li>
            </ul>
          </div>
        )
      } else {
        aiContent = "I'm analyzing that right now. Based on your current data, your overall business health remains strong at 92/100, but there are some inventory and customer retention opportunities we can explore."
      }

      const newAiMsg: ChatMessageData = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, newAiMsg])
    }, 2500)
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
          <ChatInput onSend={handleSend} disabled={isThinking} />
          <p className="text-center text-xs text-muted-foreground mt-3">
            BusinessPilot AI can make mistakes. Consider verifying important information.
          </p>
        </div>
      </div>
    </div>
  )
}
