import { ContentSection } from "./flow-builder.types";
import { FlowBuilder } from "./FlowBuilder";

interface FormParserProps {
  sections: ContentSection[];
  onSubmit?(data: any): void;
}

function FormParser({ sections, onSubmit }: FormParserProps) {
  const handleComplete = (data: any) => {
    console.log("Form data:", data);
    onSubmit?.(data);
  };

  return (
    <div className="w-full min-h-fit bg-background">
      <FlowBuilder sections={sections} onComplete={handleComplete} />
    </div>
  );
}

export default FormParser;
