"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createCustomerSchema, CreateCustomerInput } from "./validations";
import { CustomerActionState } from "./types";

export async function createCustomer(
  data: CreateCustomerInput
): Promise<CustomerActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = createCustomerSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid customer data",
      };
    }

    const customer = await prisma.customer.create({
      data: {
        ...parsedData.data,
        organizationId: orgId,
      },
    });

    return {
      isSuccess: true,
      message: "Customer created successfully",
      data: {
        ...customer,
        totalSpent: Number(customer.totalSpent),
      } as any,
    };
  } catch (error) {
    console.error("Failed to create customer:", error);
    return {
      isSuccess: false,
      message: "An error occurred while creating the customer",
    };
  }
}
