import RichTextEditor from "@/components/rich-text-editor";
import { SOP } from "@/schemas/sop-content";

const RichTextContent = () => {
  return (
    <div className="mt-3 space-y-0.5">
      <RichTextEditor<SOP>
        fieldPath="content"
        sortingControl={<div></div>}
        viewOnly={true}
      />
    </div>
  );
};

export default RichTextContent;
