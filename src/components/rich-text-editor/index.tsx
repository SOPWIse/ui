import React, { ReactNode } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import RichTextView from "../rich-text-view";
import { ToggleGroup, ToggleGroupItem } from "../ui";
import { Eye, Pencil } from "lucide-react";

interface Props<T extends FieldValues> {
  fieldPath: FieldPath<T>;
  sortingControl: ReactNode;
}

const RichTextEditor = <T extends FieldValues>({
  sortingControl,
  fieldPath,
}: Props<T>) => {
  const { watch, setValue } = useFormContext<T>();
  const [mode, setMode] = React.useState<"edit" | "view">("edit");

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

  // IMPORTANT NOTE: CANNOT USE CONTROLLER WITH TINYMCE, IT WILL BREAK
  return (
    <div className="z-0 w-full p-2 -mt-8 space-y-5 rounded-md ">
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
      <>
        {mode === "edit" ? (
          <>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              onEditorChange={(value) => handleChange(value)}
              value={
                value ?? "<p>This is the initial content of the editor.</p>"
              }
              init={{
                height: 500,
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
                contextmenu: "link image table",
                toolbar:
                  "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </>
        ) : (
          <RichTextView value={value} />
        )}
      </>
    </div>
  );
};

export default RichTextEditor;
