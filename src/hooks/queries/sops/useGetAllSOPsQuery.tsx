import { api } from "@/interceptor/api";
import { createPaginatedResponseSchema } from "@/schemas/common";
import { sopSchema } from "@/schemas/sop-content";
import { z } from "zod";
import qs from "qs";
import { useUserQuery } from "../user";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

type GetAllSOPsParams = {
  page?: number;
  limit?: number;
  search?: string;
  searchFields?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

const paginatedSOPSchema = createPaginatedResponseSchema(sopSchema);
const getAllSOPs = async (
  params?: GetAllSOPsParams
): Promise<z.infer<typeof paginatedSOPSchema>> => {
  console.log("params", params);
  const response = await api.get("/sop/all", {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 8,
      search: params?.search,
      searchFields: params?.searchFields,
      sortBy: params?.sortBy,
      sortOrder: params?.sortOrder,
    },
    paramsSerializer: {
      serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
    },
  });
  return paginatedSOPSchema.parse(response?.data);
};

const useGetAllSOPsQuery = (params?: GetAllSOPsParams) => {
  const user = useUserQuery();

  return useQuery({
    queryKey: queryKeys.sops.sops({
      ...params,
    }),
    queryFn: () => getAllSOPs(params),
    // FIX THIS LATER ACCORDING TO ROLES
    enabled: user?.data?.role === "ADMIN" || true,
  });
};

export default useGetAllSOPsQuery;
