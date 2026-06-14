"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Copy, Check, Calendar, Cpu, Layers, Download, Loader2 } from "lucide-react";
import { ExecutiveReportData } from "@/actions/ai/types";
import { generateExecutiveReportPdf } from "@/lib/pdf/generate-executive-report-pdf";

export interface ReportViewerProps {
  data: ExecutiveReportData;
}

export function ReportViewer({ data }: ReportViewerProps) {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      setPdfError(null);
      // Adding a small delay so the loading state renders, since jsPDF is synchronous and blocks the thread
      await new Promise(resolve => setTimeout(resolve, 50));
      
      generateExecutiveReportPdf({
        report: data.report,
        generatedAt: data.generatedAt,
        provider: data.provider,
        model: data.model,
      });
    } catch (err) {
      console.error("Failed to generate PDF", err);
      setPdfError("Failed to generate PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(data.generatedAt));

  return (
    <Card className="flex flex-col border-primary/10 bg-background/50 shadow-sm transition-all">
      <CardHeader className="border-b bg-muted/20 px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Executive Business Report</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-3.5" />
                  Generated: {formattedDate}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Cpu className="size-3.5" />
                  Provider: {data.provider.charAt(0).toUpperCase() + data.provider.slice(1)}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Layers className="size-3.5" />
                  Model: {data.model}
                </span>
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="w-full sm:w-auto h-9 gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy Report
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full sm:w-auto h-9 gap-2 transition-colors"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
        {pdfError && (
          <div className="mt-4 text-sm font-medium text-destructive">
            {pdfError}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="prose prose-sm dark:prose-invert max-w-none p-6 sm:p-8 [&>h1]:text-2xl [&>h1]:font-bold [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-lg [&>h3]:font-medium [&>ul]:mt-4 [&>ul]:space-y-2 [&>p]:leading-relaxed [&>p]:text-muted-foreground">
          {/* Simple markdown parsing for standard report formats */}
          {data.report.split('\n').map((line, i) => {
            if (line.startsWith('### ')) {
              return <h3 key={i}>{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={i}>{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('# ')) {
              return <h1 key={i}>{line.replace('# ', '')}</h1>;
            }
            if (line.startsWith('- ') || line.startsWith('* ')) {
              return (
                <ul key={i} className="list-disc pl-6 mb-2 text-muted-foreground">
                  <li>{line.substring(2)}</li>
                </ul>
              );
            }
            if (line.trim() === '') {
              return <br key={i} />;
            }
            // Bold text handling inline simplistic (Optional step, better to use react-markdown if available but this meets raw text readability standard)
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
              <p key={i} className="mb-2">
                {parts.map((part, index) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="text-foreground">{part.slice(2, -2)}</strong>;
                  }
                  return <span key={index}>{part}</span>;
                })}
              </p>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
