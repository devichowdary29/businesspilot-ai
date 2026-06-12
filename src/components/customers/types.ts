import { type LucideIcon } from "lucide-react"

export type CustomerSegment = "VIP" | "Loyal" | "New" | "At Risk"

export type AiInsightType = 
  | "High Lifetime Value" 
  | "Churn Risk" 
  | "Frequent Buyer" 
  | "Growing Customer" 
  | "Upsell Opportunity"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  segment: CustomerSegment
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastPurchaseDate: string
  joinDate: string
  riskScore: number // 0-100
  aiInsight: AiInsightType
}

export type ViewMode = "table" | "grid"

export interface CustomerFilters {
  search: string
  segment: CustomerSegment | "All"
}

export interface CustomerStatsData {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
}
