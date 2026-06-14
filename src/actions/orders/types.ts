import { Order, OrderItem, Customer, Product } from "@prisma/client";

export type OrderWithRelations = Order & {
  customer: Customer;
  items: (OrderItem & {
    product: Product;
  })[];
};

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type OrderActionState = ActionState<OrderWithRelations>;
export type OrdersActionState = ActionState<OrderWithRelations[]>;

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
