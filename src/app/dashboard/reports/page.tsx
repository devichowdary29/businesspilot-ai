import { Metadata } from "next";
import { ReportsPageClient } from "@/components/reports/reports-page-client";

export const metadata: Metadata = {
  title: "AI Reports | BusinessPilot AI",
  description: "Generate AI Executive Reports using Groq and Llama 3.",
};

export default function ReportsPage() {
  return (
    <div className="flex w-full flex-col gap-6 p-6 sm:p-8">
      <div className="mx-auto w-full max-w-5xl">
        <ReportsPageClient />
      </div>
    </div>
  );
}
