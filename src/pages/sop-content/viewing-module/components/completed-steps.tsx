import { Separator } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Clock, NotebookPen } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export interface TimelineItem {
  section_title: string;
  content: any;
}

interface TimelineProps {
  items: TimelineItem[];
  onStepClick?: (index: number) => void;
}

export function CompletedStepsTimeline({ items, onStepClick }: TimelineProps) {
  const [parent] = useAutoAnimate();
  const [searchParams] = useSearchParams();
  const currentStep = parseInt(searchParams.get("step") || "0", 10);

  return (
    <div className="relative w-full mt-8 -ml-10 cursor-pointer" ref={parent}>
      {/* Vertical line */}
      {/* {items.length > 1 && (
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted"></div>
      )} */}
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex min-w-full gap-6 pb-8 group"
          onClick={() => onStepClick?.(index)}
        >
          {/* Timeline dot */}
          {/* <div className="absolute z-10 w-3 h-3 transition-colors duration-300 -translate-x-1/2 border-2 rounded-full border-accent bg-secondary left-8 group-hover:bg-dot-accent"></div> */}
          {/* Card */}
          <div className="flex-1 max-w-full ml-10">
            <div className="p-2 transition-all duration-300 transform border rounded-lg bg-card hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center w-full gap-2 mb-2 text-sm text-gray-500">
                <Clock size={16} className="text-blue-500" />
                <span className="text-xs">
                  {formatDate(
                    new Date().toISOString(),
                    "hh:mm:ss b dd MMM yyyy"
                  )}
                </span>
              </div>
              <span
                className={cn(
                  "bg-blue-100 text-blue-700 px-2 py-0.5 w-10 rounded-full  text-xs",
                  currentStep < index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-700"
                )}
              >
                Step: {index + 1} of {items.length} -{" "}
                {currentStep < index + 1 ? "Current" : "Completed"}
              </span>
              <p className="mb-2 text-[10px] leading-relaxed line-clamp-3 text-muted-foreground">
                {JSON.stringify(item.content)}
              </p>
              <Separator />
              <div className="flex items-center gap-2 mt-1">
                <NotebookPen className="w-4 h-4 mr-1 text-muted-foreground" />
                <p className="text-xs leading-relaxed text-gray-600">
                  Section : {item.section_title}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
