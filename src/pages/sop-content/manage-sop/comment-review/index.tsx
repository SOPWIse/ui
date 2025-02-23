import { BreadcrumbsBar } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import Scaffold from "@/components/scaffold";
import { BsArrowLeft } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import CommentEditor from "./components/comment-editor";
import ApproveModal from "./components/approve-sop";
import { cn } from "@/lib/utils";
import { useUserQuery } from "@/hooks/queries/user";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import CommentList from "./components/comment-list";
import { useCreateCommentMutation } from "@/hooks/mutations/sops/useCreateCommentMutation";
import { handleToast } from "@/utils/handleToast";
import { CommentItem, SOP } from "@/schemas/sop-content";
import { useResolveCommentMutation } from "@/hooks/mutations/sops/useResolveComment";

const CommentReview = () => {
  const { control } = useFormContext<SOP>();
  const navigate = useNavigate();
  const sopById = useWatch({
    control,
  });
  const sopTitle = sopById?.title;
  const user = useUserQuery();
  const {
    fields: comments,
    prepend,
    update,
  } = useFieldArray<SOP>({
    control,
    name: "comments",
  });

  const createComment = useCreateCommentMutation();
  const resolve = useResolveCommentMutation();
  const isComment = comments.length > 0;

  function handleCommentChange(
    index: number,
    value: string,
    replyIndex?: number
  ) {
    if (replyIndex !== undefined) {
      const pre = comments?.at(index) as CommentItem;
      const updated = pre?.replies?.map((ele, i) => {
        if (i === replyIndex) {
          return { ...ele, comment: value };
        } else {
          return ele;
        }
      });
      update(index, { ...pre, replies: updated });
      return;
    }
    const pre = comments?.at(index);
    update(index, { ...pre, comment: value });
  }

  function callCreate(pre?: CommentItem) {
    if (!pre?.comment || !sopById?.content?.length) {
      return;
    }
    const body = {
      comment: pre.comment ?? "",
      contentId: sopById?.id ?? "",
      htmlString: pre?.htmlString,
      selectedText: pre?.selectedText,
      uniqueId: pre?.uniqueId,
      parentId: pre?.parentId,
      content: sopById?.content,
    };
    createComment.mutate(body, {
      onError: (error) => {
        handleToast({
          error,
          message: "Error while sending comment",
          type: "error",
        });
      },
    });
  }

  function sendComment(index: number, replyIndex?: number) {
    const pre = comments?.at(index) as CommentItem;
    if (replyIndex !== undefined) {
      const updated = pre?.replies?.map((ele, i) => {
        if (i === replyIndex) {
          return { ...ele, timestamp: undefined };
        } else {
          return ele;
        }
      });
      update(index, { ...pre, replies: updated });
      const comment = pre?.replies?.at(replyIndex);
      if (comment) {
        comment.parentId = pre?.backendId;
        callCreate(comment);
      }
      return;
    }
    update(index, { ...pre, timestamp: undefined });
    callCreate(pre);
  }

  function resolveComment(index: number) {
    const pre = comments?.at(index) as CommentItem;
    const content = sopById?.content;
    const contentId = sopById?.id;
    const commentId = pre?.backendId;

    console.log({ content, contentId, commentId });

    if (!content || !contentId || !commentId) {
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const commentSpan = doc.querySelector(
      `span[data-comment-id="${pre.uniqueId}"]`
    );

    if (commentSpan) {
      commentSpan.textContent = pre.htmlString as string;
      commentSpan.removeAttribute("id");
      commentSpan.removeAttribute("data-comment-id");
      commentSpan.removeAttribute("style");
    }

    const updatedContent = doc.body.innerHTML;

    const body = {
      contentId,
      commentId,
      content: updatedContent,
    };

    resolve.mutate(body, {
      onError: (error) => {
        handleToast({
          error,
          message: "Error while updating comment",
          type: "error",
        });
      },
      onSuccess: () => {
        update(index, { ...pre, status: "RESOLVED" });
      },
    });
  }

  function addComment(
    selectedText: string,
    htmlString: string,
    uniqueId: string
  ) {
    prepend({
      comment: "",
      author: {
        email: user?.data?.email,
        name: user?.data?.name,
      },
      selectedText: selectedText,
      uniqueId: uniqueId,
      htmlString: htmlString,
      timestamp: new Date().toISOString(),
      status: "UNRESOLVED",
    });
  }

  function addReplies(index: number) {
    const pre = comments.at(index) as CommentItem;
    const replies = pre?.replies ?? [];
    const reply = {
      comment: "",
      parentId: pre?.backendId,
      author: {
        email: user?.data?.email,
        name: user?.data?.name,
      },
      timestamp: new Date().toISOString(),
      status: "UNRESOLVED",
    };
    update(index, { ...pre, replies: [reply, ...replies] });
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
            isComment ? "col-span-8" : "col-span-full"
          )}
        >
          <CommentEditor
            fieldPath="content"
            sortingControl={<div></div>}
            viewOnly={false}
            onComment={addComment}
          />
        </div>

        {/* Comments List */}
        {isComment && (
          <CommentList
            comments={comments}
            addReplies={addReplies}
            handleCommentChange={handleCommentChange}
            resolveComment={resolveComment}
            sendComment={sendComment}
          />
        )}
      </div>
    </Scaffold>
  );
};

export default CommentReview;
