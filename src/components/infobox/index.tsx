import React, { type ComponentProps, type HTMLAttributes } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { cn } from "@/lib/utils";

interface InfoBoxProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: ComponentProps<typeof Alert>["variant"];
  className?: HTMLAttributes<typeof Alert>["className"];
}

export function InfoBox({
  title,
  children,
  icon,
  variant = "default",
  className,
}: InfoBoxProps) {
  return (
    <Alert variant={variant} className={cn(className)}>
      {title ? (
        <>
          {icon ? icon : <AiOutlineInfoCircle className="w-4 h-4" />}
          <AlertTitle className="text-sm">{title}</AlertTitle>
        </>
      ) : null}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
