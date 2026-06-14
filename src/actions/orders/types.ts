import { Order, OrderItem, Customer, Product } from "@prisma/client";

export type OrderWithRelations = Order & {
  customer: Customer;
  items: (OrderItem & {
    product: Product;
  })[];
};

export type SerializableOrderWithRelations = Omit<Order, "totalAmount" | "profit"> & {
  totalAmount: number;
  profit: number;
  customer: Omit<Customer, "totalSpent"> & { totalSpent: number };
  items: (Omit<OrderItem, "price"> & {
    price: number;
    product: Omit<Product, "price" | "cost"> & { price: number; cost: number };
  })[];
};

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type OrderActionState = ActionState<SerializableOrderWithRelations>;
export type OrdersActionState = ActionState<SerializableOrderWithRelations[]>;

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  customerId: string;
  items: OrderItemInput[];
}

export interface UpdateOrderInput {
  id: string;
  customerId: string;
  items: OrderItemInput[];
}

export interface AvailableCustomer {
  id: string;
  name: string;
}

export interface AvailableProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface OrderAnalyticsState {
  isSuccess: boolean;
  message: string;
  data?: {
    totalRevenue: number;
    totalOrders: number;
    profitMargin: number;
    averageOrderValue: number;
  };
}

export interface OrderForecastState {
  isSuccess: boolean;
  message: string;
  data?: {
    insight1: string;
    insight2: string;
    recommendation: string;
  };
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  profit: number;
}

export interface OrdersRevenueChartState {
  isSuccess: boolean;
  message: string;
  data?: ChartDataPoint[];
}
