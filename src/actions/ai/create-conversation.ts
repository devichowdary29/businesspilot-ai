"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createConversationSchema } from "./validations";
import { CreateConversationInput, ConversationActionState } from "./types";

export async function createConversation(
  data: CreateConversationInput
): Promise<ConversationActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = createConversationSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid conversation title provided",
      };
    }

    const { title } = parsedData.data;

    const conversation = await prisma.aIConversation.create({
      data: {
        title,
        organizationId: orgId,
      },
    });

    return {
      isSuccess: true,
      message: "Conversation created successfully",
      data: conversation,
    };
  } catch (error: any) {
    console.error("Failed to create conversation:", error);
    return {
      isSuccess: false,
      message: error.message || "An error occurred while creating conversation",
    };
  }
}
