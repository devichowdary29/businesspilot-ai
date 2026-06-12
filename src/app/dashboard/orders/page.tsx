"use client"

import * as React from "react"
import { OrderStats } from "@/components/orders/orders-stats"
import { RevenueSummary } from "@/components/orders/revenue-summary"
import { OrdersToolbar } from "@/components/orders/orders-toolbar"
import { OrdersTable } from "@/components/orders/orders-table"
import { OrderCard } from "@/components/orders/order-card"
import { OrderDetailsDialog } from "@/components/orders/order-details-dialog"
import { orders as initialOrders, orderStats } from "@/components/orders/data"
import type { Order, OrderFilters, ViewMode } from "@/components/orders/types"

export default function OrdersPage() {
  const [orders] = React.useState<Order[]>(initialOrders)
  const [viewMode, setViewMode] = React.useState<ViewMode>("table")
  const [filters, setFilters] = React.useState<OrderFilters>({
    search: "",
    paymentStatus: "All",
    orderStatus: "All",
  })
  
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null)

  const filteredOrders = React.useMemo(() => {
    return orders.filter((order) => {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customerName.toLowerCase().includes(searchLower) ||
        order.products.some(p => p.name.toLowerCase().includes(searchLower))
      
      const matchesPayment = filters.paymentStatus === "All" || order.paymentStatus === filters.paymentStatus
      const matchesStatus = filters.orderStatus === "All" || order.orderStatus === filters.orderStatus

      return matchesSearch && matchesPayment && matchesStatus
    })
  }, [orders, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Orders & Revenue</h2>
        <p className="text-muted-foreground">
          Complete visibility over your revenue pipeline and order fulfillment.
        </p>
      </div>

      <OrderStats stats={orderStats} />
      
      <div className="grid gap-6">
        <RevenueSummary />
      </div>

      <OrdersToolbar
        filters={filters}
        onFiltersChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={orders.length}
        filteredCount={filteredOrders.length}
      />

      {filteredOrders.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <h3 className="text-lg font-semibold">No orders found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : viewMode === "table" ? (
        <OrdersTable
          orders={filteredOrders}
          onViewOrder={setSelectedOrder}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewOrder={setSelectedOrder}
            />
          ))}
        </div>
      )}

      <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      />
    </div>
  )
}
