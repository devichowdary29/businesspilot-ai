"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ConversationSidebar } from "@/components/ai/conversation-sidebar"
import { AiChat } from "@/components/ai/ai-chat"
import { ExportReportDialog } from "@/components/ai/export-report-dialog"
import { historyItems } from "@/components/ai/data"

export default function AiAdvisorPage() {
  const [activeId, setActiveId] = React.useState<string | undefined>(undefined)
  const [exportOpen, setExportOpen] = React.useState(false)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  const handleSelectConversation = (id: string) => {
    setActiveId(id)
    setIsMobileOpen(false)
  }

  const handleNewConversation = () => {
    setActiveId(undefined)
    setIsMobileOpen(false)
  }

  const handleExportReport = () => {
    setExportOpen(true)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row -mx-4 md:-mx-8 -mb-4 overflow-hidden rounded-xl border bg-background shadow-sm ring-1 ring-border/50">
      
      {/* Mobile Sidebar Trigger */}
      <div className="flex items-center gap-2 border-b bg-muted/10 p-3 md:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <ConversationSidebar 
              history={historyItems} 
              activeId={activeId}
              onSelect={handleSelectConversation}
              onNew={handleNewConversation}
            />
          </SheetContent>
        </Sheet>
        <span className="font-semibold text-sm">AI Business Advisor</span>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden w-72 shrink-0 border-r md:block">
        <ConversationSidebar 
          history={historyItems} 
          activeId={activeId}
          onSelect={handleSelectConversation}
          onNew={handleNewConversation}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-gradient-to-br from-background via-background to-primary/[0.01] overflow-hidden">
        <AiChat onExportReport={handleExportReport} />
      </div>

      {/* Dialogs */}
      <ExportReportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  )
}
