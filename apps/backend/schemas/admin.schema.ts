import { z } from "zod";

export const sendNotificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
});

export const uploadOrUpdateBrochureSchema = z.object({
  link: z.string().min(1, "Link is required"),
});
