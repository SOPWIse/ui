import React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  children: React.ReactNode;
  className?: string;
}

export function Stepper({ children, className }: StepperProps) {
  return (
    <ol className={cn("flex items-center w-full", className)}>{children}</ol>
  );
}
