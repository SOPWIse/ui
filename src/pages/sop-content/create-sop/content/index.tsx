import { BreadcrumbsBar } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import FormContainer from "@/components/form-container";
import RichTextEditor from "@/components/rich-text-editor";
import { useUpdateSOPMutation } from "@/hooks/mutations/sops/useUpdateSOPMutation";
import { SOP } from "@/schemas/sop-content";
import { handleToast } from "@/utils/handleToast";
import { useFormContext } from "react-hook-form";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const updateSOP = useUpdateSOPMutation(id);

  const { handleSubmit } = useFormContext<SOP>();

  const onSubmit = (data: Partial<SOP>) => {
    if (isEdit) {
      updateSOP.mutate(
        {
          content: data.content,
        },
        {
          onSuccess: () => {
            handleToast({
              type: "success",
              message: "SOP Updated Successfully",
              description: "SOP has been updated successfully",
            });
            navigate(`/sop-content/${id}/review`);
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
    }
  };

  return (
    <FormContainer
      id="sop-content-form"
      title="Content"
      className="relative bg-sidebar"
      // TODO: HANDLE IT LATER
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
    >
      <BreadcrumbsBar
        onBack={() => navigate(-1)}
        path={[
          { name: "SOPs Studio", url: "/sop-content" },
          { name: "Content", url: "." },
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
              isLoading={updateSOP.isPending}
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
      {/* INFO : Send the type here in the Component itself */}
      <RichTextEditor<SOP> fieldPath="content" sortingControl={<div></div>} />
    </FormContainer>
  );
};

export default Content;
