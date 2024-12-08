import { z } from "zod";

const sopStatusEnum = z.enum(["DRAFT", "PUBLISHED", "LISTED"]);

export const sopSchema = z.object({
  id: z.string().uuid().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must not exceed 255 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must not exceed 1000 characters"),
  author: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
  }),
  status: sopStatusEnum.optional().default("DRAFT"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category must not exceed 100 characters")
    .default("Operations"),
  isListed: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  publishedAt: z.date().optional().nullable(),
  metaData: z.record(z.any()).optional(),
  content: z.string().max(1000000, "Content is too long").optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  contentUrl: z.string().url("Invalid URL").nullable(),
});

export type SOP = z.infer<typeof sopSchema>;
