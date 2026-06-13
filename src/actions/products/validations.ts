import { z } from "zod";
import { ProductStatus } from "@prisma/client";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional().nullable(),
  category: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  cost: z.coerce.number().min(0, "Cost must be a positive number"),
  status: z.nativeEnum(ProductStatus).optional().default(ProductStatus.ACTIVE),
  isActive: z.boolean().optional().default(true),
});

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().min(1, "Product ID is required"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
