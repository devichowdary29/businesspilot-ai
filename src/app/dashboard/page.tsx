import { BarChart3, Package, Users, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: BarChart3,
  },
  {
    title: "Products",
    value: "2,350",
    change: "+180 new this month",
    icon: Package,
  },
  {
    title: "Customers",
    value: "12,234",
    change: "+19% from last month",
    icon: Users,
  },
  {
    title: "Active Orders",
    value: "573",
    change: "+201 since last hour",
    icon: ShoppingCart,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, John</h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your business performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
