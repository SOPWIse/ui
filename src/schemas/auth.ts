/**
 * We prefer to use zod based schema because it has first-party support with react-hook-form,
 * transformations are easy and parsing/extending it into a different format is also easy.
 */
import { z } from "zod";

export const rolesArray = ["ADMIN", "AUTHOR", "USER"] as const;

export const loginSchema = z.object({
  email: z.string().email("Invalid email, please try again!"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
  role: z.enum(rolesArray),
});

/**
 * An example of how e convert a zod schema to typescript type/interface
 */

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
