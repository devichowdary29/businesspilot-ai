import { Badge } from "@/components/ui/badge"
import type { RiskLevel } from "./types"

const riskStyles: Record<RiskLevel, { class: string, emoji: string }> = {
  Healthy: { class: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20", emoji: "🟢" },
  Watch: { class: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400 border-blue-200 dark:border-blue-500/20", emoji: "🟡" },
  Low: { class: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200 dark:border-amber-500/20", emoji: "🟠" },
  Critical: { class: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400 border-red-200 dark:border-red-500/20", emoji: "🔴" },
}

export function InventoryHealthBadge({ level }: { level: RiskLevel }) {
  const style = riskStyles[level]
  return (
    <Badge variant="outline" className={`font-medium shadow-sm ${style.class}`}>
      <span className="mr-1">{style.emoji}</span>
      {level}
    </Badge>
  )
}
