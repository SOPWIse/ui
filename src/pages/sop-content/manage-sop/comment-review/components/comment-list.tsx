
// import { Button } from "@/components/button";

// import {
//   BsCheckCircle,
//   BsExclamationCircle,
// } from "react-icons/bs";
// import { IoIosSend } from "react-icons/io";
// import { VscCommentUnresolved } from "react-icons/vsc";
// import { cn } from "@/lib/utils";

// import { Textarea } from "@/components/ui";
// import { formatDate } from "@/utils/formatDate";
// import { CommentItem } from "..";


// type CommentLisProps = {
//     comment: CommentItem[];
//     handleCommentChange: (in)
// }

// const CommentList = () => {
//   return (
//     <div
//             className={cn(
//               `bg-muted transition-all duration-200 p-4 w-full col-span-4 rounded-lg shadow-md`,
//               `overflow-y-scroll max-h-[calc(100vh-10rem)]`,
//             )}
//           >
//             <div className="w-full col-span-4 space-y-4">
//               {comments.map((comment, index) => (
//                 <div
//                   key={index}
//                   className={cn(
//                     "border rounded-lg p-4 space-y-2",
//                     comment.isResolved
//                       ? "border-success bg-success/10"
//                       : "border-border bg-card",
//                   )}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                       {comment.isResolved ? (
//                         <BsCheckCircle className="text-green-300" />
//                       ) : (
//                         <BsExclamationCircle className="text-yellow-300" />
//                       )}
//                       <p className="text-sm font-medium text-primary">
//                         {comment.commentor}
//                       </p>
//                     </div>
//                     <p className="text-xs text-muted-foreground">
//                       {formatDate(comment.timestamp, "hh:mm:ss b, dd MMM yyyy")}
//                     </p>
//                   </div>
//                   <p className="text-sm italic text-foreground">
//                     Selected:{" "}
//                     <span className="font-semibold text-accent-foreground">
//                       "{comment.selectedText}"
//                     </span>
//                   </p>
//                   <Textarea
//                     className="mt-2"
//                     value={comment.comment}
//                     placeholder="Add your comment here..."
//                     onChange={(e) => handleCommentChange(index, e.target.value)}
//                     disabled={comment.isSent}
//                   />
//                   <div className="flex flex-row-reverse">
//                     {!comment.isSent ? (
//                       <Button
//                         className="mt-2"
//                         variant={"outline"}
//                         onClick={() => sendComment(index)}
//                       >
//                         <IoIosSend />
//                         <span>Send Comment</span>
//                       </Button>
//                     ) : comment?.isResolved ? null : (
//                       <Button
//                         variant={"secondary"}
//                         className="mt-2"
//                         onClick={() => resolveComment(index)}
//                       >
//                         <VscCommentUnresolved className="text-yellow-200" />
//                         <span>
//                           Mark as resolved
//                         </span>
//                       </Button>
                      
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//   )
// }

// export default CommentList