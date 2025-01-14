// NavigationButtons.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  disableNext: boolean;
}

const NavigationButtons = ({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  disableNext,
}: NavigationButtonsProps) => (
  <div className="flex justify-between mt-6">
    <Button
      type="button"
      variant="outline"
      onClick={onPrevious}
      disabled={currentSection === 0}
    >
      <ChevronLeft className="w-4 h-4 mr-2" />
      Previous
    </Button>
    <Button
      type="button"
      onClick={onNext}
      disabled={disableNext || currentSection === totalSections - 1}
    >
      Next
      <ChevronRight className="w-4 h-4 ml-2" />
    </Button>
  </div>
);

export default NavigationButtons;
