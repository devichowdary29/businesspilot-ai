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
import type { CustomerFilters, ViewMode, CustomerSegment } from "./types"

interface CustomerToolbarProps {
  filters: CustomerFilters
  onFiltersChange: (filters: CustomerFilters) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  totalCount: number
  filteredCount: number
}

const segments: CustomerSegment[] = ["VIP", "Loyal", "New", "At Risk"]

export function CustomerToolbar({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
}: CustomerToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-8"
            aria-label="Search customers"
          />
        </div>

        <Select
          value={filters.segment}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              segment: value as CustomerSegment | "All",
            })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Segments</SelectItem>
            {segments.map((seg) => (
              <SelectItem key={seg} value={seg}>
                {seg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-xs text-muted-foreground">
          Showing {filteredCount} of {totalCount} customers
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
