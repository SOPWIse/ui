import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/interceptor/api";
import { queryKeys } from "../../queries/queryKeys";
import { loginSchema } from "@/schemas/auth";

export type LoginPayload = z.infer<typeof loginSchema>;
export type LoginResponse = string;
export type LoginError = { errors: string[]; message: string };

async function getUser(payload: LoginPayload) {
  const response = await api.post("/auth/login", payload);
  return response.data;
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getUser,
    onError: (error: AxiosError<LoginError>) =>
      console.log("ERROR LOGGING IN ==>", error),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      return queryClient.invalidateQueries({
        queryKey: queryKeys.user.currentUser,
      });
    },
  });
};
