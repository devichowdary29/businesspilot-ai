import { KpiCards } from "@/components/dashboard/kpi-cards"
import { AiAdvisorCard } from "@/components/dashboard/ai-advisor-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table"
import {
  kpiCards,
  revenueData,
  recentOrders,
  aiInsights,
  aiActions,
  businessHealthScore,
} from "@/components/dashboard/data"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back, John
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your business performance.
          </p>
        </div>
        <QuickActions />
      </div>

      <KpiCards cards={kpiCards} />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AiAdvisorCard
            healthScore={businessHealthScore}
            insights={aiInsights}
            actions={aiActions}
          />
        </div>
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
      </div>

      <RecentOrdersTable orders={recentOrders} />
    </div>
  )
}
