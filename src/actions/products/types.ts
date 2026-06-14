import { Product } from "@prisma/client";

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type SerializableProduct = Omit<Product, "price" | "cost"> & {
  price: number;
  cost: number;
};

export type ProductActionState = ActionState<SerializableProduct>;
export type ProductsActionState = ActionState<SerializableProduct[]>;
