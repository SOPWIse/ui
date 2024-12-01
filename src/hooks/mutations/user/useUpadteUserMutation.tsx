import { api } from "@/interceptor/api";
import { userSchema } from "@/schemas/all-users";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export type UpdateUserPayload = Partial<z.infer<typeof userSchema>>;
async function updateUser(id: string, data: UpdateUserPayload) {
  try {
    const res = await api.patch(`/user/${id}`, data);
    return res?.data;
  } catch (e) {
    throw new Error(e as string);
  }
}

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserPayload }) =>
      updateUser(id, data),
    onError: (error) => console.log("ERROR Updating User ==>", error),
  });
};
