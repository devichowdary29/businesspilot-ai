export interface DashboardOverviewState {
  isSuccess: boolean;
  message: string;
  data?: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
  };
}

export interface DashboardRevenueState {
  isSuccess: boolean;
  message: string;
  data?: {
    month: string;
    revenue: number;
  }[];
}

export interface DashboardRecentOrdersState {
  isSuccess: boolean;
  message: string;
  data?: {
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: "Paid" | "Pending" | "Delivered";
    date: string;
  }[];
}

export interface DashboardAiInsightsState {
  isSuccess: boolean;
  message: string;
  data?: {
    healthScore: number;
    insights: { text: string }[];
    actions: { text: string }[];
  };
}
