import { type LucideIcon } from "lucide-react"

export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded"
export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled"

export type AiOrderInsightType = 
  | "High Profit" 
  | "Best Seller" 
  | "Low Margin" 
  | "Growing Category"

export interface OrderProduct {
  productId: string
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerAvatar: string
  products: OrderProduct[]
  orderDate: string
  totalAmount: number
  paymentMethod: string
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  deliveryDate: string
  profit: number
  aiInsight: AiOrderInsightType
}

export type ViewMode = "table" | "grid"

export interface OrderFilters {
  search: string
  paymentStatus: PaymentStatus | "All"
  orderStatus: OrderStatus | "All"
}

export interface OrderStatsData {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
}
