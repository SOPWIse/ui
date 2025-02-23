import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/queries/queryKeys";
import { api } from "@/interceptor/api";

async function getFlow(id?: string) {
  try {
    const res = await api.get(`/sop/flow-data/${id}`);
    console.log("flow-data", res);
    return res?.data;
  } catch (e) {
    console.log("flow-data", e);
    throw new Error(e as string);
  }
}

export const useGetSOPFlowQuery = (id?: string) => {
  return useQuery({
    queryFn: () => getFlow(id),
    queryKey: queryKeys.sops.flowData(id),
    enabled: !!id,
  });
};
