"use client"

import * as React from "react"
import { Sparkles, User } from "lucide-react"
import type { ChatMessageData } from "./types"

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isAi = message.role === "ai"

  return (
    <div className={`flex w-full ${isAi ? "justify-start" : "justify-end"} mb-6 animate-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[85%] gap-4 ${isAi ? "flex-row" : "flex-row-reverse"}`}>
        
        {/* Avatar */}
        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg shadow-sm ${
          isAi 
            ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white" 
            : "bg-muted text-muted-foreground border"
        }`}>
          {isAi ? <Sparkles className="size-4" /> : <User className="size-4" />}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}>
          <div className={`rounded-2xl px-5 py-3.5 text-sm shadow-sm leading-relaxed ${
            isAi 
              ? "bg-card border text-card-foreground rounded-tl-sm" 
              : "bg-primary text-primary-foreground rounded-tr-sm"
          }`}>
            {typeof message.content === "string" ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              message.content
            )}
          </div>
          <span className="mt-1.5 px-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  )
}
