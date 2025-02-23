import { Button, Textarea } from "@/components/ui";
import { Modal } from "@/components/modal";
import { useState } from "react";

interface NewCommentModalProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  onComment: (commentText: string) => void;
  data: { selectedText: string; htmlString: string; uniqueId: string };
}

const NewCommentModal = ({
  open,
  setOpen,
  onComment,
  data,
}: NewCommentModalProps) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    onComment(commentText);
    setCommentText("");
    setOpen(false); // Close modal after adding comment
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      className="flex flex-col gap-2"
      title="Add New Comment"
      description="Add a comment on the SOP"
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleAddComment}
            disabled={!commentText}
          >
            Add Comment
          </Button>
        </div>
      }
    >
      <p className="text-sm italic text-foreground">
        Selected:{" "}
        <span className="font-semibold text-accent-foreground">
          "{data.selectedText}"
        </span>
      </p>
      <Textarea
        placeholder="Enter your comment here..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
    </Modal>
  );
};

export default NewCommentModal;
