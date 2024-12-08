import { PaginatedParams } from "@/schemas/common";

export const sopsQueryKeys = {
  sops: <T,>({ limit, page, sort, filter }: PaginatedParams<T>) =>
    ["sops", { limit, page, sort, filter }] as const,
  sopById: (id?: string) => ["sops", id] as const,
};
