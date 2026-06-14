"use client";

import { useState, useTransition } from "react";
import { generateExecutiveReport } from "@/actions/ai/generate-executive-report";
import { ExecutiveReportData } from "@/actions/ai/types";
import { ReportViewer } from "./report-viewer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, AlertCircle, FileText } from "lucide-react";

export function ReportsPageClient() {
  const [reportData, setReportData] = useState<ExecutiveReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerateReport = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await generateExecutiveReport();
        if (result.isSuccess && result.data) {
          setReportData(result.data);
        } else {
          setError(result.message || "Unable to generate executive report.");
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again later.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <Card className="overflow-hidden border-primary/10 bg-gradient-to-b from-primary/5 via-primary/5 to-background transition-shadow duration-200">
        <CardContent className="p-8 sm:p-12 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Sparkles className="size-8" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            AI Executive Reports
          </h2>
          <p className="mx-auto mb-8 max-w-[600px] text-base text-muted-foreground md:text-lg">
            Generate strategic business intelligence powered by BusinessPilot AI and Groq LLM. Analyzes revenue, inventory, and customer metrics to provide actionable insights.
          </p>
          <Button
            size="lg"
            onClick={handleGenerateReport}
            disabled={isPending}
            className="h-12 min-w-[240px] gap-2 rounded-full shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-primary/25"
          >
            {isPending ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Generating Executive Report...
              </>
            ) : (
              <>
                <Sparkles className="size-5" />
                Generate AI Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="size-4" />
          <p className="font-medium">
            {error} Please try again later.
          </p>
        </div>
      )}

      {/* Report Viewer or Empty State */}
      {reportData ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ReportViewer data={reportData} />
        </div>
      ) : (
        !isPending && !error && (
          <Card className="flex flex-col items-center justify-center border-dashed py-24 text-center bg-muted/30">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <FileText className="size-8 opacity-50" />
            </div>
            <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground">
              No Executive Report Generated
            </h3>
            <p className="max-w-[400px] text-sm text-muted-foreground">
              Click &quot;Generate AI Report&quot; above to deeply analyze your organization&apos;s data using AI.
            </p>
          </Card>
        )
      )}
    </div>
  );
}
