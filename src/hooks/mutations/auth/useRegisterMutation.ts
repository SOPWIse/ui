import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/interceptor/api";
import { registerSchema } from "@/schemas/auth";

export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginResponse = string;
export type RegisterError = { errors: string[]; message: string };

async function registerUser(data: RegisterPayload) {
  try {
    const res = await api.post("/auth/register", data);
    return res?.data;
  } catch (e) {
    throw new Error(e as string);
  }
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
    onError: (error: AxiosError<RegisterError>) =>
      console.log("ERROR Register IN ==>", error),
  });
};
