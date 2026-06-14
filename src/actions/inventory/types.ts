import { Inventory, Product } from "@prisma/client";

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type SerializableInventoryWithProduct = Inventory & { 
  product: Omit<Product, "price" | "cost"> & { price: number; cost: number };
};

export type InventoryActionState = ActionState<SerializableInventoryWithProduct>;
export type InventoriesActionState = ActionState<SerializableInventoryWithProduct[]>;

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

export interface InventoryAnalyticsState {
  isSuccess: boolean;
  message: string;
  data?: {
    inventoryValue: number;
    healthyStock: number;
    lowStock: number;
    criticalItems: number;
  };
}

export interface InventoryIntelligenceState {
  isSuccess: boolean;
  message: string;
  data?: {
    healthScore: number;
    insight1: string;
    insight2: string;
    recommendation: string;
  };
}
