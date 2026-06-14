import { Inventory, Product } from "@prisma/client";

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type InventoryWithProduct = Inventory & { product: Product };

export type InventoryActionState = ActionState<InventoryWithProduct>;
export type InventoriesActionState = ActionState<InventoryWithProduct[]>;

export interface CreateInventoryInput {
  productId: string;
  quantity: number;
  minimumStock: number;
  supplier?: string;
  leadTimeDays?: number;
  dailySalesAvg?: number;
}

export interface AvailableProductForInventory {
  id: string;
  name: string;
}

export interface UpdateInventoryInput {
  id: string;
  quantity: number;
  minimumStock: number;
  supplier?: string;
  leadTimeDays?: number;
  dailySalesAvg?: number;
}
