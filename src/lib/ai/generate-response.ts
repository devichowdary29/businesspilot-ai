import { GenerateResponseInput, GenerateResponseOutput } from "./types";
import { BUSINESS_PILOT_SYSTEM_PROMPT } from "./system-prompt";
import Groq from "groq-sdk";

// Initialize the Groq SDK globally on the server.
// Will throw an error if GROQ_API_KEY is not set, but we catch it gracefully inside the function if needed,
// or let Next.js catch it on boot if we require it strictly.
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "missing_key",
});

/**
 * generateAIResponse serves as the provider-agnostic interface for BusinessPilot AI.
 * It uses Groq internally to provide fast, high-quality analytical responses.
 */
export async function generateAIResponse(
  input: GenerateResponseInput
): Promise<GenerateResponseOutput> {
  const { conversationHistory, businessContext, latestQuestion } = input;
  
  try {
    // 1. Map existing history into Groq's ChatCompletion format
    const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [];

    // Inject System Prompt
    messages.push({
      role: "system",
      content: BUSINESS_PILOT_SYSTEM_PROMPT,
    });

    // Inject Real Business Context as a hidden system injection or user context
    // We'll append it to the system message to enforce context grounding
    if (businessContext) {
      messages.push({
        role: "system",
        content: `Current Business Context Data:\n\n${JSON.stringify(businessContext, null, 2)}`,
      });
    }

    // Append Conversation History
    for (const msg of conversationHistory) {
      if (msg.role === "USER") {
        messages.push({ role: "user", content: msg.content });
      } else if (msg.role === "ASSISTANT") {
        messages.push({ role: "assistant", content: msg.content });
      }
    }

    // Append Latest Question (already included if it was pushed to DB and fetched in history, 
    // but the instruction says 'conversationHistory + latestQuestion'. Since the orchestrator 
    // already saves the USER message to the DB and loads it into history, the latest question 
    // is technically already the last item in conversationHistory. But we'll ensure we don't duplicate it. 
    // If the last message in history is the latestQuestion, we're good. If not, we append it.
    const lastHistoryMessage = conversationHistory[conversationHistory.length - 1];
    if (!lastHistoryMessage || lastHistoryMessage.content !== latestQuestion) {
       messages.push({
         role: "user",
         content: latestQuestion,
       });
    }

    // 2. Call Groq SDK
    const model = "llama-3.3-70b-versatile";
    const completion = await groq.chat.completions.create({
      messages,
      model,
      temperature: 0.3,
      max_tokens: 1500,
    });

    const aiContent = completion.choices[0]?.message?.content || "I apologize, but I received an empty response. Please try again.";

    // 3. Return provider-agnostic response
    return {
      content: aiContent,
      provider: "groq",
      model: model,
      usage: {
        promptTokens: completion.usage?.prompt_tokens || 0,
        completionTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0,
      },
    };
  } catch (error: any) {
    console.error("[GROQ_API_ERROR]", error);
    
    // Return a safe fallback as specified
    return {
      content: "I apologize, but I am temporarily unable to analyze your business data. Please try again in a few moments.",
      provider: "groq",
      model: "fallback",
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },
    };
  }
}
