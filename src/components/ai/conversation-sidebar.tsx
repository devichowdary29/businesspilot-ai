"use client"

import * as React from "react"
import { Plus, MessageSquare, LayoutDashboard, Search, Package, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ConversationHistoryItem, ConversationCategory } from "./types"

const getCategoryIcon = (category: ConversationCategory) => {
  switch (category) {
    case "Revenue": return LayoutDashboard;
    case "Inventory": return Package;
    case "Customers": return Users;
    case "Report": return Search;
    case "Products": return Package;
    default: return MessageSquare;
  }
}

interface ConversationSidebarProps {
  history: ConversationHistoryItem[]
  activeId?: string
  onSelect: (id: string) => void
  onNew: () => void
}

export function ConversationSidebar({ history, activeId, onSelect, onNew }: ConversationSidebarProps) {
  return (
    <div className="flex h-full w-full flex-col bg-muted/20">
      <div className="p-4">
        <Button onClick={onNew} className="w-full justify-start gap-2 shadow-sm" variant="default">
          <Plus className="size-4" />
          New Conversation
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="space-y-1">
          <p className="px-2 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Conversations
          </p>
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeId === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {(() => {
                const Icon = getCategoryIcon(item.category)
                return <Icon className="size-4 shrink-0" />
              })()}
              <div className="flex-1 truncate">
                <p className="truncate">{item.title}</p>
              </div>
              <span className="text-[10px] opacity-50">{item.date}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
