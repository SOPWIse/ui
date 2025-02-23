import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { useApproveSOPById } from "@/hooks/mutations/sops/useApproveSOPById";
import { useGetSOPById } from "@/hooks/queries/sops/useGetSOPById";
import { handleToast } from "@/utils/handleToast";
import { ListCheck } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ApproveModal = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const approveSOP = useApproveSOPById();
  const { data: sopData } = useGetSOPById(id);

  const handleApprove = () => {
    if (id) {
      approveSOP.mutate(id, {
        onSuccess: () => {
          handleToast({
            message: "Success",
            type: "success",
            description: "SOP has been approved successfully",
          });
        },
        onError: (error) => {
          handleToast({
            message: "Error",
            type: "error",
            description: `Failed: ${error.message}`,
            error,
          });
        },
      });
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      className="flex flex-col gap-2"
      title="Approve Form Submission"
      description="Are you sure you want to approve the form submission?"
      disableClose={approveSOP.isPending}
      trigger={
        <Button
          isLoading={approveSOP.isPending}
          type="submit"
          disabled={approveSOP.isPending || sopData.isListed}
        >
          <div className="flex items-center gap-2">
            <span>Approve SOP</span>
            <ListCheck className="w-4 h-auto fill-green-900 dark:fill-green-300" />
          </div>
        </Button>
      }
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="ghost" disabled={approveSOP.isPending}>
            Cancel
          </Button>
          <Button
            isLoading={approveSOP.isPending}
            variant="default"
            disabled={approveSOP.isPending || sopData.isListed}
            onClick={() => {
              handleApprove();
            }}
          >
            Approve
          </Button>
        </div>
      }
    >
      <p className="p-4 text-sm bg-muted text-muted-foreground">
        I have reviewed the SOP submission, verified the comments and I am sure
        I want to approve it.
      </p>
    </Modal>
  );
};

export default ApproveModal;
