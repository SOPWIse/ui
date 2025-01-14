import { createContext, useContext } from "react";

interface StepperContextValue {
  activeStep: number;
  isStepComplete: (step: number) => boolean;
  isStepActive: (step: number) => boolean;
  totalSteps: number;
}

export const StepperContext = createContext<StepperContextValue | undefined>(
  undefined,
);

export function useStepperContext() {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper");
  }
  return context;
}
