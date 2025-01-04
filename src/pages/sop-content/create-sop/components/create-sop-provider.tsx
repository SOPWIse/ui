import { Loader } from "@/components/loader";
import { useGetSOPById } from "@/hooks/queries/sops/useGetSOPById";
import { CommentItem, SOP } from "@/schemas/sop-content";
import { DevTool } from "@hookform/devtools";
import { ReactNode, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useParams } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const CreateSOPProvider = ({ children }: Props) => {
  const { id: sopId } = useParams();
  const { data, isPending } = useGetSOPById(sopId);

  const methods = useForm<SOP>({
    mode: "all",
  });

  useEffect(() => {
    if (sopId && !isPending) {
      methods.reset({
        ...data,
        content: data?.content ? data.content : "",
        comments:
          data?.comments?.map((ele: CommentItem) => ({
            ...ele,
            backendId: ele?.id,
          })) ?? [],
      });
    }
  }, [sopId, methods, data, isPending]);

  if (sopId && isPending) {
    return <Loader />;
  }

  return (
    <>
      <FormProvider {...methods}>
        {children}
        <DevTool control={methods.control} />
      </FormProvider>
    </>
  );
};

export default CreateSOPProvider;
