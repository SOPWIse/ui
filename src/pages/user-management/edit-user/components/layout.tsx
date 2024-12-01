import { Loader } from "@/components/loader";
import { useGetUserById } from "@/hooks/queries/user/useGetUserById";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Outlet, useParams } from "react-router-dom";
import { DevTool } from "@hookform/devtools";

const Layout = () => {
  return (
    <div className="relative h-full min-h-[100vh] w-full bg-muted">
      <EditFormProvider preFillTemplate={true}>
        <div className="col-span-8">
          <Outlet />
        </div>
      </EditFormProvider>
    </div>
  );
};

export default Layout;

const EditFormProvider = ({ children }: any) => {
  const { id } = useParams();
  const { data, isPending } = useGetUserById(id);

  const methods = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (id && !isPending) {
      methods.reset({ ...data });
    }
  }, [id, methods, data, isPending]);

  if (id && isPending) {
    return <Loader />;
  }

  return (
    <FormProvider {...methods}>
      {children}
      <DevTool control={methods.control} />
    </FormProvider>
  );
};
