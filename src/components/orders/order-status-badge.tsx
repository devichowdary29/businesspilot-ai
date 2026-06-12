import { Badge } from "@/components/ui/badge"
import type { PaymentStatus, OrderStatus, AiOrderInsightType } from "./types"

const paymentStyles: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
  Failed: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400 border-red-200 dark:border-red-500/20",
  Refunded: "bg-slate-100 text-slate-800 dark:bg-slate-500/15 dark:text-slate-400 border-slate-200 dark:border-slate-500/20",
}

const orderStyles: Record<OrderStatus, string> = {
  Processing: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  Shipped: "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20",
  Delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400 border-red-200 dark:border-red-500/20",
}

const aiInsightStyles: Record<AiOrderInsightType, { class: string, emoji: string }> = {
  "High Profit": { class: "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200/50 dark:border-purple-500/20", emoji: "🔥" },
  "Best Seller": { class: "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200/50 dark:border-orange-500/20", emoji: "💰" },
  "Low Margin": { class: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/50 dark:border-amber-500/20", emoji: "⚠" },
  "Growing Category": { class: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/20", emoji: "📈" },
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge variant="outline" className={`font-medium ${paymentStyles[status]}`}>
      {status}
    </Badge>
  )
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant="outline" className={`font-medium ${orderStyles[status]}`}>
      {status}
    </Badge>
  )
}

export function OrderAiInsightBadge({ insight }: { insight: AiOrderInsightType }) {
  const style = aiInsightStyles[insight]
  return (
    <Badge variant="outline" className={`font-medium shadow-sm transition-colors ${style.class}`}>
      <span className="mr-1">{style.emoji}</span>
      {insight}
    </Badge>
  )
}
