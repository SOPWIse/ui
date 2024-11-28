import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../queries/queryKeys";
import { useClerk } from "@clerk/clerk-react";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { signOut } = useClerk();

  return useMutation({
    mutationFn: async () => {
      await signOut();
      localStorage.removeItem("access_token");
      queryClient.setQueryData(queryKeys.user.currentUser, null);
    },
    onSuccess: () => {
      window.location.href = "/";
    },
  });
};
