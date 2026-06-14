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
import { createInventory } from "@/actions/inventory/create-inventory"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { AvailableProductForInventory } from "@/actions/inventory/types"

interface InventoryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  products: AvailableProductForInventory[]
}

export function InventoryFormDialog({
  open,
  onOpenChange,
  products,
}: InventoryFormDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  
  const [productId, setProductId] = React.useState<string>("")
  const [quantity, setQuantity] = React.useState<number>(0)
  const [minimumStock, setMinimumStock] = React.useState<number>(10)
  const [supplier, setSupplier] = React.useState<string>("")
  const [leadTimeDays, setLeadTimeDays] = React.useState<number>(7)
  const [dailySalesAvg, setDailySalesAvg] = React.useState<number>(0)
  
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    if (open) {
      setProductId("")
      setQuantity(0)
      setMinimumStock(10)
      setSupplier("")
      setLeadTimeDays(7)
      setDailySalesAvg(0)
      setErrors({})
    }
  }, [open])

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!productId) newErrors.productId = "Please select a product"
    if (quantity < 0) newErrors.quantity = "Quantity cannot be negative"
    if (minimumStock < 0) newErrors.minimumStock = "Minimum stock cannot be negative"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    startTransition(async () => {
      setErrors({})
      const response = await createInventory({
        productId,
        quantity,
        minimumStock,
        supplier: supplier || undefined,
        leadTimeDays: leadTimeDays || undefined,
        dailySalesAvg: dailySalesAvg || undefined,
      })

      if (response.isSuccess) {
        onOpenChange(false)
        router.refresh()
      } else {
        setErrors({ root: response.message })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Inventory Tracking</DialogTitle>
          <DialogDescription>
            Select a product to start tracking its inventory metrics.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {errors.root && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {errors.root}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="product">Product</Label>
            <Select
              value={productId}
              onValueChange={setProductId}
              disabled={isPending || products.length === 0}
            >
              <SelectTrigger id="product">
                <SelectValue placeholder={products.length > 0 ? "Select a product" : "No available products"} />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.productId && (
              <p className="text-xs text-destructive">{errors.productId}</p>
            )}
            {products.length === 0 && (
              <p className="text-xs text-muted-foreground">
                All your products are already being tracked. Create a new product first.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Current Stock</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                disabled={isPending}
              />
              {errors.quantity && (
                <p className="text-xs text-destructive">{errors.quantity}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="min-stock">Minimum Stock</Label>
              <Input
                id="min-stock"
                type="number"
                min="0"
                value={minimumStock}
                onChange={(e) => setMinimumStock(parseInt(e.target.value) || 0)}
                disabled={isPending}
              />
              {errors.minimumStock && (
                <p className="text-xs text-destructive">{errors.minimumStock}</p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="supplier">Supplier Name (Optional)</Label>
            <Input
              id="supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="e.g. Acme Corp"
              disabled={isPending}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="lead-time">Lead Time (Days)</Label>
              <Input
                id="lead-time"
                type="number"
                min="0"
                value={leadTimeDays}
                onChange={(e) => setLeadTimeDays(parseInt(e.target.value) || 0)}
                disabled={isPending}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sales-avg">Daily Sales Avg</Label>
              <Input
                id="sales-avg"
                type="number"
                min="0"
                step="0.1"
                value={dailySalesAvg}
                onChange={(e) => setDailySalesAvg(parseFloat(e.target.value) || 0)}
                disabled={isPending}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || products.length === 0}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isPending ? "Creating..." : "Start Tracking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
