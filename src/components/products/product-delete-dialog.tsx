"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ProductDeleteDialogProps {
  productName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function ProductDeleteDialog({
  productName,
  open,
  onOpenChange,
  onConfirm,
}: ProductDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex size-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/15">
            <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />
          </div>
          <DialogTitle>Delete Product?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &ldquo;{productName}&rdquo;? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
