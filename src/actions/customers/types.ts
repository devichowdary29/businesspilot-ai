import { Customer } from "@prisma/client";

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type CustomerActionState = ActionState<Customer>;
export type CustomersActionState = ActionState<Customer[]>;
