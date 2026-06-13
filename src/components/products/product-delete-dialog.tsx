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
import { deleteProduct } from "@/actions/products/delete-product"
import { useRouter } from "next/navigation"

interface ProductDeleteDialogProps {
  productId: string
  productName: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductDeleteDialog({
  productId,
  productName,
  open,
  onOpenChange,
}: ProductDeleteDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (open) setError(null)
  }, [open])

  function handleDelete() {
    startTransition(async () => {
      setError(null)
      const response = await deleteProduct(productId)
      if (response.isSuccess) {
        onOpenChange(false)
        router.refresh()
      } else {
        setError(response.message)
      }
    })
  }

  function handleOpenChange(openState: boolean) {
    if (!openState) setError(null)
    onOpenChange(openState)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
