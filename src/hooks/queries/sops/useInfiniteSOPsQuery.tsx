import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { createPaginatedResponseSchema } from "@/schemas/common";
import { sopSchema } from "@/schemas/sop-content";
import { z } from "zod";
import { api } from "@/interceptor/api";

type GetAllSOPsParams = {
  page?: number;
  limit?: number;
  search?: string;
  searchFields?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

const paginatedSOPSchema = createPaginatedResponseSchema(sopSchema);

export const useInfiniteSOPsQuery = ({
  limit = 10,
  sortOrder = "asc",
  sortBy = "createdAt",
  page = 1,
  search = "",
  searchFields = [],
}: GetAllSOPsParams) => {
  return useInfiniteQuery({
    queryKey: queryKeys.sops.sops({
      limit,
      sortBy,
      sortOrder,
      page,
      search,
      searchFields,
    }),
    queryFn: async ({
      pageParam,
    }): Promise<z.infer<typeof paginatedSOPSchema>> => {
      const response = await api.get(`/sop/all`, {
        params: {
          limit,
          page: pageParam,
          sortBy,
          sortOrder,
          search,
          searchFields,
        },
      });
      // PUT ZOD PARSE HERE LATER ONCE THE SCHEMA GETS FIXED
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.data.meta?.page?.next,
    getPreviousPageParam: (firstPage) => firstPage?.data?.meta?.page?.previous,
  });
};
