"use client"

import * as React from "react"
import { InventoryStats } from "@/components/inventory/inventory-stats"
import { InventoryForecastPanel } from "@/components/inventory/inventory-forecast-panel"
import { SupplierInfoCard } from "@/components/inventory/supplier-info-card"
import { InventoryToolbar } from "@/components/inventory/inventory-toolbar"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { InventoryCard } from "@/components/inventory/inventory-card"
import { RestockRecommendationDialog } from "@/components/inventory/restock-recommendation-dialog"
import { InventoryFormDialog } from "@/components/inventory/inventory-form-dialog"
import { InventoryDeleteDialog } from "@/components/inventory/inventory-delete-dialog"
import { inventoryStats } from "@/components/inventory/data"
import type { InventoryItem, InventoryFilters, ViewMode } from "@/components/inventory/types"
import type { AvailableProductForInventory } from "@/actions/inventory/types"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InventoryPageClientProps {
  initialItems: InventoryItem[]
  availableProducts: AvailableProductForInventory[]
}

export function InventoryPageClient({ initialItems, availableProducts }: InventoryPageClientProps) {
  const [items, setItems] = React.useState<InventoryItem[]>(initialItems)
  const [viewMode, setViewMode] = React.useState<ViewMode>("table")
  const [filters, setFilters] = React.useState<InventoryFilters>({
    search: "",
    category: "All",
    riskLevel: "All",
  })
  
  
  const [selectedItem, setSelectedItem] = React.useState<InventoryItem | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [isAddInventoryOpen, setIsAddInventoryOpen] = React.useState(false)
  const [inventoryToEdit, setInventoryToEdit] = React.useState<InventoryItem | null>(null)
  const [inventoryToDelete, setInventoryToDelete] = React.useState<InventoryItem | null>(null)

  React.useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch = 
        item.productName.toLowerCase().includes(searchLower) ||
        item.sku.toLowerCase().includes(searchLower) ||
        item.supplierName.toLowerCase().includes(searchLower)
      
      const matchesCategory = filters.category === "All" || item.category === filters.category
      const matchesRisk = filters.riskLevel === "All" || item.riskLevel === filters.riskLevel

      return matchesSearch && matchesCategory && matchesRisk
    })
  }, [items, filters])

  const handleAction = (item: InventoryItem, action: "view" | "reorder" | "edit" | "delete") => {
    setSelectedItem(item)
    if (action === "reorder") {
      setDialogOpen(true)
    } else if (action === "edit") {
      setInventoryToEdit(item)
      setIsAddInventoryOpen(true)
    } else if (action === "delete") {
      setInventoryToDelete(item)
    }
  }

  const handleOpenAddInventory = () => {
    setInventoryToEdit(null)
    setIsAddInventoryOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Inventory Intelligence Center</h2>
          <Button onClick={handleOpenAddInventory}>
            <Plus className="mr-2 size-4" />
            Add Inventory Tracking
          </Button>
        </div>
        <p className="text-muted-foreground">
          AI-powered supply chain management and automated forecasting.
        </p>
      </div>

      <InventoryStats stats={inventoryStats} />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <InventoryForecastPanel />
        </div>
        <div>
          <SupplierInfoCard />
        </div>
      </div>

      <InventoryToolbar
        filters={filters}
        onFiltersChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={items.length}
        filteredCount={filteredItems.length}
      />

      {filteredItems.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <h3 className="text-lg font-semibold">No inventory items found.</h3>
          <p className="text-sm text-muted-foreground">
            Try changing your filters or search terms.
          </p>
        </div>
      ) : viewMode === "table" ? (
        <InventoryTable
          items={filteredItems}
          onAction={handleAction}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <InventoryCard
              key={item.id}
              item={item}
              onAction={handleAction}
            />
          ))}
        </div>
      )}

      <RestockRecommendationDialog
        item={selectedItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <InventoryFormDialog
        open={isAddInventoryOpen}
        onOpenChange={(open) => {
          setIsAddInventoryOpen(open)
          if (!open) setInventoryToEdit(null)
        }}
        products={availableProducts}
        initialData={inventoryToEdit ? {
          id: inventoryToEdit.id,
          productId: "", // Fallback, not needed in UI display
          productName: inventoryToEdit.productName,
          quantity: inventoryToEdit.currentStock,
          minimumStock: inventoryToEdit.minimumStock,
          supplier: inventoryToEdit.supplierName,
          leadTimeDays: inventoryToEdit.supplierLeadTime,
          dailySalesAvg: inventoryToEdit.averageDailySales,
        } : undefined}
      />

      {inventoryToDelete && (
        <InventoryDeleteDialog
          inventoryId={inventoryToDelete.id}
          productName={inventoryToDelete.productName}
          currentQuantity={inventoryToDelete.currentStock}
          open={!!inventoryToDelete}
          onOpenChange={(open) => !open && setInventoryToDelete(null)}
        />
      )}
    </div>
  )
}
