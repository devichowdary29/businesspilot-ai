"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { createProduct } from "@/actions/products/create-product"
import { updateProduct } from "@/actions/products/update-product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import type { ProductFormData, ProductCategory, Product } from "./types"
import { categories, initialProductFormData } from "./types"

interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Product
}

export function ProductFormDialog({
  open,
  onOpenChange,
  initialData,
}: ProductFormDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [form, setForm] = React.useState<ProductFormData>(initialProductFormData)
  const [errors, setErrors] = React.useState<Partial<Record<keyof ProductFormData | "root", string>>>({})

  React.useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          name: initialData.name,
          description: initialData.description,
          category: initialData.category,
          sku: initialData.sku,
          price: initialData.price.toString(),
          costPrice: initialData.costPrice.toString(),
          stockQuantity: initialData.stockQuantity.toString(),
          minimumStock: initialData.minimumStock.toString(),
        })
      } else {
        setForm(initialProductFormData)
      }
      setErrors({})
    }
  }, [open, initialData])

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {}

    if (!form.name.trim()) newErrors.name = "Product name is required"
    if (!form.description.trim()) newErrors.description = "Description is required"
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price"
    if (!form.costPrice || Number(form.costPrice) <= 0)
      newErrors.costPrice = "Enter a valid cost price"
    if (!form.stockQuantity || Number(form.stockQuantity) < 0)
      newErrors.stockQuantity = "Enter valid stock"
    if (!form.minimumStock || Number(form.minimumStock) < 0)
      newErrors.minimumStock = "Enter valid minimum stock"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    startTransition(async () => {
      setErrors({})
      let response;

      let status: "ACTIVE" | "LOW_STOCK" | "OUT_OF_STOCK" | "DISCONTINUED" = "ACTIVE";
      const stock = Number(form.stockQuantity);
      const minStock = Number(form.minimumStock);
      if (stock === 0) status = "OUT_OF_STOCK";
      else if (stock <= minStock) status = "LOW_STOCK";
      
      if (initialData) {
        response = await updateProduct({
          id: initialData.id,
          name: form.name,
          description: form.description,
          category: form.category,
          price: Number(form.price),
          cost: Number(form.costPrice),
          status,
          isActive: true,
        })
      } else {
        const sku = `PROD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        response = await createProduct({
          name: form.name,
          description: form.description,
          category: form.category,
          sku,
          price: Number(form.price),
          cost: Number(form.costPrice),
          status,
          isActive: true,
        })
      }

      if (response.isSuccess) {
        setForm(initialProductFormData)
        setErrors({})
        onOpenChange(false)
        router.refresh()
      } else {
        setErrors({ root: response.message })
      }
    })
  }

  function handleOpenChange(value: boolean) {
    if (!value) {
      setForm(initialProductFormData)
      setErrors({})
    }
    onOpenChange(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update the details of your product." : "Fill in the details to add a new product to your catalog."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {errors.root && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {errors.root}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="e.g. Wireless Mouse"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              aria-invalid={!!errors.name}
              disabled={isPending}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              placeholder="Brief product description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={2}
              aria-invalid={!!errors.description}
              disabled={isPending}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-category">Category</Label>
            <Select
              value={form.category}
              onValueChange={(value) =>
                setForm({ ...form, category: value as ProductCategory })
              }
              disabled={isPending}
            >
              <SelectTrigger id="product-category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="product-price">Selling Price (₹)</Label>
              <Input
                id="product-price"
                type="number"
                min="0"
                step="1"
                placeholder="999"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                aria-invalid={!!errors.price}
                disabled={isPending}
              />
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-cost">Cost Price (₹)</Label>
              <Input
                id="product-cost"
                type="number"
                min="0"
                step="1"
                placeholder="450"
                value={form.costPrice}
                onChange={(e) =>
                  setForm({ ...form, costPrice: e.target.value })
                }
                aria-invalid={!!errors.costPrice}
                disabled={isPending}
              />
              {errors.costPrice && (
                <p className="text-xs text-destructive">{errors.costPrice}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="product-stock">Stock Quantity</Label>
              <Input
                id="product-stock"
                type="number"
                min="0"
                step="1"
                placeholder="100"
                value={form.stockQuantity}
                onChange={(e) =>
                  setForm({ ...form, stockQuantity: e.target.value })
                }
                aria-invalid={!!errors.stockQuantity}
                disabled={isPending}
              />
              {errors.stockQuantity && (
                <p className="text-xs text-destructive">
                  {errors.stockQuantity}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-min-stock">Minimum Stock</Label>
              <Input
                id="product-min-stock"
                type="number"
                min="0"
                step="1"
                placeholder="10"
                value={form.minimumStock}
                onChange={(e) =>
                  setForm({ ...form, minimumStock: e.target.value })
                }
                aria-invalid={!!errors.minimumStock}
                disabled={isPending}
              />
              {errors.minimumStock && (
                <p className="text-xs text-destructive">
                  {errors.minimumStock}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isPending ? (initialData ? "Updating..." : "Creating...") : (initialData ? "Save Changes" : "Create Product")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
