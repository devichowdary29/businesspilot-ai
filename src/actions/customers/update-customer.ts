"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { updateCustomerSchema, UpdateCustomerInput } from "./validations";
import { CustomerActionState } from "./types";

export async function updateCustomer(
  data: UpdateCustomerInput
): Promise<CustomerActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = updateCustomerSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid customer data",
      };
    }

    const { id, ...updateData } = parsedData.data;

    const existingCustomer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!existingCustomer || existingCustomer.organizationId !== orgId) {
      return {
        isSuccess: false,
        message: "Customer not found or unauthorized",
      };
    }

    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: updateData,
    });

    return {
      isSuccess: true,
      message: "Customer updated successfully",
      data: {
        ...customer,
        totalSpent: Number(customer.totalSpent),
      } as any,
    };
  } catch (error) {
    console.error("Failed to update customer:", error);
    return {
      isSuccess: false,
      message: "An error occurred while updating the customer",
    };
  }
}
