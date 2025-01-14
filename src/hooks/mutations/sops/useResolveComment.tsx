// /:id/comment/:comment_id

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/interceptor/api";
import { queryKeys } from "@/hooks/queries/queryKeys";

async function resolveComment({
  contentId,
  commentId,
  content,
}: {
  contentId: string;
  commentId: string;
  content: string;
}) {
  try {
    const res = await api.patch(`/sop/${contentId}/comment/${commentId}`, {
      content,
      metaData: {},
    });
    return res?.data;
  } catch (e) {
    throw new Error(e as string);
  }
}

export const useResolveCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resolveComment,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.sops.sopById(data?.contentId),
      });
    },
    onError: (error: AxiosError<any>) =>
      console.log("ERROR resolving comment IN ==>", error),
  });
};
