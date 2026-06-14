"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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
import { Loader2 } from "lucide-react"
import { createConversation } from "@/actions/ai/create-conversation"

interface CreateConversationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (newConversationId: string) => void
}

export function CreateConversationDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateConversationDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [title, setTitle] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (open) {
      setTitle("")
      setError(null)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Please enter a title")
      return
    }

    startTransition(async () => {
      setError(null)
      const response = await createConversation({ title })

      if (response.isSuccess) {
        onOpenChange(false)
        router.refresh()
        if (onSuccess && response.data) {
          onSuccess(response.data.id)
        }
      } else {
        setError(response.message)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
            <DialogDescription>
              Start a new AI advisor session. What would you like to discuss?
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Conversation Title</Label>
              <Input
                id="title"
                placeholder="e.g. Weekly Sales Review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isPending}
                maxLength={100}
                autoFocus
              />
              {error && (
                <p className="text-xs text-destructive mt-1">{error}</p>
              )}
            </div>
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
            <Button type="submit" disabled={isPending || !title.trim()}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isPending ? "Creating Conversation..." : "Create Conversation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
