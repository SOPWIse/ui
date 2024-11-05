import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/interceptor/api";
import { queryKeys } from "../../queries/queryKeys";
import { loginSchema, registerSchema } from "@/schemas/auth";

export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginResponse = string;
export type RegisterError = { errors: string[]; message: string };

async function registerUser(data: RegisterPayload) {
  try {
    const res = await api.post("/auth/register", data);
    return res?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
    onError: (error: AxiosError<RegisterError>) =>
      console.log("ERROR Register IN ==>", error),
  });
};
