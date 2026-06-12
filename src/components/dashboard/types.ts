import { type LucideIcon } from "lucide-react"

export interface KpiCardData {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
}

export interface RevenueDataPoint {
  month: string
  revenue: number
}

export interface OrderData {
  id: string
  customer: string
  product: string
  amount: string
  status: "Paid" | "Pending" | "Delivered"
  date: string
}

export interface AiInsight {
  text: string
}

export interface AiAction {
  text: string
}
