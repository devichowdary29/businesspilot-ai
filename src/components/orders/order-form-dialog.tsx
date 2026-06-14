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
import { createOrder } from "@/actions/orders/create-order"
import { updateOrder } from "@/actions/orders/update-order"
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
import { Loader2, Plus, Trash2 } from "lucide-react"
import type { AvailableCustomer, AvailableProduct } from "@/actions/orders/types"
import type { Order } from "@/components/orders/types"

interface OrderFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customers: AvailableCustomer[]
  products: AvailableProduct[]
  initialData?: Order
}

export function OrderFormDialog({
  open,
  onOpenChange,
  customers,
  products,
  initialData,
}: OrderFormDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  
  const [customerId, setCustomerId] = React.useState<string>("")
  const [items, setItems] = React.useState<Array<{ productId: string; quantity: number }>>([])
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const isEdit = !!initialData

  React.useEffect(() => {
    if (open) {
      if (initialData) {
        setCustomerId(initialData.customerId)
        setItems(initialData.products.map(p => ({
          productId: p.productId,
          quantity: p.quantity,
        })))
      } else {
        setCustomerId("")
        setItems([])
      }
      setErrors({})
    }
  }, [open, initialData])

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!customerId) newErrors.customer = "Please select a customer"
    if (items.length === 0) newErrors.items = "Please add at least one product"
    
    items.forEach((item, index) => {
      if (!item.productId) newErrors[`item-${index}`] = "Please select a product"
      if (item.quantity < 1) newErrors[`qty-${index}`] = "Quantity must be at least 1"
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    startTransition(async () => {
      setErrors({})
      
      const payload = {
        customerId,
        items,
      }

      const response = initialData
        ? await updateOrder({ id: initialData.id, ...payload })
        : await createOrder(payload)

      if (response.isSuccess) {
        onOpenChange(false)
        router.refresh()
      } else {
        setErrors({ root: response.message })
      }
    })
  }

  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: "productId" | "quantity", value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const totalPreview = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId)
    if (product) {
      return sum + (product.price * item.quantity)
    }
    return sum
  }, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update Order" : "Create New Order"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Modify the details of the selected order." : "Select a customer and add products to create a new order."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {errors.root && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {errors.root}
            </div>
          )}

          {/* Customer Selection */}
          <div className="grid gap-2">
            <Label htmlFor="customer-select">Customer</Label>
            <Select
              value={customerId}
              onValueChange={setCustomerId}
              disabled={isPending}
            >
              <SelectTrigger id="customer-select" className="w-full">
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.customer && (
              <p className="text-xs text-destructive">{errors.customer}</p>
            )}
          </div>

          {/* Order Items */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Order Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem} disabled={isPending}>
                <Plus className="mr-2 size-4" />
                Add Product
              </Button>
            </div>
            
            {errors.items && (
              <p className="text-xs text-destructive">{errors.items}</p>
            )}

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className="flex-1 grid gap-2">
                    <Select
                      value={item.productId}
                      onValueChange={(val) => updateItem(index, "productId", val)}
                      disabled={isPending}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} - ₹{p.price.toLocaleString("en-IN")} ({p.stock} in stock)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors[`item-${index}`] && (
                      <p className="text-xs text-destructive">{errors[`item-${index}`]}</p>
                    )}
                  </div>
                  
                  <div className="w-24 grid gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                      disabled={isPending}
                    />
                    {errors[`qty-${index}`] && (
                      <p className="text-xs text-destructive">{errors[`qty-${index}`]}</p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeItem(index)}
                    disabled={isPending}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="flex justify-end border-t pt-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Order Total Preview</p>
                  <p className="text-xl font-bold">₹{totalPreview.toLocaleString("en-IN")}</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isPending ? (isEdit ? "Updating Order..." : "Creating Order...") : (isEdit ? "Update Order" : "Create Order")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
