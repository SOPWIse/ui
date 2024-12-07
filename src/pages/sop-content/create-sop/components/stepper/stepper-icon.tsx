import React from "react";
import { Check } from "lucide-react";
import { useStepperContext } from "./stepper-context";
import { cn } from "@/lib/utils";

interface StepperIconProps {
  step: number;
  icon?: React.ReactNode;
  className?: string;
}

export function StepperIcon({ step, icon, className }: StepperIconProps) {
  const { isStepComplete, isStepActive } = useStepperContext();
  const completed = isStepComplete(step);
  const active = isStepActive(step);

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200",
        {
          "border-blue-600 bg-blue-600 text-white scale-110": completed,
          "border-blue-600 bg-white text-blue-600": active && !completed,
          "border-gray-300 bg-white text-gray-500": !active && !completed,
        },
        className
      )}
    >
      {completed ? (
        <Check className="w-5 h-5 animate-scale-check" />
      ) : (
        icon || <span className="text-sm font-medium">{step + 1}</span>
      )}
    </div>
  );
}
