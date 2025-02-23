import { PaginatedParams } from "@/schemas/common";

export const sopsQueryKeys = {
  sops: <T,>({
    limit,
    page,
    sortBy,
    sortOrder,
    filter,
    search,
    searchFields,
  }: PaginatedParams<T>) =>
    [
      "sops",
      { limit, page, sortBy, sortOrder, filter, search, searchFields },
    ] as const,
  sopById: (id?: string) => ["sops", id] as const,
  flowData: (id?: string) => ["sops", id],
};
