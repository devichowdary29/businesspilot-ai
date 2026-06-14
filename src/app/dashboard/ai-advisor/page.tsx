import { getConversations } from "@/actions/ai/get-conversations"
import { AiPageClient } from "@/components/ai/ai-page-client"
import type { ConversationHistoryItem, ChatMessageData, MessageRole, ConversationCategory } from "@/components/ai/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const getCategory = (title: string): ConversationCategory => {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes("revenue") || lowerTitle.includes("sales")) return "Revenue"
  if (lowerTitle.includes("inventory") || lowerTitle.includes("stock")) return "Inventory"
  if (lowerTitle.includes("customer")) return "Customers"
  if (lowerTitle.includes("report")) return "Report"
  return "Products"
}

export default async function AiAdvisorPage() {
  const response = await getConversations()
  
  let initialConversations: ConversationHistoryItem[] = []
  let messagesMap: Record<string, ChatMessageData[]> = {}

  if (response.isSuccess) {
    initialConversations = response.data.map((conv) => ({
      id: conv.id,
      title: conv.title,
      date: conv.updatedAt.toISOString(), // format if needed
      category: getCategory(conv.title),
    }))

    response.data.forEach((conv) => {
      messagesMap[conv.id] = conv.messages.map((msg) => ({
        id: msg.id,
        role: (msg.role === "USER" ? "user" : "ai") as MessageRole,
        content: msg.content,
        timestamp: msg.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    })
  }

  return (
    <AiPageClient 
      initialConversations={initialConversations}
      messagesMap={messagesMap}
    />
  )
}
