import React from "react";
import { useStepperContext } from "./stepper-context";

interface StepperContentProps {
  step: number;
  children: React.ReactNode;
}

export function StepperContent({ step, children }: StepperContentProps) {
  const { isStepActive } = useStepperContext();

  if (!isStepActive(step)) {
    return null;
  }

  return <div className="mt-4">{children}</div>;
}
