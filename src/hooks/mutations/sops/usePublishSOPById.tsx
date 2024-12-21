import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/interceptor/api";
import { queryKeys } from "@/hooks/queries/queryKeys";

async function publishSOPById(id: string) {
  try {
    const res = await api.patch(`/sop/publish/${id}`);
    return res?.data;
  } catch (e) {
    throw new Error(e as string);
  }
}

export const usePublishSOPById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: publishSOPById,
    onSuccess: (id?: string) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sops.sopById(id) });
    },
    onError: (error: AxiosError<any>) =>
      console.log("ERROR Register IN ==>", error),
  });
};
