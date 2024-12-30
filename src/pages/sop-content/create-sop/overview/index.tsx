import { BreadcrumbsBar } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import FormContainer from "@/components/form-container";
import { FormInput } from "@/components/form-input";
import { FormTextArea } from "@/components/form-textarea";
import { useCreateSOPMutation } from "@/hooks/mutations/sops/useCreateSOPMutation";
import { useUpdateSOPMutation } from "@/hooks/mutations/sops/useUpdateSOPMutation";
import { SOP } from "@/schemas/sop-content";
import { handleToast } from "@/utils/handleToast";
import { useFormContext } from "react-hook-form";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const SOPOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const createSOP = useCreateSOPMutation();
  const updateSOP = useUpdateSOPMutation(id);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    watch,
  } = useFormContext<SOP>();

  const isEdit = !!id;

  const onSubmit = (data: SOP) => {
    if (!isDirty) navigate(`/sop-content/${id}/content`);
    if (isEdit) {
      // Note : No need to send author in the request
      // const { title, description } = data;
      const { author, ...rest } = data;

      updateSOP.mutate(
        // {
        //   title,
        //   description,
        // },
        rest,
        {
          onSuccess: () => {
            handleToast({
              type: "success",
              message: "SOP Updated Successfully",
              description: "SOP has been updated successfully",
            });
            navigate(`/sop-content/${id}/content`);
          },
          onError: (error) => {
            handleToast({
              error,
              message: "Error Updating SOP",
              type: "error",
              description: "An error occurred while updating the SOP",
            });
          },
        }
      );
    } else {
      createSOP.mutate(data, {
        onSuccess: (response) => {
          handleToast({
            type: "success",
            message: "SOP Created Successfully",
            description: "SOP has been created successfully",
          });
          navigate(`/sop-content/${response.id}/content`);
        },
        onError: (error) => {
          handleToast({
            error,
            message: "Error Creating SOP",
            type: "error",
            description: "An error occurred while creating the SOP",
          });
        },
      });
    }
  };

  return (
    <FormContainer
      id="sop-overview-form"
      title="Overview"
      className="bg-sidebar"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
    >
      <BreadcrumbsBar
        onBack={() => navigate(-1)}
        path={[
          { name: "SOPs Studio", url: "/sop-content" },
          { name: `Overview (${watch("title")})`, url: "." },
        ]}
        rightArea={
          <div className="flex items-center gap-4">
            <Button
              id="help-button"
              variant={"ghost"}
              // TODO : HANDLE IT LATER
              // onClick={startTour}
            >
              <MdHelpOutline className="w-5 h-auto" />
              <span className="text-muted-foreground">Need help?</span>
            </Button>
            <Button onClick={() => navigate(-1)} variant={"outline"}>
              <BsArrowLeft className="w-4 h-auto fill-foreground" />
              Previous
            </Button>
            <Button
              id="next-button"
              isLoading={createSOP.isPending || updateSOP.isPending}
              // disabled={!isDirty}
              type="submit"
            >
              <div className="flex items-center gap-2">
                <span>Next</span>
                <BsArrowRight className="w-4 h-auto fill-background" />
              </div>
            </Button>
          </div>
        }
      />

      <div className="flex flex-col w-full gap-x-10 gap-y-2 ">
        <FormInput
          id="sop-name"
          required
          error={errors.title?.message}
          placeholder="Enter SOP Name..."
          label="SOP Name"
          tooltipContent="Enter the name of the SOP"
          className="max-w-xl"
          {...register("title")}
        />
        <FormTextArea
          id="sop-description"
          label="SOP Description"
          error={errors.description?.message}
          placeholder="Enter SOP Description..."
          className="max-w-xl"
          {...register("description")}
          //Hack to fix the New Line issue
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const inputElement = e.target as HTMLInputElement;
              inputElement.value += "\n";
            }
          }}
        />
      </div>
    </FormContainer>
  );
};

export default SOPOverview;
