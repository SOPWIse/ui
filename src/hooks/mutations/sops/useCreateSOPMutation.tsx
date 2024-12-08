import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/interceptor/api";
import { queryKeys } from "@/hooks/queries/queryKeys";

async function createSOP(data: { title: string; description: string }) {
  try {
    const res = await api.post("/sop", { ...data, metaData: {} });
    return res?.data;
  } catch (e) {
    throw new Error(e as string);
  }
}

export const useCreateSOPMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSOP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sops.sops({}) });
    },
    onError: (error: AxiosError<any>) =>
      console.log("ERROR Register IN ==>", error),
  });
};
