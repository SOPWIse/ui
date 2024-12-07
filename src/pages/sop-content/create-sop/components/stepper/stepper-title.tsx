import { cn } from "@/lib/utils";
import React from "react";

interface StepperTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function StepperTitle({ children, className }: StepperTitleProps) {
  return (
    <h3 className={cn("text-base text-center font-semibold", className)}>
      {children}
    </h3>
  );
}
