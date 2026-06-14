import { z } from "zod";
import { CustomerSegment } from "@prisma/client";

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  email: z.string().email("Invalid email address").optional().nullable(),
  phone: z.string().optional().nullable(),
  segment: z.nativeEnum(CustomerSegment).optional().default(CustomerSegment.NEW),
});

export const updateCustomerSchema = createCustomerSchema.partial().extend({
  id: z.string().min(1, "Customer ID is required"),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
