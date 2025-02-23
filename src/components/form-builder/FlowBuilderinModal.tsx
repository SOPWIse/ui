import { useState } from "react";
import { ContentSection } from "./flow-builder.types";
import { Modal } from "../modal";
import { Button } from "../button";
import { Expand } from "lucide-react";
import { FlowBuilder } from "./FlowBuilder";

export const FlowBuilderInModal = ({
  sections,
  onComplete,
}: {
  sections: ContentSection[];
  onComplete: (data: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      className="flex flex-col min-w-[98vw] min-h-[98vh] gap-2"
      trigger={
        <Button type="button" variant={"secondary"}>
          <div className="flex items-center gap-2">
            <Expand className="size-4" />
          </div>
        </Button>
      }
    >
      <FlowBuilder
        sections={sections}
        onComplete={onComplete}
        className="h-[95vh]"
      />
    </Modal>
  );
};
