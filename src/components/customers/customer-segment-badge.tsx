import { Badge } from "@/components/ui/badge"
import type { CustomerSegment } from "./types"

const segmentStyles: Record<CustomerSegment, string> = {
  VIP: "bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
  Loyal: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  New: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  "At Risk": "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400 border-red-200 dark:border-red-500/20",
}

interface CustomerSegmentBadgeProps {
  segment: CustomerSegment
}

export function CustomerSegmentBadge({ segment }: CustomerSegmentBadgeProps) {
  return (
    <Badge variant="outline" className={`font-medium ${segmentStyles[segment]}`}>
      {segment === "VIP" && "💎 "}
      {segment === "Loyal" && "🟢 "}
      {segment === "New" && "🆕 "}
      {segment === "At Risk" && "⚠ "}
      {segment}
    </Badge>
  )
}
