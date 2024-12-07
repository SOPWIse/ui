import { SOP } from "@/schemas/sop-content";
import { DevTool } from "@hookform/devtools";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useParams } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const CreateSOPProvider = ({ children }: Props) => {
  const { id: sopId } = useParams();
  //   const { data, isPending } = useSOPById(sopId);

  const methods = useForm<SOP>({
    mode: "all",
  });

  //   useEffect(() => {
  //     if (dealId && !isPending) {
  //       methods.reset({ ...data });
  //     } else if (!dealId && preFillTemplate) {
  //       methods.reset(getDefaultData());
  //     }
  //   }, [dealId, methods, data, isPending, preFillTemplate]);

  //   if (dealId && isPending) {
  //     return <Loader />;
  //   }

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
