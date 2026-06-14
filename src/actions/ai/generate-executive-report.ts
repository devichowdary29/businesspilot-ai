"use server";

import { auth } from "@clerk/nextjs/server";
import { getBusinessContext } from "@/lib/ai/business-context";
import { generateBusinessReport } from "@/lib/ai/generate-business-report";
import { ExecutiveReportActionState } from "./types";

export async function generateExecutiveReport(): Promise<ExecutiveReportActionState> {
  try {
    // 1. Verify User and Organization
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // 2. Fetch Live Business Data
    const businessContext = await getBusinessContext(orgId);

    if (!businessContext) {
      return { isSuccess: false, message: "Failed to retrieve business context" };
    }

    // 3. Invoke the AI Report Engine
    const generatedReport = await generateBusinessReport({
      businessContext,
    });

    // 4. Return Safe JSON Response
    return {
      isSuccess: true,
      message: "Executive report generated successfully",
      data: {
        report: generatedReport.content,
        provider: generatedReport.provider,
        model: generatedReport.model,
        generatedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Failed to generate executive report:", error);
    
    return {
      isSuccess: false,
      message: "Unable to generate executive report.",
    };
  }
}
