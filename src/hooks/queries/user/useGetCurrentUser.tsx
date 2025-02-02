import { api } from "@/interceptor/api";
import { queryKeys } from "../queryKeys";
import { useQuery } from "@tanstack/react-query";

async function getCurrentUser() {
  if (!localStorage.getItem("access_token")) {
    return null;
  }
  try {
    const response = await api.get("/user/me");
    return response?.data;
  } catch (e) {
    // throwing the error causes query to always be stale
    // this is unintentional, and there doesn't appear to
    // be a way to stop this behaviour. So simply set user
    // to undefined.
    console.log("ERROR FETCHING USER", e);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
    return null;
  }
}

export const useUserQuery = () => {
  return useQuery({
    queryKey: queryKeys.user.currentUser,
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });
};
