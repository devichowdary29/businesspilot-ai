import { type LucideIcon } from "lucide-react"

export type MessageRole = "user" | "ai"
export type ConversationCategory = "Revenue" | "Inventory" | "Customers" | "Products" | "Report"

export interface ChatMessageData {
  id: string
  role: MessageRole
  content: string | React.ReactNode
  timestamp: string
}

export interface ConversationHistoryItem {
  id: string
  title: string
  date: string
  category: ConversationCategory
}

export interface SuggestedPrompt {
  id: string
  text: string
  icon: LucideIcon
  colorClass: string
}
