"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Download, CheckCircle2 } from "lucide-react"

interface ExportReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportReportDialog({ open, onOpenChange }: ExportReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Exporting Report
          </DialogTitle>
          <DialogDescription>
            Your AI-generated business report is being prepared.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center justify-center space-y-4">
          <div className="relative size-16">
            <div className="absolute inset-0 rounded-full border-4 border-muted" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle2 className="size-6 text-primary animate-pulse" />
            </div>
          </div>
          <p className="text-sm font-medium">Compiling data and insights...</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled className="gap-2">
            <Download className="size-4" /> Download Ready Soon
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
