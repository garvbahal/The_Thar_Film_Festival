import { z } from "zod";

export const requestOtpSchema = z
  .object({
    email: z.email().trim().min(1, "Email is required"),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(1, "Password is required"),
    collegeName: z.string().min(1, "College Name is required"),
    teamName: z.string().min(1, "Team Name is required").optional(),
    teamCode: z.string().min(1, "Team Code is required").optional(),
  })
  .refine((data) => data.teamName || data.teamCode, {
    message: "Either of teamName or teamCode is required",
    path: ["teamName"],
  });

export const loginSchema = z.object({
  email: z.email().trim().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  email: z.email().trim().min(1, "Email is required"),
  otp: z.string().length(6, "Invalid OTP"),
});
