import { Product } from "@prisma/client";

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type ProductActionState = ActionState<Product>;
export type ProductsActionState = ActionState<Product[]>;
