import { ClipboardCheck } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  currentStep: number;
  totalSteps: number;
}

const SectionHeader = ({
  title,
  currentStep,
  totalSteps,
}: SectionHeaderProps) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        <ClipboardCheck className="w-5 h-5" />
        {title}
      </h2>
      <div className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  </div>
);

export default SectionHeader;
