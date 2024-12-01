import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["ASSISTANT", "ADMIN", "AUTHOR"]),
  provider: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const itemsSchema = z.object({
  totalItems: z.number(),
  limit: z.number(),
  begins: z.number(),
  ends: z.number(),
});

const pageSchema = z.object({
  current: z.number(),
  previous: z.number().nullable(),
  next: z.number().nullable(),
  total: z.number(),
  size: z.number(),
});

const metaSchema = z.object({
  items: itemsSchema,
  page: pageSchema,
});

const dataSchema = z.object({
  data: z.array(userSchema),
  meta: metaSchema,
});

export const allUserSchema = z.object({
  success: z.boolean(),
  data: dataSchema,
});

export type AllUserResponse = z.infer<typeof allUserSchema>;
export type UserData = z.infer<typeof userSchema>;
