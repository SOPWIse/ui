import { z } from "zod";

export function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType,
) {
  return z.object({
    data: z.object({
      data: z.array(itemSchema),
      meta: z.object({
        items: z.object({
          totalItems: z.number(),
          limit: z.number(),
          begins: z.number(),
          ends: z.number(),
        }),
        page: z.object({
          current: z.number(),
          previous: z.number().nullable(),
          next: z.number().nullable(),
          total: z.number(),
          size: z.number(),
        }),
      }),
    }),

    success: z.boolean().optional(),
  });
}

interface DefaultKeyValue {
  [key: string]: string;
}

export interface PaginatedParams<T = DefaultKeyValue> {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  searchFields?: string[];
  filter?: Partial<T>;
}
