import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/interceptor/api";
import { useUserQuery } from "./useGetCurrentUser";

const getAllUsers = async () => {
  const response = await api.get("/user/all");
  return response?.data;
};

const useGetAllUsers = () => {
  const user = useUserQuery();
  return useQuery({
    queryKey: queryKeys.user.allUsers,
    queryFn: getAllUsers,
    enabled: user.data.role === "ADMIN",
  });
};

export default useGetAllUsers;
