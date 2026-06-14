"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CustomerActionState } from "./types";

export async function deleteCustomer(id: string): Promise<CustomerActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // Verify the customer exists and belongs to the current organization
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

    const customer = await prisma.customer.delete({
      where: {
        id,
      },
    });

    return {
      isSuccess: true,
      message: "Customer deleted successfully",
      data: {
        ...customer,
        totalSpent: Number(customer.totalSpent),
      } as any,
    };
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return {
      isSuccess: false,
      message: "An error occurred while deleting the customer",
    };
  }
}
