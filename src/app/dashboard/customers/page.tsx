"use client"

import * as React from "react"
import { CustomerStats } from "@/components/customers/customer-stats"
import { CustomerToolbar } from "@/components/customers/customer-toolbar"
import { CustomerTable } from "@/components/customers/customer-table"
import { CustomerCard } from "@/components/customers/customer-card"
import { CustomerProfileDialog } from "@/components/customers/customer-profile-dialog"
import { customers as initialCustomers, customerStats } from "@/components/customers/data"
import type { Customer, CustomerFilters, ViewMode } from "@/components/customers/types"

export default function CustomersPage() {
  const [customers] = React.useState<Customer[]>(initialCustomers)
  const [viewMode, setViewMode] = React.useState<ViewMode>("table")
  const [filters, setFilters] = React.useState<CustomerFilters>({
    search: "",
    segment: "All",
  })
  
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)

  const filteredCustomers = React.useMemo(() => {
    return customers.filter((customer) => {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.toLowerCase().includes(searchLower)
      
      const matchesSegment = filters.segment === "All" || customer.segment === filters.segment

      return matchesSearch && matchesSegment
    })
  }, [customers, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">
          Manage your customer relationships and view AI-powered intelligence.
        </p>
      </div>

      <CustomerStats stats={customerStats} />

      <CustomerToolbar
        filters={filters}
        onFiltersChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={customers.length}
        filteredCount={filteredCustomers.length}
      />

      {filteredCustomers.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <h3 className="text-lg font-semibold">No customers found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : viewMode === "table" ? (
        <CustomerTable
          customers={filteredCustomers}
          onViewProfile={setSelectedCustomer}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onViewProfile={setSelectedCustomer}
            />
          ))}
        </div>
      )}

      <CustomerProfileDialog
        customer={selectedCustomer}
        open={!!selectedCustomer}
        onOpenChange={(open) => !open && setSelectedCustomer(null)}
      />
    </div>
  )
}
