import { Badge } from "@/components/ui/badge"
import type { AiInsightType } from "./types"

const insightStyles: Record<AiInsightType, { class: string, emoji: string }> = {
  "High Lifetime Value": { class: "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200/50 dark:border-purple-500/20", emoji: "💎" },
  "Churn Risk": { class: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200/50 dark:border-red-500/20", emoji: "⚠" },
  "Frequent Buyer": { class: "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200/50 dark:border-orange-500/20", emoji: "🔥" },
  "Growing Customer": { class: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/20", emoji: "📈" },
  "Upsell Opportunity": { class: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/20", emoji: "🎯" },
}

interface CustomerAiInsightProps {
  insight: AiInsightType
}

export function CustomerAiInsight({ insight }: CustomerAiInsightProps) {
  const style = insightStyles[insight]
  return (
    <Badge variant="outline" className={`font-medium shadow-sm transition-colors ${style.class}`}>
      <span className="mr-1">{style.emoji}</span>
      {insight}
    </Badge>
  )
}
