import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/interceptor/api";
import { queryKeys } from "../../queries/queryKeys";
import { registerSchema } from "@/schemas/auth";

export type LoginSSOPayload = z.infer<typeof registerSchema>;
export type LoginResponse = string;
export type LoginError = { errors: string[]; message: string };

async function getUser(payload: LoginSSOPayload) {
  const response = await api.post("/auth/sso-login", payload);
  return response.data;
}

export const useSSOLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      return queryClient.invalidateQueries({
        queryKey: queryKeys.user.currentUser,
      });
    },
  });
};
