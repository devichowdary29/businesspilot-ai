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
import { AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { deleteInventory } from "@/actions/inventory/delete-inventory"

interface InventoryDeleteDialogProps {
  inventoryId: string
  productName: string
  currentQuantity: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InventoryDeleteDialog({
  inventoryId,
  productName,
  currentQuantity,
  open,
  onOpenChange,
}: InventoryDeleteDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [error, setError] = React.useState<string | null>(null)

  const handleConfirm = () => {
    startTransition(async () => {
      setError(null)
      const response = await deleteInventory(inventoryId)

      if (response.isSuccess) {
        onOpenChange(false)
        router.refresh()
      } else {
        setError(response.message)
      }
    })
  }

  React.useEffect(() => {
    if (open) {
      setError(null)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/15">
              <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle>Stop Tracking Inventory?</DialogTitle>
              <DialogDescription className="mt-1">
                Are you sure you want to stop tracking this inventory?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="bg-muted/50 p-4 rounded-md my-2 text-sm border flex flex-col gap-1">
          <p><strong>Product:</strong> {productName}</p>
          <p><strong>Current Stock:</strong> {currentQuantity}</p>
          <p className="text-muted-foreground mt-2">
            This will only remove the inventory tracking. The product itself will remain intact.
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive mt-2">
            {error}
          </div>
        )}

        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isPending ? "Stopping Tracking..." : "Stop Tracking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
