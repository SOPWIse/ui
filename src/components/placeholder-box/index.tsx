import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.ComponentProps<"div"> {
  text?: string;
}

export const PlaceholderBox = ({ text, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-md bg-muted p-8 text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span>{text ?? "Coming Soon"}</span>
    </div>
  );
};
