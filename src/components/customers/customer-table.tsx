"use client"

import { MoreHorizontal, Mail, Phone, CalendarCheck } from "lucide-react"
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
import { CustomerSegmentBadge } from "./customer-segment-badge"
import { CustomerAiInsight } from "./customer-ai-insight"
import type { Customer } from "./types"

interface CustomerTableProps {
  customers: Customer[]
  onViewProfile: (customer: Customer) => void
}

export function CustomerTable({ customers, onViewProfile }: CustomerTableProps) {
  return (
    <div className="rounded-xl border bg-card ring-1 ring-foreground/[0.06]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead className="text-right">Orders</TableHead>
            <TableHead className="text-right">Lifetime Value</TableHead>
            <TableHead className="hidden text-right md:table-cell">
              Average Order
            </TableHead>
            <TableHead className="hidden md:table-cell">Last Purchase</TableHead>
            <TableHead className="hidden lg:table-cell">AI Insight</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="group cursor-pointer" onClick={() => onViewProfile(customer)}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 rounded-lg">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                      {customer.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{customer.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {customer.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <CustomerSegmentBadge segment={customer.segment} />
              </TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                {customer.totalOrders}
              </TableCell>
              <TableCell className="text-right font-medium">
                ₹{customer.totalSpent.toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="hidden text-right text-muted-foreground md:table-cell">
                ₹{customer.averageOrderValue.toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {customer.lastPurchaseDate}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <CustomerAiInsight insight={customer.aiInsight} />
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                      aria-label={`Actions for ${customer.name}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onViewProfile(customer)}>
                      <CalendarCheck className="mr-2 size-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mail className="mr-2 size-4" />
                      Contact via Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Phone className="mr-2 size-4" />
                      Contact via Phone
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
