import { Button, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { VscCommentUnresolved } from "react-icons/vsc";
import { CommentLisProps } from "./comment-list";
import { CommentItem } from "@/schemas/sop-content";
import { FaReply } from "react-icons/fa6";

interface CommentItemProps extends Omit<CommentLisProps, "comments"> {
  comment: CommentItem;
  showSelected: boolean;
  index: number;
}

const CommentListItem = ({
  index,
  comment,
  handleCommentChange,
  resolveComment,
  sendComment,
  addReplies,
  showSelected = true,
}: CommentItemProps) => {
  const isResolved = comment?.status === "RESOLVED";
  const isSent = !Boolean((comment as any)?.timestamp);
  const isReply = Boolean((comment as CommentItem)?.parentId);
  return (
    <div
      key={index}
      className={cn(
        "border rounded-lg p-4 space-y-2 border-border",
        isReply ? null : "bg-card"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isReply && (
            <div>
              {isResolved ? (
                <BsCheckCircle className="text-green-600" />
              ) : (
                <BsExclamationCircle className="text-yellow-600" />
              )}
            </div>
          )}
          <p className="text-sm font-medium text-primary">
            {comment.author?.name}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {formatDate(
            `${comment?.createdAt ?? new Date().toISOString()}`,
            "hh:mm:ss b, dd MMM yyyy"
          )}
        </p>
      </div>
      {showSelected && (
        <p className="text-sm italic text-foreground">
          Selected:{" "}
          <span className="font-semibold text-accent-foreground">
            "{comment.selectedText}"
          </span>
        </p>
      )}
      <Textarea
        className="mt-2"
        value={`${comment?.comment}`}
        placeholder="Add your comment here..."
        onChange={(e) => handleCommentChange?.(index, e.target.value)}
        disabled={isSent}
      />
      <div className="flex flex-row-reverse">
        {!isSent ? (
          <Button
            className="mt-2"
            variant={"outline"}
            onClick={() => sendComment?.(index)}
          >
            <IoIosSend />
            <span>Send Comment</span>
          </Button>
        ) : isResolved || isReply ? null : (
          <Button
            variant={"secondary"}
            className="mt-2"
            onClick={() => resolveComment?.(index)}
          >
            <VscCommentUnresolved className="text-yellow-600" />
            <span>Mark as resolved</span>
          </Button>
        )}

        {isSent && !isReply && (
          <Button
            variant={"secondary"}
            className="mt-2 me-2"
            onClick={() => addReplies?.(index)}
          >
            <FaReply className="text-gray-500" />
            <span>Reply</span>
          </Button>
        )}
      </div>

      {(comment?.replies ?? [])?.length > 0 && (
        <div
          className={cn(
            `transition-all duration-200 p-4 w-full col-span-4 rounded-lg`,
            `overflow-y-scroll`
          )}
        >
          <div className="w-full col-span-4 space-y-4">
            {comment?.replies?.map((ele, replyIndex) => (
              <CommentListItem
                key={ele?.backendId}
                index={replyIndex}
                comment={ele}
                showSelected={false}
                addReplies={addReplies}
                handleCommentChange={(i, value) => {
                  handleCommentChange?.(index, value, i);
                }}
                sendComment={(i) => sendComment?.(index, i)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentListItem;
