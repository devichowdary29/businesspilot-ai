import { z } from "zod";

export const getConversationsSchema = z.object({});

export const createConversationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters").trim(),
});

export const createMessageSchema = z.object({
  conversationId: z.string().min(1, "Conversation ID is required"),
  content: z.string().trim().min(1, "Message cannot be empty").max(4000, "Message cannot exceed 4000 characters"),
});
