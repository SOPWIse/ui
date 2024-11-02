import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../queries/queryKeys";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      queryClient.setQueryData(queryKeys.user.currentUser, null);
      localStorage.removeItem("access_token");
    },
  });
};
