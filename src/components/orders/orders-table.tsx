"use client"

import { MoreHorizontal, Download, RotateCcw, Mail, Eye } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PaymentStatusBadge, OrderStatusBadge, OrderAiInsightBadge } from "./order-status-badge"
import type { Order } from "./types"

interface OrdersTableProps {
  orders: Order[]
  onViewOrder: (order: Order) => void
}

export function OrdersTable({ orders, onViewOrder }: OrdersTableProps) {
  return (
    <div className="rounded-xl border bg-card ring-1 ring-foreground/[0.06]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Products</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="hidden text-right xl:table-cell">Profit</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden lg:table-cell">AI Insight</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="group cursor-pointer" onClick={() => onViewOrder(order)}>
              <TableCell className="font-mono text-xs font-medium">
                {order.orderNumber}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src={order.customerAvatar} alt={order.customerName} />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                      {order.customerName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate font-medium">{order.customerName}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                  {order.products.map(p => `${p.quantity}x ${p.name}`).join(', ')}
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="hidden text-right font-medium text-emerald-600 dark:text-emerald-400 xl:table-cell">
                ₹{order.profit.toLocaleString("en-IN")}
              </TableCell>
              <TableCell>
                <PaymentStatusBadge status={order.paymentStatus} />
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.orderStatus} />
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell text-xs">
                {order.orderDate}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <OrderAiInsightBadge insight={order.aiInsight} />
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                      aria-label={`Actions for ${order.orderNumber}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onViewOrder(order)}>
                      <Eye className="mr-2 size-4" />
                      View Order
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 size-4" />
                      Download Invoice
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mail className="mr-2 size-4" />
                      Contact Customer
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RotateCcw className="mr-2 size-4" />
                      Refund Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
