"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InventoryHealthBadge } from "./inventory-health-badge"
import { Sparkles, Package, Calendar, ShoppingCart } from "lucide-react"
import type { InventoryItem } from "./types"

interface RestockRecommendationDialogProps {
  item: InventoryItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RestockRecommendationDialog({
  item,
  open,
  onOpenChange,
}: RestockRecommendationDialogProps) {
  if (!item) return null

  const orderQuantity = Math.max(item.minimumStock * 4, Math.ceil(item.averageDailySales * 30))
  const protectedRevenue = orderQuantity * (item.inventoryValue / item.currentStock || 1000)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2 border-b pb-4">
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="size-5" /> Create Purchase Order
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 pt-2">
          <div className="flex items-center gap-4">
            <img 
              src={item.productImage} 
              alt={item.productName} 
              className="size-16 rounded-xl border bg-muted object-cover"
            />
            <div>
              <h2 className="text-lg font-bold">{item.productName}</h2>
              <p className="text-sm text-muted-foreground font-mono">{item.sku}</p>
            </div>
            <div className="ml-auto">
              <InventoryHealthBadge level={item.riskLevel} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border bg-muted/20 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Package className="size-3.5" /> Current Situation
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Current stock:</span>
                  <span className="font-bold text-base">{item.currentStock} units</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Expected stockout:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-500">{item.daysUntilStockout} days</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-primary/5 border-primary/20 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Sparkles className="size-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5 relative z-10">
                <Sparkles className="size-3.5" /> AI Recommendation
              </h3>
              <p className="text-xs text-muted-foreground mb-3 relative z-10">Based on historical sales trends:</p>
              
              <div className="space-y-2 relative z-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">Recommended order:</span>
                  <span className="font-bold text-base text-primary">{orderQuantity} units</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Revenue protected:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    ₹{protectedRevenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Optimal purchase:</span>
                  <span className="font-semibold">Today</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3 text-sm flex gap-3">
            <Calendar className="size-4 shrink-0 text-muted-foreground mt-0.5" />
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">{item.supplierName}</span> has an average lead time of {item.supplierLeadTime} days. Ordering today ensures delivery before stockout.
            </p>
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-2 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground">
            <ShoppingCart className="size-4" />
            Create Purchase Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
