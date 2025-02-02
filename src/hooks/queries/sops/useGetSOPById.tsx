import { useQuery } from "@tanstack/react-query";
import { api } from "@/interceptor/api";

const getSOPById = async (id?: string) => {
  try {
    const response = await api.get(`/sop/${id}`);
    // return sopSchema.parse(response?.data);
    return response?.data;
  } catch (e) {
    console.log("ERROR FETCHING USER", e);
    throw new Error(e as string);
  }
};

export const useGetSOPById = (id?: string) => {
  return useQuery({
    queryKey: ["sops", id],
    queryFn: () => getSOPById(id),
    enabled: !!id,
  });
};
