import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { usePublishSOPById } from "@/hooks/mutations/sops/usePublishSOPById";
import { useGetSOPById } from "@/hooks/queries/sops/useGetSOPById";
import { ListCheck } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ApproveModal = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const publishMutation = usePublishSOPById();
  const { data: sopData } = useGetSOPById(id);

  const handleApprove = () => {
    if (id) {
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      className="flex flex-col gap-2"
      title="Approve Form Submission"
      description="Are you sure you want to approve the form submission?"
      disableClose={publishMutation.isPending}
      trigger={
        <Button
          isLoading={publishMutation.isPending}
          type="submit"
          disabled={publishMutation.isPending || sopData.isListed}
        >
          <div className="flex items-center gap-2">
            <span>Approve SOP</span>
            <ListCheck className="w-4 h-auto fill-green-900 dark:fill-green-300" />
          </div>
        </Button>
      }
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="ghost" disabled={publishMutation.isPending}>
            Cancel
          </Button>
          <Button
            isLoading={publishMutation.isPending}
            variant="default"
            disabled={publishMutation.isPending || sopData.isListed}
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
        I have reviewed the form submission and I am sure I want to approve it.
      </p>
    </Modal>
  );
};

export default ApproveModal;