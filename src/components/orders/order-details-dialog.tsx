"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PaymentStatusBadge, OrderStatusBadge } from "./order-status-badge"
import { Sparkles, Download, RotateCcw, Package } from "lucide-react"
import type { Order } from "./types"

interface OrderDetailsDialogProps {
  order: Order | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  if (!order) return null

  // Generate dynamic recommendation based on AI Insight / Margin
  let recommendation = "Standard processing recommended."
  let insightText = `This order generated ₹${order.profit.toLocaleString("en-IN")} in profit.`
  
  if (order.profit / order.totalAmount > 0.4) {
    recommendation = "High-value customer. Recommend offering a loyalty reward."
    insightText = "High profit margin order."
  } else if (order.profit / order.totalAmount < 0.2) {
    recommendation = "Consider bundling products to improve margin."
    insightText = "Low profit order. Margin is below average."
  } else {
    recommendation = "Send an automated feedback request post-delivery."
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-2">
          <DialogTitle className="sr-only">Order Details</DialogTitle>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold font-mono">{order.orderNumber}</h2>
                <span className="text-sm text-muted-foreground">{order.orderDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <PaymentStatusBadge status={order.paymentStatus} />
                <OrderStatusBadge status={order.orderStatus} />
              </div>
            </div>
            
            <div className="flex items-center gap-3 rounded-lg border p-2 shadow-sm bg-muted/20">
              <Avatar className="size-10 rounded-md">
                <AvatarImage src={order.customerAvatar} alt={order.customerName} />
                <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                  {order.customerName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="pr-2">
                <p className="text-sm font-semibold">{order.customerName}</p>
                <p className="text-xs text-muted-foreground">Customer</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Order Information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-2">
              <Package className="size-4" /> Products
            </h3>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left font-medium p-3">Item</th>
                    <th className="text-center font-medium p-3 w-20">Qty</th>
                    <th className="text-right font-medium p-3 w-32">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.products.map((p, idx) => (
                    <tr key={idx}>
                      <td className="p-3">{p.name}</td>
                      <td className="text-center p-3">{p.quantity}</td>
                      <td className="text-right p-3">₹{p.price.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted/10">
                  <tr>
                    <td colSpan={2} className="text-right p-3 font-semibold text-muted-foreground">Total</td>
                    <td className="text-right p-3 font-bold text-lg">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <p className="text-xs text-muted-foreground mb-1">Profit Earned</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                ₹{order.profit.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <p className="text-xs text-muted-foreground mb-1">Delivery Info</p>
              <p className="text-sm font-medium">
                {order.orderStatus === "Delivered" ? `Delivered on ${order.deliveryDate}` : 
                 order.orderStatus === "Cancelled" ? "Cancelled" : `Expected by ${order.deliveryDate}`}
              </p>
            </div>
          </div>

          {/* AI Analysis */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-purple-500" />
              <h3 className="text-sm font-semibold">AI Analysis</h3>
            </div>
            <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4 dark:border-purple-500/20 dark:bg-purple-500/5">
              <p className="mb-4 text-sm leading-relaxed text-foreground/90">
                {insightText}
              </p>
              <div className="rounded-lg bg-background p-3 ring-1 ring-border/50 shadow-sm">
                <p className="mb-1 text-xs font-semibold text-purple-700 dark:text-purple-400">
                  Recommended Action:
                </p>
                <p className="text-sm font-medium">
                  {recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex justify-between gap-2 border-t pt-4">
          <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
            <RotateCcw className="size-4 mr-2" /> Refund
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button className="gap-2">
              <Download className="size-4" />
              Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
