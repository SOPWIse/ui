import { BreadcrumbsBar } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import Scaffold from "@/components/scaffold";
import { useGetSOPById } from "@/hooks/queries/sops/useGetSOPById";
import {
  BsArrowLeft,
  BsCheckCircle,
  BsExclamationCircle,
} from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { VscCommentUnresolved } from "react-icons/vsc";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import CommentEditor from "./components/comment-editor";
import ApproveModal from "./components/approve-sop";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui";
import { useUserQuery } from "@/hooks/queries/user";
import { formatDate } from "@/utils/formatDate";

export type CommentItem = {
  commentor: string;
  timestamp: string;
  selectedText?: string;
  htmlString: string;
  comment: string;
  isResolved?: boolean;
  isSent: boolean;
  uniqueId?: string;
  replies?: CommentItem[]
  
};

const CommentReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sopById = useGetSOPById(id);
  const sopTitle = sopById.data?.title;
  const user = useUserQuery();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [resolved, setResolved] = useState<CommentItem>();
  const isComment = comments.length > 0;

  const handleCommentChange = (index: number, value: string) => {
    setComments((prev) =>
      prev.map((comment, i) =>
        i === index ? { ...comment, comment: value } : comment,
      ),
    );
  };

  const sendComment = (index: number) => {
    setComments((prev) =>
      prev.map((comment, i) =>
        i === index ? { ...comment, isSent: true } : comment,
      ),
    );
  };

  const resolveComment = (index: number) => {
    setComments((prev) =>
      prev.map((comment, i) => {
        if (i === index) {
          setResolved(comment);
          return { ...comment, isResolved: true };
        } else {
          return comment;
        }
      }),
    );
  };

  function addComment(
    selectedText: string,
    htmlString: string,
    uniqueId: string,
  ) {
    setComments((prev) => [
      {
        comment: "",
        commentor: user?.data?.name,
        selectedText,
        htmlString,
        uniqueId,
        timestamp: new Date().toISOString(),
        isResolved: false,
        isSent: false,
      },
      ...prev,
    ]);
  }

  return (
    <Scaffold>
      <BreadcrumbsBar
        onBack={() => navigate(-1)}
        path={[
          { name: "SOPs Studio", url: "/sop-content" },
          { name: `SOP Management (${sopTitle})`, url: "." },
        ]}
        rightArea={
          <div className="flex items-center gap-4">
            <Button id="help-button" variant={"ghost"}>
              <MdHelpOutline className="w-5 h-auto" />
              <span className="text-muted-foreground">Need help?</span>
            </Button>
            <Button onClick={() => navigate(-1)} variant={"outline"}>
              <BsArrowLeft className="w-4 h-auto fill-foreground" />
              Previous
            </Button>
            <ApproveModal />
          </div>
        }
      />

      <div className="grid w-full h-full grid-cols-12 gap-4 p-4 mt-12 rounded-lg bg-sidebar">
        {/* Comment Editor */}
        <div
          className={cn(
            `bg-sidebar transition-all duration-200`,
            isComment ? "col-span-8" : "col-span-full",
          )}
        >
          <CommentEditor
            fieldPath="content"
            sortingControl={<div></div>}
            viewOnly={false}
            resolvedComment={resolved}
            onComment={addComment}
          />
        </div>

        {/* Comments List */}
        {isComment && (
          <div
            className={cn(
              `bg-muted transition-all duration-200 p-4 w-full col-span-4 rounded-lg shadow-md`,
              `overflow-y-scroll max-h-[calc(100vh-10rem)]`,
            )}
          >
            <div className="w-full col-span-4 space-y-4">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg p-4 space-y-2",
                    comment.isResolved
                      ? "border-success bg-success/10"
                      : "border-border bg-card",
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {comment.isResolved ? (
                        <BsCheckCircle className="text-green-300" />
                      ) : (
                        <BsExclamationCircle className="text-yellow-300" />
                      )}
                      <p className="text-sm font-medium text-primary">
                        {comment.commentor}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(comment.timestamp, "hh:mm:ss b, dd MMM yyyy")}
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
                    value={comment.comment}
                    placeholder="Add your comment here..."
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                    disabled={comment.isSent}
                  />
                  <div className="flex flex-row-reverse">
                    {!comment.isSent ? (
                      <Button
                        className="mt-2"
                        variant={"outline"}
                        onClick={() => sendComment(index)}
                      >
                        <IoIosSend />
                        <span>Send Comment</span>
                      </Button>
                    ) : comment?.isResolved ? null : (
                      <Button
                        variant={"secondary"}
                        className="mt-2"
                        onClick={() => resolveComment(index)}
                      >
                        <VscCommentUnresolved className="text-yellow-200" />
                        <span>
                          Mark as resolved
                        </span>
                      </Button>
                      
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Scaffold>
  );
};

export default CommentReview;
