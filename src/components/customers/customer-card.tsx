import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CustomerSegmentBadge } from "./customer-segment-badge"
import { CustomerAiInsight } from "./customer-ai-insight"
import type { Customer } from "./types"

interface CustomerCardProps {
  customer: Customer
  onViewProfile: (customer: Customer) => void
  onEdit?: (customer: Customer) => void
  onDelete?: (customer: Customer) => void
}

export function CustomerCard({ customer, onViewProfile, onEdit, onDelete }: CustomerCardProps) {
  // Simple health score representation (inverse of risk score)
  const healthScore = 100 - customer.riskScore
  
  const healthColor = 
    healthScore >= 80 ? "bg-emerald-500" :
    healthScore >= 50 ? "bg-amber-500" :
    "bg-red-500"

  return (
    <Card 
      className="group/customer-card cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      onClick={() => onViewProfile(customer)}
    >
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-start justify-between">
          <Avatar className="size-12 rounded-xl border border-muted ring-2 ring-background">
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback className="rounded-xl bg-primary/10 text-lg text-primary">
              {customer.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CustomerSegmentBadge segment={customer.segment} />
        </div>

        <div>
          <h3 className="truncate font-semibold">{customer.name}</h3>
          <p className="truncate text-sm text-muted-foreground">{customer.email}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/40 p-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Total Spent</p>
            <p className="font-medium">₹{customer.totalSpent.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Orders</p>
            <p className="font-medium">{customer.totalOrders}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">Health Score</span>
            <span className="text-muted-foreground">{healthScore}/100</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div 
              className={`h-full rounded-full transition-all ${healthColor}`}
              style={{ width: `${healthScore}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
          <span className="truncate pr-2">Last: {customer.lastPurchaseDate}</span>
          <CustomerAiInsight insight={customer.aiInsight} />
        </div>
      </CardContent>
    </Card>
  )
}
