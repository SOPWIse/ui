import { cn } from "@/lib/utils";
import React from "react";

interface StepperDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function StepperDescription({
  children,
  className,
}: StepperDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground text-center max-w-[200px]",
        className
      )}
    >
      {children}
    </p>
  );
}
