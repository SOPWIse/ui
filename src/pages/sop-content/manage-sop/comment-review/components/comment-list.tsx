import { cn } from "@/lib/utils";
import CommentListItem from "./comment-list-item";
import { CommentItem } from "@/schemas/sop-content";

export interface CommentLisProps {
  comments: CommentItem[];
  sendComment?: (index: number, replyIndex?: number) => void;
  resolveComment?: (index: number) => void;
  handleCommentChange?: (
    index: number,
    value: string,
    replyIndex?: number
  ) => void;
  addReplies?: (index: number) => void;
}

const CommentList = ({
  comments,
  handleCommentChange,
  resolveComment,
  sendComment,
  addReplies,
}: CommentLisProps) => {
  return (
    <div
      className={cn(
        `bg-muted transition-all duration-200 p-4 w-full col-span-4 rounded-lg shadow-md`,
        `overflow-y-scroll max-h-[calc(100vh-10rem)]`
      )}
    >
      <div className="w-full col-span-4 space-y-4">
        {comments.map((comment, index) => (
          <CommentListItem
            key={comment?.backendId}
            index={index}
            comment={comment}
            showSelected={true}
            addReplies={addReplies}
            handleCommentChange={handleCommentChange}
            resolveComment={resolveComment}
            sendComment={sendComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
