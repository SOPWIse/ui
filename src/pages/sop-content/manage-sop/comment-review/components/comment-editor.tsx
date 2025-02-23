import React, { memo, ReactNode, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Eye, Pencil } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui";

interface Props<T extends FieldValues> {
  fieldPath: FieldPath<T>;
  sortingControl: ReactNode;
  viewOnly?: boolean;
  onComment?: any;
}

const CommentEditor = memo(
  <T extends FieldValues>({
    sortingControl,
    fieldPath,
    viewOnly,
    onComment,
  }: Props<T>) => {
    const { watch, setValue } = useFormContext<T>();
    const [mode, setMode] = React.useState<"edit" | "view">("edit");
    const editorRef = useRef<any>(null);
    const value = watch(fieldPath);

    const handleChange = (value: string) => {
      // FIX THIS
      setValue(fieldPath, value as any);
    };

    if (typeof value === "object") {
      return (
        <div className="relative p-4 text-center border border-red-200 bg-red-50">
          Incorrect Value Format, please remove and re-add the widget.
          <div className="absolute top-0 right-1">{sortingControl}</div>
        </div>
      );
    }

    // if (!editorReady) {
    //   return (
    //     <div className="relative p-4 text-center border border-yellow-200 bg-yellow-50">
    //       Loading Editor...
    //       <div className="absolute top-0 right-1">{sortingControl}</div>
    //     </div>
    //   );
    // }

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
        <div>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            onInit={(_, editor) => {
              editorRef.current = editor;
              editor.focus();
            }}
            onEditorChange={(value) => {
              handleChange(value);
            }}
            disabled={mode === "view"}
            initialValue={
              value ?? "<p>This is the initial content of the editor.</p>"
            }
            init={{
              height: 800,
              content_css: "default",
              content_style:
                "span#comment {background-color: yellow !important; }",
              valid_classes: "comment",
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
                    const hasComment =
                      doc.body.querySelector('span[id="comment"]');
                    const node = selection.getNode();

                    const isInsideComment = (
                      node: HTMLElement | null
                    ): boolean => {
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

                      // editor.selection.setContent(
                      //   `<span id="comment" data-comment-id="${uniqueId}" style="background-color:yellow;">${selectedText}</span>`
                      // );
                      // // const updatedContent = editor.getContent();
                      // onComment?.(text, htmlString, uniqueId);
                      editor.insertContent(
                        `<span id="comment" data-comment-id="${uniqueId}" style="background-color:yellow;">${selectedText}</span>`
                      );

                      // 4. Restore the selection (optional, but good UX)
                      selection.select(
                        editor.dom.select(
                          `span#comment[data-comment-id="${uniqueId}"]`
                        )[0]
                      );

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
      </div>
    );
  }
);

export default CommentEditor;
