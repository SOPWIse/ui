import { Button, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { VscCommentUnresolved } from "react-icons/vsc";
import { CommentLisProps } from "./comment-list";
import { CommentItem } from "@/schemas/sop-content";

interface CommentItemProps extends Omit<CommentLisProps, "comments"> {
  comment: CommentItem;
  index: number;
}

const CommentListItem = ({
  index,
  comment,
  handleCommentChange,
  resolveComment,
  sendComment,
}: CommentItemProps) => {
  const isResolved = comment?.status === "RESOLVED";
  const isSent = !Boolean((comment as any)?.timestamp);
  return (
    <div
      key={index}
      className={cn(
        "border rounded-lg p-4 space-y-2",
        isResolved ? "border-success bg-success/10" : "border-border bg-card",
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isResolved ? (
            <BsCheckCircle className="text-green-300" />
          ) : (
            <BsExclamationCircle className="text-yellow-300" />
          )}
          <p className="text-sm font-medium text-primary">
            {comment.author?.name}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {formatDate(
            `${comment?.createdAt ?? new Date().toISOString()}`,
            "hh:mm:ss b, dd MMM yyyy",
          )}
        </p>
      </div>
      <p className="text-sm italic text-foreground">
        Selected:{" "}
        <span className="font-semibold text-accent-foreground">
          "{comment.selectedText}"
        </span>
      </p>
      <Textarea
        className="mt-2"
        value={`${comment?.comment}`}
        placeholder="Add your comment here..."
        onChange={(e) => handleCommentChange(index, e.target.value)}
        disabled={isSent}
      />
      <div className="flex flex-row-reverse">
        {!isSent ? (
          <Button
            className="mt-2"
            variant={"outline"}
            onClick={() => sendComment(index)}
          >
            <IoIosSend />
            <span>Send Comment</span>
          </Button>
        ) : isResolved ? null : (
          <Button
            variant={"secondary"}
            className="mt-2"
            onClick={() => resolveComment(index)}
          >
            <VscCommentUnresolved className="text-yellow-200" />
            <span>Mark as resolved</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentListItem;
