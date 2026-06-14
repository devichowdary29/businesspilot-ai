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
