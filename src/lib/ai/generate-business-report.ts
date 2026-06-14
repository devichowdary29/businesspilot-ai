import Groq from "groq-sdk";
import { GenerateBusinessReportInput, GenerateBusinessReportOutput } from "./types";
import { BUSINESS_REPORT_SYSTEM_PROMPT } from "./report-prompt";

// Initialize Groq client
// It will automatically use process.env.GROQ_API_KEY
const groq = new Groq();

export async function generateBusinessReport(
  input: GenerateBusinessReportInput
): Promise<GenerateBusinessReportOutput> {
  try {
    // Construct the messages array
    const messages: any[] = [
      {
        role: "system",
        content: BUSINESS_REPORT_SYSTEM_PROMPT,
      },
      {
        role: "system",
        content: `Business Data:\n\n${JSON.stringify(input.businessContext, null, 2)}`,
      },
      {
        role: "user",
        content: "Please generate the executive business report based on the provided data.",
      }
    ];

    const completion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.2, // Deterministic logic for business reports
      max_tokens: 4000,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content generated from Groq");
    }

    return {
      content,
      provider: "groq",
      model: "llama-3.3-70b-versatile",
    };
  } catch (error) {
    console.error("Failed to generate business report:", error);

    return {
      content: "BusinessPilot AI was unable to generate your executive business report at this time.\n\nPlease try again after a few moments.",
      provider: "fallback",
      model: "none",
    };
  }
}
