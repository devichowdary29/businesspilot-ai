"use client"

import { MoreHorizontal, FileText, ShoppingCart, Mail, Eye, Edit } from "lucide-react"
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
import { InventoryHealthBadge } from "./inventory-health-badge"
import type { InventoryItem } from "./types"

interface InventoryTableProps {
  items: InventoryItem[]
  onAction: (item: InventoryItem, action: "view" | "reorder" | "edit") => void
}

export function InventoryTable({ items, onAction }: InventoryTableProps) {
  return (
    <div className="rounded-xl border bg-card ring-1 ring-foreground/[0.06] overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="hidden md:table-cell">Supplier</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead className="hidden md:table-cell text-right">Days Left</TableHead>
            <TableHead className="hidden text-right xl:table-cell">Value</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead className="hidden lg:table-cell">AI Recommendation</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="group cursor-pointer" onClick={() => onAction(item, "view")}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 rounded-lg border bg-muted">
                    <AvatarImage src={item.productImage} alt={item.productName} className="object-cover" />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs">
                      {item.productName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium truncate max-w-[150px]">{item.productName}</p>
                    <p className="font-mono text-xs text-muted-foreground">{item.sku}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="text-sm truncate max-w-[120px] inline-block">{item.supplierName}</span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{item.currentStock}</span>
                  <span className="text-[10px] text-muted-foreground">Min: {item.minimumStock}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-right font-medium">
                {item.daysUntilStockout}
              </TableCell>
              <TableCell className="hidden text-right font-medium text-emerald-600 dark:text-emerald-400 xl:table-cell">
                ₹{item.inventoryValue.toLocaleString("en-IN")}
              </TableCell>
              <TableCell>
                <InventoryHealthBadge level={item.riskLevel} />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="text-sm text-muted-foreground max-w-[200px] truncate block">
                  {item.aiRecommendation}
                </span>
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                      aria-label={`Actions for ${item.productName}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => onAction(item, "view")}>
                      <Eye className="mr-2 size-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction(item, "edit")}>
                      <Edit className="mr-2 size-4" />
                      Edit Inventory
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction(item, "reorder")}>
                      <ShoppingCart className="mr-2 size-4" />
                      Create Purchase Order
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mail className="mr-2 size-4" />
                      Contact Supplier
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 size-4" />
                      Generate Forecast
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
