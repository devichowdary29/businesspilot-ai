import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { OrderData } from "./types"

interface RecentOrdersTableProps {
  orders: OrderData[]
}

const statusStyles: Record<
  OrderData["status"],
  { className: string }
> = {
  Paid: {
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  Pending: {
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  },
  Delivered: {
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400",
  },
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <Card className="transition-shadow duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest transactions across your store</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs font-medium">
                  {order.id}
                </TableCell>
                <TableCell className="font-medium">{order.customer}</TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {order.product}
                </TableCell>
                <TableCell className="font-medium">{order.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusStyles[order.status].className}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {order.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
