import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/interceptor/api";
import { queryKeys } from "@/hooks/queries/queryKeys";
import { SOP } from "@/schemas/sop-content";

async function createSOP(payload: Partial<SOP>, id?: string) {
  try {
    const res = await api.patch(`/sop/${id}`, payload);
    return res?.data;
  } catch (e) {
    throw new Error(e as string);
  }
}

export const useUpdateSOPMutation = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<SOP>) => await createSOP(payload, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sops.sopById(id) });
    },
    onError: (error: AxiosError<any>) =>
      console.log("ERROR Register IN ==>", error),
  });
};
