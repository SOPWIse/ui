import React, { ReactNode } from "react";
import { Editor as TextEditor } from "@tinymce/tinymce-react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import RichTextView from "../rich-text-view";
import { ToggleGroup, ToggleGroupItem } from "../ui";
import { Eye, Pencil } from "lucide-react";

function insertTitleSection(editor: any) {
  editor.insertContent(`
    <div class="title-section" data-id="title-section" style="text-align: center; margin: 20px 0;">
      <h1 style="font-size: 2rem; font-weight: bold;">Your Title Here</h1>
      <p style="font-size: 1rem; color: #666;">Subtitle or Description Here</p>
    </div>
  `);
}

function insertInputField(editor: any) {
  editor.insertContent(`
    <input type="text" data-id="input-field" placeholder="Enter text here" 
      style="width: 20%; padding: 8px; margin: 8px 0;">
  `);
}

function insertCheckbox(editor: any) {
  editor.insertContent(`
    <label data-id="checkbox">
      <input type="checkbox" style="margin-right: 5px;"> Check this box
    </label>
  `);
}

function insertRadioButton(editor: any) {
  editor.insertContent(`
    <label data-id="radio-button">
      <input type="radio" name="options" style="margin-right: 5px;"> Radio Option
    </label>
  `);
}

function insertTextArea(editor: any) {
  editor.insertContent(`
    <textarea rows="4" cols="50" data-id="text-area" 
      placeholder="Enter your text here" style="width: 20%; padding: 8px; margin: 8px 0;">
    </textarea>
  `);
}

interface Props<T extends FieldValues> {
  fieldPath: FieldPath<T>;
  sortingControl: ReactNode;
  viewOnly?: boolean;
}

const RichTextEditor = <T extends FieldValues>({
  sortingControl,
  fieldPath,
  viewOnly,
}: Props<T>) => {
  const { watch, setValue } = useFormContext<T>();
  const [mode, setMode] = React.useState<"edit" | "view">("edit");

  const value = watch(fieldPath);

  const handleChange = (value: string) => {
    console.log(value);
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
      <>
        {mode === "edit" ? (
          <>
            <TextEditor
              disabled={viewOnly}
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              onEditorChange={(value) => handleChange(value)}
              // onSelectionChange={(event) => console.log(JSON.stringify(event, null,2))}
              // onNodeChange={(event) => {
              //   const {getSel, getSelectedBlocks, getStart, getEnd, getContent} = event?.target?.selection

              //   console.log(getContent?.())
              // }}
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
                contextmenu: "link image table | customItem",
                quickbars_selection_toolbar:
                  "bold italic | blocks | quicklink blockquote | customItem",
                // quickbars_selection_toolbar: "bold italic underline customItem",
                toolbar:
                  "undo redo | bold italic underline strikethrough | bullist numlist | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl | insertTitleButton | insertFormComponents",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                setup: (editor) => {
                  editor.ui.registry.addButton("customItem", {
                    icon: "comment-add",
                    tooltip: "Add comment",
                    onAction: () => {
                      const selectedText = editor.selection.getContent();
                      console.log(
                        editor?.selection?.getNode()?.nodeName,
                        "<><><><><>"
                      );
                      console.log("Selected text", selectedText);
                      if (selectedText) {
                        // Apply custom logic here, e.g., wrap text in a custom span
                        editor.selection.setContent(
                          `<span style="background-color:red;color:white">${selectedText}</span>`
                        );
                      } else {
                        alert("Please select some text.");
                      }
                    },
                  });

                  editor.ui.registry.addMenuButton("insertFormComponents", {
                    text: "Components",
                    icon: "addtag",
                    fetch: function (callback) {
                      const items = [
                        {
                          type: "menuitem",
                          text: "Insert Title",
                          onAction: function () {
                            insertTitleSection(editor);
                          },
                        },
                        {
                          type: "menuitem",
                          text: "Input Field",
                          onAction: function () {
                            insertInputField(editor);
                          },
                        },
                        {
                          type: "menuitem",
                          text: "Checkbox",
                          onAction: function () {
                            insertCheckbox(editor);
                          },
                        },
                        {
                          type: "menuitem",
                          text: "Radio Button",
                          onAction: function () {
                            insertRadioButton(editor);
                          },
                        },
                        {
                          type: "menuitem",
                          text: "Text Area",
                          onAction: function () {
                            insertTextArea(editor);
                          },
                        },
                      ];
                      callback(items as any);
                    },
                  });
                },
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
