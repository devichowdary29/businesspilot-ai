"use client"

import { Search, LayoutGrid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { OrderFilters, ViewMode, PaymentStatus, OrderStatus } from "./types"

interface OrdersToolbarProps {
  filters: OrderFilters
  onFiltersChange: (filters: OrderFilters) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  totalCount: number
  filteredCount: number
}

const paymentStatuses: PaymentStatus[] = ["Paid", "Pending", "Failed", "Refunded"]
const orderStatuses: OrderStatus[] = ["Processing", "Shipped", "Delivered", "Cancelled"]

export function OrdersToolbar({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
}: OrdersToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search ID, customer, or product..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-8"
            aria-label="Search orders"
          />
        </div>

        <Select
          value={filters.paymentStatus}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              paymentStatus: value as PaymentStatus | "All",
            })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Payments</SelectItem>
            {paymentStatuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.orderStatus}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              orderStatus: value as OrderStatus | "All",
            })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Order Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            {orderStatuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-xs text-muted-foreground">
          Showing {filteredCount} of {totalCount} orders
        </span>
      </div>

      <div className="flex items-center rounded-lg border p-0.5 shadow-sm">
        <Button
          variant={viewMode === "table" ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={() => onViewModeChange("table")}
          aria-label="Table view"
        >
          <List className="size-4" />
        </Button>
        <Button
          variant={viewMode === "grid" ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={() => onViewModeChange("grid")}
          aria-label="Grid view"
        >
          <LayoutGrid className="size-4" />
        </Button>
      </div>
    </div>
  )
}
