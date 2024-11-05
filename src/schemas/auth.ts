/**
 * We prefer to use zod based schema because it has first-party support with react-hook-form,
 * transformations are easy and parsing/extending it into a different format is also easy.
 */
import { z } from "zod";

export const rolesArray = ["ADMIN", "AUTHOR", "ASSISTANT"] as const;

export const loginSchema = z.object({
  email: z.string().email("Invalid email, please try again!"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email, please try again!"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  name: z.string().min(3),
  role: z.enum(rolesArray).default("ASSISTANT"),
  provider: z.string().default("sopwise").optional(),
  metaData: z.any().optional(),
});

/**
 * An example of how e convert a zod schema to typescript type/interface
 */

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
