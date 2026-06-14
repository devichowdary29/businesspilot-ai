import { Customer } from "@prisma/client";

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type SerializableCustomer = Omit<Customer, "totalSpent"> & {
  totalSpent: number;
};

export type CustomerActionState = ActionState<SerializableCustomer>;
export type CustomersActionState = ActionState<SerializableCustomer[]>;

export interface CustomerAnalyticsState {
  isSuccess: boolean;
  message: string;
  data?: {
    totalCustomers: number;
    lifetimeValue: number;
    vipCustomers: number;
    churnRisk: number;
  };
}
