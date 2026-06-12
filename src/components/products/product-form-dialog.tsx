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
import type { ProductFormData, ProductCategory } from "./types"
import { categories, initialProductFormData } from "./types"

interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ProductFormData) => void
}

export function ProductFormDialog({
  open,
  onOpenChange,
  onSubmit,
}: ProductFormDialogProps) {
  const [form, setForm] = React.useState<ProductFormData>(initialProductFormData)
  const [errors, setErrors] = React.useState<Partial<Record<keyof ProductFormData, string>>>({})

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
    if (validate()) {
      onSubmit(form)
      setForm(initialProductFormData)
      setErrors({})
      onOpenChange(false)
    }
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
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product to your catalog.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="e.g. Wireless Mouse"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              aria-invalid={!!errors.name}
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
            >
              Cancel
            </Button>
            <Button type="submit">Create Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
