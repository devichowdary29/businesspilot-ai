"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CustomerSegmentBadge } from "./customer-segment-badge"
import { Sparkles, Mail, Phone } from "lucide-react"
import type { Customer } from "./types"

interface CustomerProfileDialogProps {
  customer: Customer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerProfileDialog({
  customer,
  open,
  onOpenChange,
}: CustomerProfileDialogProps) {
  if (!customer) return null

  // Generate dynamic recommendation
  let recommendation = "Send a generalized engagement campaign."
  if (customer.segment === "VIP") {
    recommendation = "Invite to exclusive VIP rewards program and offer early access to new products."
  } else if (customer.segment === "At Risk") {
    recommendation = "Send a personalized " + (customer.averageOrderValue > 10000 ? "15%" : "10%") + " win-back discount campaign."
  } else if (customer.segment === "New") {
    recommendation = "Send onboarding series and a follow-up check-in."
  } else if (customer.aiInsight === "Upsell Opportunity") {
    recommendation = "Recommend high-margin accessories based on past purchases."
  }

  // Generate insight text
  let insightText = `This customer has generated ₹${customer.totalSpent.toLocaleString("en-IN")} in lifetime revenue.`
  if (customer.riskScore > 70) {
    insightText += " Purchase frequency has declined significantly over the last 2 months."
  } else if (customer.riskScore < 30) {
    insightText += " Customer shows consistent and strong purchasing patterns."
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle className="sr-only">Customer Profile</DialogTitle>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="size-16 rounded-xl border-2 border-background ring-1 ring-border">
                <AvatarImage src={customer.avatar} alt={customer.name} />
                <AvatarFallback className="rounded-xl bg-primary/10 text-xl text-primary">
                  {customer.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{customer.name}</h2>
                <div className="mt-1 flex items-center gap-2">
                  <CustomerSegmentBadge segment={customer.segment} />
                  <span className="text-sm text-muted-foreground">
                    Since {customer.joinDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border bg-muted/20 p-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="size-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="size-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{customer.phone}</span>
            </div>
          </div>

          {/* Business Metrics */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Business Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border bg-card p-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Total Spent</p>
                <p className="mt-1 text-lg font-bold">₹{customer.totalSpent.toLocaleString("en-IN")}</p>
              </div>
              <div className="rounded-xl border bg-card p-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Orders</p>
                <p className="mt-1 text-lg font-bold">{customer.totalOrders}</p>
              </div>
              <div className="rounded-xl border bg-card p-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Average Order</p>
                <p className="mt-1 text-lg font-bold">₹{customer.averageOrderValue.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-purple-500" />
              <h3 className="text-sm font-semibold">AI Analysis</h3>
            </div>
            <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4 dark:border-purple-500/20 dark:bg-purple-500/5">
              <p className="mb-4 text-sm leading-relaxed text-foreground/90">
                {insightText}
              </p>
              <div className="rounded-lg bg-background p-3 ring-1 ring-border/50 shadow-sm">
                <p className="mb-1 text-xs font-semibold text-purple-700 dark:text-purple-400">
                  Recommended Action:
                </p>
                <p className="text-sm font-medium">
                  {recommendation}
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-2 flex justify-end gap-2 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="gap-2">
            <Mail className="size-4" />
            Contact Customer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
