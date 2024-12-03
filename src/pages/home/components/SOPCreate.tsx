import React, { useRef, useState } from "react";
import { Button } from "@/components/button";
import { Editor } from "@tinymce/tinymce-react";
import { api } from "@/interceptor/api";

const SOPWiseCreate = () => {
  const editorRef = useRef<any>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const blob = new Blob([content], { type: "text/html" });
      const file = new File([blob], "sop.html", { type: "text/html" });

      const formData = new FormData();
      formData.append("file", file);

      setIsLoading(true);
      try {
        const response = await api.post("/sop/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUploadStatus(`File uploaded successfully! URL: ${response.data.url}`);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadStatus("File upload failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setUploadStatus("Editor is not initialized.");
    }
  };

  const editorConfig = {
    plugins: [
      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown importword exportword exportpdf preview fullscreen",
    ],
    toolbar:
      "undo redo | importword exportword exportpdf | preview fullscreen |blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    skin: "oxide",
    content_css: "default",
  };

  return (
    <div className="flex flex-col items-center w-full h-[100vh] p-8">
      <h1 className="text-3xl font-semibold text-center mb-5">Create SOP</h1>
      <div className="w-full">
        <Editor
          apiKey="q00or1ia77h4sniz0esz75bjogiifry0yg4u37rdlgxkee6g"
          init={editorConfig}
          initialValue="Start your SOP here..."
          onInit={(evt, editor) => (editorRef.current = editor)}
        />
      </div>
      <Button
        className={`p-0 w-full mt-10 items-center justify-center ${
          isLoading ? "opacity-50" : ""
        }`}
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Submit for Review"}
      </Button>
      {uploadStatus && <p className="mt-5">{uploadStatus}</p>}
    </div>
  );
};

export default SOPWiseCreate;
