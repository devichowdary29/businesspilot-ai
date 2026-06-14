import jsPDF from "jspdf";

export interface ExecutiveReportPdfInput {
  report: string;
  generatedAt: string;
  provider: string;
  model: string;
}

export function generateExecutiveReportPdf({
  report,
  generatedAt,
  provider,
  model,
}: ExecutiveReportPdfInput): void {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;
    let yPos = 20;

    // Header Styles
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("BusinessPilot AI", margin, yPos);
    
    yPos += 10;
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Executive Business Report", margin, yPos);

    yPos += 12;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    // Metadata block
    const dateFormatted = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(generatedAt));
    
    doc.text(`Generated: ${dateFormatted}`, margin, yPos);
    yPos += 5;
    doc.text(`Provider: ${provider.charAt(0).toUpperCase() + provider.slice(1)}`, margin, yPos);
    yPos += 5;
    doc.text(`Model: ${model}`, margin, yPos);

    yPos += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    
    yPos += 15;

    // Report Content Rendering
    doc.setTextColor(0, 0, 0);
    
    const lines = report.split("\n");

    for (const line of lines) {
      if (line.trim() === "") {
        yPos += 4;
        continue;
      }

      let textToPrint = line;
      let isHeader1 = false;
      let isHeader2 = false;
      let isHeader3 = false;
      let isBullet = false;

      if (line.startsWith("# ")) {
        isHeader1 = true;
        textToPrint = line.substring(2);
      } else if (line.startsWith("## ")) {
        isHeader2 = true;
        textToPrint = line.substring(3);
      } else if (line.startsWith("### ")) {
        isHeader3 = true;
        textToPrint = line.substring(4);
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        isBullet = true;
        textToPrint = line.substring(2);
      }

      // Formatting based on type
      if (isHeader1) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        yPos += 6;
      } else if (isHeader2) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        yPos += 4;
      } else if (isHeader3) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        yPos += 2;
      } else {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
      }

      // Basic Bold Markdown removal for PDF
      textToPrint = textToPrint.replace(/\*\*(.*?)\*\*/g, "$1");

      const wrappedLines = doc.splitTextToSize(textToPrint, isBullet ? maxLineWidth - 5 : maxLineWidth);

      for (let i = 0; i < wrappedLines.length; i++) {
        // Page break logic
        if (yPos > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }

        if (isBullet && i === 0) {
          doc.text("•", margin, yPos);
          doc.text(wrappedLines[i], margin + 5, yPos);
        } else if (isBullet) {
          doc.text(wrappedLines[i], margin + 5, yPos);
        } else {
          doc.text(wrappedLines[i], margin, yPos);
        }

        yPos += 6;
      }
      
      if (isHeader1 || isHeader2 || isHeader3) {
        yPos += 2;
      }
    }

    const isoDate = new Date(generatedAt).toISOString().split("T")[0];
    const filename = `BusinessPilot-Executive-Report-${isoDate}.pdf`;
    
    doc.save(filename);
  } catch (error) {
    console.error("Failed to generate PDF document", error);
    throw new Error("PDF generation failed");
  }
}
