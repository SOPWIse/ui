import { cn } from "@/lib/utils";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { TooltipHelper } from "../tooltip-helper";

interface Props extends React.ComponentProps<"form"> {
  title?: string;
  tooltipContent?: string;
}

const FormContainer = ({
  title,
  tooltipContent,
  children,
  className,
  ...props
}: Props) => {
  return (
    <form
      className={cn(
        "mb-10 flex h-max w-full flex-col items-start gap-4 rounded-md bg-background p-8",
        className
      )}
      {...props}
    >
      {title && (
        <h1 className="flex items-center gap-2 mb-4 text-2xl font-semibold text-foreground">
          {title}
          {tooltipContent && (
            <TooltipHelper
              trigger={
                <AiOutlineInfoCircle className="w-5 h-auto mt-1 fill-muted-foreground" />
              }
            >
              {tooltipContent}
            </TooltipHelper>
          )}
        </h1>
      )}
      {children}
    </form>
  );
};

export default FormContainer;
