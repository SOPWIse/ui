import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/interceptor/api";

const getUserById = async (id?: string) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response?.data;
  } catch (e) {
    console.log("ERROR FETCHING USER", e);
    throw new Error(e as string);
  }
};

export const useGetUserById = (id?: string) => {
  return useQuery({
    queryKey: queryKeys.user.userById(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
