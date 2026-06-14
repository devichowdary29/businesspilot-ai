"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createMessageSchema } from "./validations";
import { CreateMessageInput, MessageActionState } from "./types";

export async function createMessage(
  data: CreateMessageInput
): Promise<MessageActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = createMessageSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid message data provided",
      };
    }

    const { conversationId, content } = parsedData.data;

    // Verify conversation ownership
    const existingConversation = await prisma.aIConversation.findUnique({
      where: { id: conversationId },
    });

    if (!existingConversation || existingConversation.organizationId !== orgId) {
      return {
        isSuccess: false,
        message: "Conversation not found or unauthorized.",
      };
    }

    // Create USER message
    const message = await prisma.aIMessage.create({
      data: {
        conversationId,
        content,
        role: "USER",
      },
    });

    // Touch the conversation so it moves to top of list
    await prisma.aIConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return {
      isSuccess: true,
      message: "Message created successfully",
      data: message,
    };
  } catch (error: any) {
    console.error("Failed to create message:", error);
    return {
      isSuccess: false,
      message: error.message || "An error occurred while creating message",
    };
  }
}
