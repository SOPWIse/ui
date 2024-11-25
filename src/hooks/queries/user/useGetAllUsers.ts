import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/interceptor/api";
import { useUserQuery } from "./useGetCurrentUser";
import { AllUserResponse, allUserSchema } from "@/schemas/all-users";
import qs from "qs";

type GetAllUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  searchFields?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

const getAllUsers = async (
  params?: GetAllUsersParams
): Promise<AllUserResponse> => {
  const response = await api.get("/user/all", {
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
  return allUserSchema.parse(response?.data);
};

const useGetAllUsers = (params?: GetAllUsersParams) => {
  const user = useUserQuery();

  return useQuery({
    queryKey: [queryKeys.user.allUsers, params],
    queryFn: () => getAllUsers(params),
    enabled: user?.data?.role === "ADMIN",
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetAllUsers;
