import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FlowStepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function FlowStepper({
  steps,
  currentStep,
  onStepClick,
}: FlowStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeStep = stepsRefs.current[currentStep];
    if (activeStep && containerRef.current) {
      const container = containerRef.current;
      const stepRect = activeStep.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate the scroll position to center the active step
      const scrollLeft =
        activeStep.offsetLeft - containerRect.width / 2 + stepRect.width / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  return (
    <div ref={containerRef} className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-start px-4 py-2 space-x-4 min-w-max">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              ref={(el) => (stepsRefs.current[index] = el)}
              className="flex flex-col items-center"
              onClick={() => {
                onStepClick?.(index);
              }}
            >
              <div
                className={cn(
                  "w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center border-2 font-medium transition-colors",
                  index <= currentStep
                    ? "bg-primary border-primary text-foreground"
                    : "border-muted-foreground text-muted-foreground bg-background"
                )}
              >
                {index <= currentStep ? (
                  <Check className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <span className={cn("text-sm text-foreground")}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-2 px-2 text-center font-medium transition-colors max-w-[120px] line-clamp-2",
                  index === currentStep
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-[2px] w-16 transition-colors",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
