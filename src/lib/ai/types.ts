export type Role = "SYSTEM" | "USER" | "ASSISTANT";

export interface ProviderMessage {
  role: Role;
  content: string;
}

export interface BusinessContext {
  overview: {
    totalProducts: number;
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
    totalProfit: number;
  };
  inventory: {
    totalTrackedItems: number;
    lowStockItems: Array<{
      name: string;
      quantity: number;
      minimumStock: number;
    }>;
  };
  customers: {
    topCustomers: Array<{
      name: string;
      totalSpent: number;
      totalOrders: number;
    }>;
  };
  products: {
    topProducts: Array<{
      name: string;
      category: string;
    }>;
  };
}

export interface GenerateResponseInput {
  conversationHistory: ProviderMessage[];
  businessContext?: BusinessContext;
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
