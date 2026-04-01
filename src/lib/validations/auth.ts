import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(8).max(128),
});

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email().transform((value) => value.trim().toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(128)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  suburb: z.string().trim().max(120).optional().or(z.literal("")),
});

export const forgotPasswordSchema = z.object({
  email: z.email().transform((value) => value.trim().toLowerCase()),
});

export const resetPasswordSchema = z.object({
  email: z.email().transform((value) => value.trim().toLowerCase()),
  token: z.string().trim().min(10),
  password: registerSchema.shape.password,
});
