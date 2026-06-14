import { z } from "zod";

export const getInventorySchema = z.object({});

export const createInventorySchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
  minimumStock: z.number().int().min(0, "Minimum stock cannot be negative"),
  supplier: z.string().optional(),
  leadTimeDays: z.number().int().min(0).optional(),
  dailySalesAvg: z.number().min(0).optional(),
});

export const updateInventorySchema = z.object({
  id: z.string().min(1, "Inventory ID is required"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
  minimumStock: z.number().int().min(0, "Minimum stock cannot be negative"),
  supplier: z.string().optional(),
  leadTimeDays: z.number().int().min(0).optional(),
  dailySalesAvg: z.number().min(0).optional(),
});
