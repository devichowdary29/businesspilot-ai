import { GenerateResponseInput, GenerateResponseOutput } from "./types";
import { BUSINESS_PILOT_SYSTEM_PROMPT } from "./system-prompt";

/**
 * generateAIResponse serves as the provider-agnostic interface for BusinessPilot AI.
 * Currently, it implements a mock engine, allowing the broader architecture to be fully
 * built, tested, and typed before plugging in a live LLM (like OpenAI or Anthropic).
 */
export async function generateAIResponse(
  input: GenerateResponseInput
): Promise<GenerateResponseOutput> {
  const { conversationHistory, businessContext, latestQuestion } = input;
  
  const query = latestQuestion.toLowerCase();
  let content = "";

  // Mock Engine Routing Logic
  if (query.includes("low on stock") || query.includes("inventory")) {
    content = `Based on your inventory data, I have identified products approaching their minimum stock threshold.

I recommend reviewing your current inventory levels and preparing restock orders for items with declining availability.`;
  } else if (query.includes("how is my business doing") || query.includes("performance") || query.includes("sales")) {
    content = `Your business performance appears stable based on the available operational data.

I recommend reviewing revenue trends, customer purchasing patterns, and inventory turnover for deeper insights.`;
  } else if (query.includes("report")) {
    content = `I've analyzed your latest data and generated your weekly business report highlighting key performance metrics across inventory and sales.`;
  } else {
    content = `I understand your question and will analyze your business data to provide recommendations once complete intelligence integration is available.`;
  }

  // Simulate network latency for a realistic UI experience
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    content,
    provider: "mock",
    model: "business-pilot-mock-v1",
    usage: {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    },
  };
}
