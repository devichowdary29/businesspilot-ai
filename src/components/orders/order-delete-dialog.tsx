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
import { deleteOrder } from "@/actions/orders/delete-order"

interface OrderDeleteDialogProps {
  orderId: string
  orderNumber: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDeleteDialog({
  orderId,
  orderNumber,
  open,
  onOpenChange,
}: OrderDeleteDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [error, setError] = React.useState<string | null>(null)

  const handleConfirm = () => {
    startTransition(async () => {
      setError(null)
      const response = await deleteOrder(orderId)

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
              <DialogTitle>Delete Order?</DialogTitle>
              <DialogDescription className="mt-1">
                Are you sure you want to delete order <strong>{orderNumber}</strong>? This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

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
            {isPending ? "Deleting Order..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
