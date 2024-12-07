import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { TooltipHelper } from "../tooltip-helper";

interface FormTextAreaProps extends ComponentPropsWithoutRef<typeof Textarea> {
  label?: string;
  error?: string;
  tooltipContent?: ReactNode;
}

export const FormTextArea = forwardRef<
  React.ElementRef<typeof Textarea>,
  FormTextAreaProps
>(({ label, className, error, tooltipContent, ...props }, ref) => {
  return (
    <div className="flex flex-col flex-wrap items-start w-full gap-1">
      {/* LABEL */}
      {label && (
        <div className="flex items-center">
          <Label
            className={cn(
              "leading-9",
              props.required && "after:text-red-400 after:content-['*']"
            )}
            htmlFor={props?.id}
          >
            {label}{" "}
          </Label>
          {tooltipContent && (
            <TooltipHelper
              trigger={
                <AiOutlineInfoCircle className="mx-1 fill-muted-foreground" />
              }
            >
              {tooltipContent}
            </TooltipHelper>
          )}
        </div>
      )}
      {/* INPUT WITH OPTIONAL PREFIX */}
      <div className="flex w-full">
        <Textarea
          ref={ref}
          className={cn(error && "ring-1 ring-red-400", className)}
          {...props}
        />
      </div>
      {/* ERROR */}
      {error && <span className="text-[12px] text-red-700">{error}</span>}
    </div>
  );
});
