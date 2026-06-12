"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductsToolbar } from "@/components/products/products-toolbar"
import { ProductsTable } from "@/components/products/products-table"
import { ProductCard } from "@/components/products/product-card"
import { ProductFormDialog } from "@/components/products/product-form-dialog"
import { ProductDeleteDialog } from "@/components/products/product-delete-dialog"
import { products as initialProducts, deriveStatus } from "@/components/products/data"
import type { Product, ProductFilters, ViewMode, ProductFormData } from "@/components/products/types"

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>(initialProducts)
  const [viewMode, setViewMode] = React.useState<ViewMode>("table")
  const [filters, setFilters] = React.useState<ProductFilters>({
    search: "",
    category: "All",
    status: "All",
  })
  
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null)

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesCategory = filters.category === "All" || product.category === filters.category
      const matchesStatus = filters.status === "All" || product.status === filters.status

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, filters])

  const handleAddProduct = (data: ProductFormData) => {
    const newProduct: Product = {
      id: `PROD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      name: data.name,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      costPrice: Number(data.costPrice),
      stockQuantity: Number(data.stockQuantity),
      minimumStock: Number(data.minimumStock),
      status: deriveStatus(Number(data.stockQuantity), Number(data.minimumStock)),
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      aiInsight: { type: "trending", label: "New Product", emoji: "✨" },
      createdAt: new Date().toISOString().split("T")[0],
    }
    
    setProducts([newProduct, ...products])
  }

  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id))
      setProductToDelete(null)
    }
  }

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
          onEdit={(product) => void product}
          onDelete={(product) => setProductToDelete(product)}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(product) => void product}
              onDelete={(product) => setProductToDelete(product)}
            />
          ))}
        </div>
      )}

      <ProductFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddProduct}
      />

      <ProductDeleteDialog
        productName={productToDelete?.name ?? ""}
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
      />
    </div>
  )
}
