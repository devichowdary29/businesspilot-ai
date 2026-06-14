import { KpiCards } from "@/components/dashboard/kpi-cards"
import { AiAdvisorCard } from "@/components/dashboard/ai-advisor-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table"
import {
  aiInsights,
  aiActions,
  businessHealthScore,
} from "@/components/dashboard/data"
import { getDashboardOverview } from "@/actions/dashboard/get-dashboard-overview"
import { getDashboardRevenue } from "@/actions/dashboard/get-dashboard-revenue"
import { getDashboardRecentOrders } from "@/actions/dashboard/get-dashboard-recent-orders"
import { IndianRupee, ShoppingCart, Users, Package } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const overview = await getDashboardOverview()
  const revenue = await getDashboardRevenue()
  const recentOrdersState = await getDashboardRecentOrders()

  const liveKpiCards = [
    {
      title: "Total Revenue",
      value: `₹${(overview.data?.totalRevenue || 0).toLocaleString("en-IN")}`,
      change: "Live business data",
      changeType: "neutral" as const,
      icon: IndianRupee,
    },
    {
      title: "Orders",
      value: (overview.data?.totalOrders || 0).toString(),
      change: "Live business data",
      changeType: "neutral" as const,
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: (overview.data?.totalCustomers || 0).toString(),
      change: "Live business data",
      changeType: "neutral" as const,
      icon: Users,
    },
    {
      title: "Products",
      value: (overview.data?.totalProducts || 0).toString(),
      change: "Live business data",
      changeType: "neutral" as const,
      icon: Package,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your business performance.
          </p>
        </div>
        <QuickActions />
      </div>

      <KpiCards cards={liveKpiCards} />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AiAdvisorCard
            healthScore={businessHealthScore}
            insights={aiInsights}
            actions={aiActions}
          />
        </div>
        <div className="lg:col-span-2">
          <RevenueChart data={revenue.data || []} />
        </div>
      </div>

      <RecentOrdersTable orders={recentOrdersState.data || []} />
    </div>
  )
}
