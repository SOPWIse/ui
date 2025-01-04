import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/interceptor/api";
import { queryKeys } from "@/hooks/queries/queryKeys";

async function addComment({
  contentId,
  ...data
}: {
  contentId: string;
  comment: string;
  selectedText: string;
  htmlString: string;
  uniqueId: string;
  parentId?: string;
  content: string;
}) {
  try {
    const res = await api.post(`/sop/${contentId}/comment`, {
      ...data,
      metaData: {},
    });
    return res?.data;
  } catch (e) {
    throw new Error(e as string);
  }
}

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sops.sopById(data?.contentId),
      });
    },
    onError: (error: AxiosError<any>) =>
      console.log("ERROR Adding comment IN ==>", error),
  });
};
