import { BreadcrumbsBar } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import FormContainer from "@/components/form-container";
import RichTextView from "@/components/rich-text-view";
import { SOP } from "@/schemas/sop-content";
import { useFormContext } from "react-hook-form";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    watch,
    // register,
    // formState: { errors, isDirty },
  } = useFormContext<SOP>();

  return (
    <FormContainer
      id="sop-content-form"
      title="Review"
      className="bg-sidebar"
      // TODO: HANDLE IT LATER
      // onSubmit={handleSubmit(onSubmit)}
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
              onClick={() => navigate(`/sop-content/details/${id}`)}
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
      <RichTextView value={watch("content") ?? "No content"} />
    </FormContainer>
  );
};

export default Review;
