import { Inventory, Product } from "@prisma/client";

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type InventoryWithProduct = Inventory & { product: Product };

export type InventoryActionState = ActionState<InventoryWithProduct>;
export type InventoriesActionState = ActionState<InventoryWithProduct[]>;
