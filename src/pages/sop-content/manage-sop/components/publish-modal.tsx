import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { usePublishSOPById } from "@/hooks/mutations/sops/usePublishSOPById";
import { useGetSOPById } from "@/hooks/queries/sops/useGetSOPById";
import { handleToast } from "@/utils/handleToast";
import { ListCheck } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PublishModal = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const publishMutation = usePublishSOPById();
  const { data: sopData } = useGetSOPById(id);
  console.log(sopData.status === "PUBLISHED");

  const handlePublish = () => {
    if (id)
      publishMutation.mutate(id, {
        onSuccess: () => {
          handleToast({
            description: `SOP has been published successfully`,
            type: "success",
            message: "Success",
          });
          setOpen(false);
        },
        onError: (error) => {
          handleToast({
            description: `Failed: ${error.message}`,
            type: "error",
            message: "Error",
            error,
          });
        },
      });
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      className="flex flex-col gap-2"
      title="Approve Form Submission"
      description="Are you sure you want to approve the form submission?"
      trigger={
        <Button
          isLoading={false}
          type="submit"
          disabled={publishMutation.isPending || sopData.status === "PUBLISHED"}
        >
          <div className="flex items-center gap-2">
            <span>Send for Approval (Publish)</span>
            <ListCheck className="w-4 h-auto fill-green-900 dark:fill-green-300" />
          </div>
        </Button>
      }
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="ghost">Cancel</Button>
          <Button
            isLoading={publishMutation.isPending}
            variant="default"
            disabled={
              publishMutation.isPending || sopData.status === "PUBLISHED"
            }
            onClick={() => {
              handlePublish();
            }}
          >
            Publish
          </Button>
        </div>
      }
    >
      <p className="p-4 text-sm bg-muted text-muted-foreground">
        I have reviewed the form submission and I am sure I want to approve it.
      </p>
    </Modal>
  );
};

export default PublishModal;
