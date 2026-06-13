"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductsToolbar } from "@/components/products/products-toolbar"
import { ProductsTable } from "@/components/products/products-table"
import { ProductCard } from "@/components/products/product-card"
import { ProductFormDialog } from "@/components/products/product-form-dialog"
import { ProductDeleteDialog } from "@/components/products/product-delete-dialog"
import { deriveStatus } from "@/components/products/data"
import type { Product, ProductFilters, ViewMode, ProductFormData } from "@/components/products/types"

interface ProductsPageClientProps {
  initialProducts: Product[]
}

export function ProductsPageClient({ initialProducts }: ProductsPageClientProps) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts)

  React.useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const [viewMode, setViewMode] = React.useState<ViewMode>("table")
  const [filters, setFilters] = React.useState<ProductFilters>({
    search: "",
    category: "All",
    status: "All",
  })
  
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [productToEdit, setProductToEdit] = React.useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null)

  const handleEdit = (product: Product) => {
    setProductToEdit(product)
    setIsAddDialogOpen(true)
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) setProductToEdit(null)
    setIsAddDialogOpen(open)
  }

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesCategory = filters.category === "All" || product.category === filters.category
      const matchesStatus = filters.status === "All" || product.status === filters.status

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, filters])

  // Delete is now handled natively in ProductDeleteDialog via Server Action

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your inventory and product catalog.
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

      <ProductsToolbar
        filters={filters}
        onFiltersChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={products.length}
        filteredCount={filteredProducts.length}
      />

      {filteredProducts.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <h3 className="text-lg font-semibold">No products found</h3>
          <p className="text-sm text-muted-foreground">
            Try changing your search or filters.
          </p>
        </div>
      ) : viewMode === "table" ? (
        <ProductsTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={(product) => setProductToDelete(product)}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={(product) => setProductToDelete(product)}
            />
          ))}
        </div>
      )}

      <ProductFormDialog
        open={isAddDialogOpen}
        onOpenChange={handleDialogOpenChange}
        initialData={productToEdit ?? undefined}
      />

      <ProductDeleteDialog
        productId={productToDelete?.id ?? ""}
        productName={productToDelete?.name ?? ""}
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
      />
    </div>
  )
}
