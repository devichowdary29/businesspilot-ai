import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react"
import type {
  KpiCardData,
  RevenueDataPoint,
  OrderData,
  AiInsight,
  AiAction,
} from "./types"

export const kpiCards: KpiCardData[] = [
  {
    title: "Total Revenue",
    value: "₹12,45,000",
    change: "+18% from last month",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    title: "Orders",
    value: "3,456",
    change: "+12% this month",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "1,245",
    change: "+9% customer growth",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Products",
    value: "86",
    change: "5 low stock alerts",
    changeType: "neutral",
    icon: Package,
  },
]

export const revenueData: RevenueDataPoint[] = [
  { month: "January", revenue: 720000 },
  { month: "February", revenue: 810000 },
  { month: "March", revenue: 940000 },
  { month: "April", revenue: 1100000 },
  { month: "May", revenue: 1230000 },
  { month: "June", revenue: 1280000 },
]

export const recentOrders: OrderData[] = [
  {
    id: "ORD-001",
    customer: "Rahul Sharma",
    product: "Wireless Mouse",
    amount: "₹999",
    status: "Paid",
    date: "12 June 2026",
  },
  {
    id: "ORD-002",
    customer: "Priya Patel",
    product: "Mechanical Keyboard",
    amount: "₹2,499",
    status: "Pending",
    date: "11 June 2026",
  },
  {
    id: "ORD-003",
    customer: "Amit Kumar",
    product: "Laptop Stand",
    amount: "₹1,299",
    status: "Delivered",
    date: "10 June 2026",
  },
  {
    id: "ORD-004",
    customer: "Sneha Reddy",
    product: "USB-C Hub",
    amount: "₹1,899",
    status: "Paid",
    date: "9 June 2026",
  },
  {
    id: "ORD-005",
    customer: "Vikram Singh",
    product: "Monitor Light Bar",
    amount: "₹3,499",
    status: "Pending",
    date: "8 June 2026",
  },
]

export const aiInsights: AiInsight[] = [
  { text: "Revenue grew 18% this month driven by strong keyboard and accessory sales." },
  { text: "Your top-selling product Wireless Mouse has only 5 units remaining in stock." },
  { text: "8 VIP customers have not made a purchase in the last 30 days." },
]

export const aiActions: AiAction[] = [
  { text: "Restock 200 units of Wireless Mouse" },
  { text: "Send offers to inactive VIP customers" },
  { text: "Launch a weekend promotion campaign" },
]

export const businessHealthScore = 87
