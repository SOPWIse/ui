import { z } from "zod";

const sopStatusEnum = z.enum(["DRAFT", "PUBLISHED", "LISTED"]);

export type CommentItem = {
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  backendId?: string;
  author?: {
    email?: string;
    id?: string;
    name?: string;
  };
  status?: "UNRESOLVED" | "RESOLVED" | "CLOSED";
  selectedText?: string;
  htmlString?: string;
  uniqueId?: string;
  parentId?: string;
  replies?: CommentItem[];
};

export const CommentSchema: z.ZodType<CommentItem> = z.lazy(() =>
  z.object({
    comment: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    id: z.string().optional(),
    backendId: z.string().optional(),
    author: z
      .object({
        email: z.string().optional(),
        id: z.string().optional(),
        name: z.string().optional(),
      })
      .optional(),
    status: z.enum(["UNRESOLVED", "RESOLVED", "CLOSED"]).optional(),
    selectedText: z.string().optional(),
    htmlString: z.string().optional(),
    uniqueId: z.string().optional(),
    parentId: z.string().optional(),
    replies: z.array(z.lazy(() => CommentSchema)).optional(),
  }),
);

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
  comments: z.array(CommentSchema).optional().nullable(),
});

export type SOP = z.infer<typeof sopSchema>;
