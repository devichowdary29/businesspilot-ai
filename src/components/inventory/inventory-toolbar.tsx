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
import type { InventoryFilters, ViewMode, InventoryCategory, RiskLevel } from "./types"

interface InventoryToolbarProps {
  filters: InventoryFilters
  onFiltersChange: (filters: InventoryFilters) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  totalCount: number
  filteredCount: number
}

const categories: InventoryCategory[] = ["Electronics", "Accessories", "Audio", "Storage", "Wearables"]
const riskLevels: RiskLevel[] = ["Healthy", "Watch", "Low", "Critical"]

export function InventoryToolbar({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
}: InventoryToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search product, SKU, or supplier..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-8"
            aria-label="Search inventory"
          />
        </div>

        <Select
          value={filters.category}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              category: value as InventoryCategory | "All",
            })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.riskLevel}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              riskLevel: value as RiskLevel | "All",
            })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Risks</SelectItem>
            {riskLevels.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-xs text-muted-foreground">
          Showing {filteredCount} of {totalCount} items
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
