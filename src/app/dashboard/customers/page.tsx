import { CustomersPageClient } from "@/components/customers/customers-page-client"
import { Users, IndianRupee, Star, AlertTriangle } from "lucide-react"
import type { Customer, CustomerStatsData } from "@/components/customers/types"
import { getCustomerAnalytics } from "@/actions/customers/get-customer-analytics"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function CustomersPage() {
  const { getCustomers } = await import("@/actions/customers/get-customers")
  const [response, analyticsResponse] = await Promise.all([
    getCustomers(),
    getCustomerAnalytics()
  ])
  
  let mappedCustomers: Customer[] = []
  
  if (response.isSuccess) {
    mappedCustomers = response.data.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email || "",
      phone: c.phone || "",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name)}`,
      segment: c.segment === "NEW" ? "New" : c.segment === "LOYAL" ? "Loyal" : c.segment === "VIP" ? "VIP" : "At Risk",
      totalOrders: c.totalOrders,
      totalSpent: Number(c.totalSpent),
      averageOrderValue: c.totalOrders > 0 ? Number(c.totalSpent) / c.totalOrders : 0,
      lastPurchaseDate: new Date(c.updatedAt).toISOString().split("T")[0],
      joinDate: new Date(c.createdAt).toISOString().split("T")[0],
      riskScore: c.segment === "AT_RISK" ? 85 : c.segment === "NEW" ? 30 : 10,
      aiInsight: c.segment === "VIP" ? "High Lifetime Value" : c.segment === "AT_RISK" ? "Churn Risk" : c.segment === "LOYAL" ? "Frequent Buyer" : "Growing Customer",
    }))
  }

  const liveStats: CustomerStatsData[] = [
    {
      title: "Total Customers",
      value: (analyticsResponse.data?.totalCustomers || 0).toString(),
      change: "Live Database Metric",
      changeType: "neutral",
      iconName: "Users",
    },
    {
      title: "Lifetime Value",
      value: `₹${(analyticsResponse.data?.lifetimeValue || 0).toLocaleString("en-IN")}`,
      change: "Live Database Metric",
      changeType: "neutral",
      iconName: "IndianRupee",
    },
    {
      title: "VIP Customers",
      value: (analyticsResponse.data?.vipCustomers || 0).toString(),
      change: "Live Database Metric",
      changeType: "neutral",
      iconName: "Star",
    },
    {
      title: "Churn Risk",
      value: (analyticsResponse.data?.churnRisk || 0).toString(),
      change: "Live Database Metric",
      changeType: "neutral",
      iconName: "AlertTriangle",
    },
  ]

  return <CustomersPageClient initialCustomers={mappedCustomers} analytics={liveStats} />
}
