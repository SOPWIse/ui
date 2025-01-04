import React, { ReactNode, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Eye, Pencil } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui";
import { CommentItem } from "@/schemas/sop-content";

interface Props<T extends FieldValues> {
  fieldPath: FieldPath<T>;
  sortingControl: ReactNode;
  viewOnly?: boolean;
  onComment?: (value: string, htmlString: string, uniqueId: string) => void;
  resolvedComment?: CommentItem;
}

const CommentEditor = <T extends FieldValues>({
  sortingControl,
  fieldPath,
  viewOnly,
  onComment,
  // resolvedComment,
}: Props<T>) => {
  const { watch, setValue } = useFormContext<T>();
  const [mode, setMode] = React.useState<"edit" | "view">("edit");
  const editorRef = useRef<any>(null);
  const value = watch(fieldPath);

  const handleChange = (value: string) => {
    // FIX THIS
    setValue(fieldPath, value as any);
  };

  // useEffect(() => {
  //   if (resolvedComment && editorRef.current) {
  //     const editor = editorRef.current;
  //     const content = editor.getContent();
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(content, "text/html");

  //     const commentSpan = doc.querySelector(
  //       `span[data-comment-id="${resolvedComment.uniqueId}"]`,
  //     );

  //     if (commentSpan) {
  //       commentSpan.textContent = resolvedComment.htmlString;
  //       commentSpan.removeAttribute("id");
  //       commentSpan.removeAttribute("data-comment-id");
  //       commentSpan.removeAttribute("style");
  //     }

  //     editor.setContent(doc.body.innerHTML);
  //     handleChange(doc.body.innerHTML);
  //   }
  // }, [resolvedComment]);

  if (typeof value === "object") {
    return (
      <div className="relative p-4 text-center border border-red-200 bg-red-50">
        Incorrect Value Format, please remove and re-add the widget.
        <div className="absolute top-0 right-1">{sortingControl}</div>
      </div>
    );
  }

  // IMPORTANT NOTE: CANNOT USE CONTROLLER WITH TINYMCE, IT WILL BREAK
  return (
    <div className="z-0 w-full p-2 -mt-8 space-y-5 rounded-md ">
      {viewOnly ? null : (
        <ToggleGroup
          type="single"
          size="sm"
          value={mode}
          className="absolute z-10 top-4 right-4"
          variant={"outline"}
        >
          <ToggleGroupItem
            value="edit"
            aria-label="Edit"
            onClick={() => setMode("edit")}
          >
            <Pencil className="w-4 h-auto" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="view"
            aria-label="View"
            onClick={() => setMode("view")}
          >
            <Eye className="w-4 h-auto" />
          </ToggleGroupItem>
        </ToggleGroup>
      )}
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onInit={(_, editor) => (editorRef.current = editor)}
        onEditorChange={(value) => {
          handleChange(value);
          return;
        }}
        // onNodeChange={(event) => {
        //   const {getSel, getSelectedBlocks, getStart, getEnd, getContent} = event?.target?.selection

        //   console.log(getContent?.())
        // }}
        value={value ?? "<p>This is the initial content of the editor.</p>"}
        init={{
          height: 800,
          plugins: [
            "preview",
            "importcss",
            "searchreplace",
            "autolink",
            "autosave",
            "save",
            "directionality",
            "code",
            "visualblocks",
            "visualchars",
            "fullscreen",
            "image",
            "link",
            "media",

            "codesample",
            "table",
            "charmap",
            "pagebreak",
            "nonbreaking",
            "anchor",
            "insertdatetime",
            "advlist",
            "lists",
            "wordcount",
            "help",
            "charmap",
            "quickbars",
            "emoticons",
          ],
          menubar: "file edit view insert format tools table help",
          toolbar_mode: "sliding",
          contextmenu: "link image table | customItem",
          quickbars_selection_toolbar:
            "bold italic | blocks | quicklink blockquote | customItem",
          // quickbars_selection_toolbar: "bold italic underline customItem",
          toolbar:
            "undo redo | bold italic underline strikethrough | bullist numlist | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          setup: (editor) => {
            editor.ui.registry.addButton("customItem", {
              icon: "comment-add",
              tooltip: "Add comment",
              onAction: () => {
                const selection = editor.selection;
                const selectedText = selection.getContent();
                const htmlString = selectedText;
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, "text/html");
                const hasComment = doc.body.querySelector('span[id="comment"]');
                const node = selection.getNode();

                const isInsideComment = (node: HTMLElement | null): boolean => {
                  while (node) {
                    if (node.id === "comment") {
                      return true;
                    }
                    node = node.parentElement;
                  }
                  return false;
                };

                if (hasComment || isInsideComment(node)) {
                  alert("The selected text already contains a comment.");
                  return;
                }

                const text = doc.body.textContent;

                if (text) {
                  const uniqueId = `comment-${Date.now()}`;

                  editor.selection.setContent(
                    `<span id="comment" data-comment-id="${uniqueId}" style="background-color:yellow;">${selectedText}</span>`,
                  );
                  // const updatedContent = editor.getContent();
                  onComment?.(text, htmlString, uniqueId);
                } else {
                  alert("Please select some text.");
                }
              },
            });
          },
        }}
      />
    </div>
  );
};

export default CommentEditor;
