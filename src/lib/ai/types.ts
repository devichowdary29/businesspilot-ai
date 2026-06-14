export type Role = "SYSTEM" | "USER" | "ASSISTANT";

export interface ProviderMessage {
  role: Role;
  content: string;
}

export interface GenerateResponseInput {
  conversationHistory: ProviderMessage[];
  businessContext?: string;
  latestQuestion: string;
}

export interface GenerateResponseOutput {
  content: string;
  provider: string; // e.g., "mock", "openai", "anthropic"
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
