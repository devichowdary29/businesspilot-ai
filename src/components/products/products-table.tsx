"use client"

import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProductStatusBadge } from "./product-status-badge"
import type { Product, AiInsightType } from "./types"

interface ProductsTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

const aiInsightStyles: Record<AiInsightType, string> = {
  trending:
    "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-400",
  restock:
    "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  "slow-moving":
    "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-400",
  "bundle-opportunity":
    "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400",
}

export function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  return (
    <div className="rounded-xl border bg-card ring-1 ring-foreground/[0.06]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[280px]">Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="hidden text-right md:table-cell">
              Cost
            </TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">AI Insight</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="group">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {product.category}
              </TableCell>
              <TableCell className="text-right font-medium">
                ₹{product.price.toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="hidden text-right text-muted-foreground md:table-cell">
                ₹{product.costPrice.toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                {product.stockQuantity}
              </TableCell>
              <TableCell>
                <ProductStatusBadge status={product.status} />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge
                  variant="secondary"
                  className={aiInsightStyles[product.aiInsight.type]}
                >
                  {product.aiInsight.emoji} {product.aiInsight.label}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
                      aria-label={`Actions for ${product.name}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>
                      <Eye className="mr-2 size-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(product)}>
                      <Pencil className="mr-2 size-4" />
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete(product)}
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete Product
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
