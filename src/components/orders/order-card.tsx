import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PaymentStatusBadge, OrderStatusBadge, OrderAiInsightBadge } from "./order-status-badge"
import type { Order } from "./types"

interface OrderCardProps {
  order: Order
  onViewOrder: (order: Order) => void
  onEdit?: (order: Order) => void
  onDelete?: (order: Order) => void
}

export function OrderCard({ order, onViewOrder, onEdit, onDelete }: OrderCardProps) {
  const totalProducts = order.products.reduce((sum, p) => sum + p.quantity, 0)

  return (
    <Card 
      className="group/order-card cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      onClick={() => onViewOrder(order)}
    >
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 rounded-lg border border-muted ring-2 ring-background">
              <AvatarImage src={order.customerAvatar} alt={order.customerName} />
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                {order.customerName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="truncate font-semibold">{order.customerName}</h3>
              <p className="font-mono text-xs text-muted-foreground">{order.orderNumber}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <PaymentStatusBadge status={order.paymentStatus} />
          <OrderStatusBadge status={order.orderStatus} />
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/40 p-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Total Amount</p>
            <p className="font-medium">₹{order.totalAmount.toLocaleString("en-IN")}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Profit</p>
            <p className="font-medium text-emerald-600 dark:text-emerald-400">
              ₹{order.profit.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{totalProducts} item{totalProducts !== 1 && 's'} • {order.orderDate}</span>
          <OrderAiInsightBadge insight={order.aiInsight} />
        </div>
      </CardContent>
    </Card>
  )
}
