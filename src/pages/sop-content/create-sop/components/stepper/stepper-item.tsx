import React from "react";
import { useStepperContext } from "./stepper-context";
import { cn } from "@/lib/utils";

interface StepperItemProps {
  step: number;
  children: React.ReactNode;
  className?: string;
}

export function StepperItem({ step, children, className }: StepperItemProps) {
  const { isStepComplete, isStepActive, totalSteps } = useStepperContext();
  const completed = isStepComplete(step);
  const active = isStepActive(step);
  const isLastStep = step === totalSteps - 1;

  return (
    <li className={cn("flex-1 relative", className)}>
      {!isLastStep && (
        <div
          className={cn(
            "absolute top-5 w-full h-[2px] transition-colors duration-300",
            {
              "bg-blue-600": completed,
              "bg-gray-200": !completed,
            },
          )}
          style={{ left: "50%" }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 flex flex-col items-center">{children}</div>
    </li>
  );
}
