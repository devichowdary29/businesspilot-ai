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
import { createCustomer } from "@/actions/customers/create-customer"
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
import { Loader2 } from "lucide-react"
import type { CustomerFormData, CustomerSegment } from "./types"
import { initialCustomerFormData } from "./types"
import { CustomerSegment as PrismaCustomerSegment } from "@prisma/client"

interface CustomerFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const segments: CustomerSegment[] = ["New", "Loyal", "VIP", "At Risk"]

export function CustomerFormDialog({
  open,
  onOpenChange,
}: CustomerFormDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [form, setForm] = React.useState<CustomerFormData>(initialCustomerFormData)
  const [errors, setErrors] = React.useState<Partial<Record<keyof CustomerFormData | "root", string>>>({})

  React.useEffect(() => {
    if (open) {
      setForm(initialCustomerFormData)
      setErrors({})
    }
  }, [open])

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CustomerFormData, string>> = {}

    if (!form.name.trim()) newErrors.name = "Customer name is required"
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    startTransition(async () => {
      setErrors({})
      
      const prismaSegment = 
        form.segment === "New" ? PrismaCustomerSegment.NEW :
        form.segment === "Loyal" ? PrismaCustomerSegment.LOYAL :
        form.segment === "VIP" ? PrismaCustomerSegment.VIP :
        PrismaCustomerSegment.AT_RISK;

      const response = await createCustomer({
        name: form.name,
        email: form.email || null,
        phone: form.phone || null,
        segment: prismaSegment,
      })

      if (response.isSuccess) {
        setForm(initialCustomerFormData)
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
      setForm(initialCustomerFormData)
      setErrors({})
    }
    onOpenChange(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Enter the details to register a new customer in your organization.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {errors.root && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {errors.root}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="customer-name">Customer Name</Label>
            <Input
              id="customer-name"
              placeholder="e.g. John Doe"
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
            <Label htmlFor="customer-email">Email Address</Label>
            <Input
              id="customer-email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-invalid={!!errors.email}
              disabled={isPending}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="customer-phone">Phone Number</Label>
            <Input
              id="customer-phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              aria-invalid={!!errors.phone}
              disabled={isPending}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="customer-segment">Segment</Label>
            <Select
              value={form.segment}
              onValueChange={(value) =>
                setForm({ ...form, segment: value as CustomerSegment })
              }
              disabled={isPending}
            >
              <SelectTrigger id="customer-segment" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {segments.map((seg) => (
                  <SelectItem key={seg} value={seg}>
                    {seg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              {isPending ? "Creating..." : "Create Customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
