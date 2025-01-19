import { formatDate } from "@/utils/formatDate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Clock } from "lucide-react";

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

  return (
    <div className="relative mt-8 -ml-10 cursor-pointer" ref={parent}>
      {/* Vertical line */}
      {items.length > 1 && (
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted"></div>
      )}
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex gap-6 pb-8 group min-w-[200px]"
          onClick={() => onStepClick?.(index + 1)}
        >
          {/* Timeline dot */}
          <div className="absolute z-10 w-3 h-3 transition-colors duration-300 -translate-x-1/2 border-2 rounded-full border-accent bg-secondary left-8 group-hover:bg-dot-accent"></div>
          {/* Card */}
          <div className="flex-1 ml-12 max-w-[150px]">
            <div className="w-full p-2 transition-all duration-300 transform border rounded-lg bg-card hover:shadow-lg hover:-translate-y-1">
              <div className="flex items-center w-full gap-2 mb-2 text-sm text-gray-500">
                <Clock size={16} className="text-blue-500" />
                <span className="text-xs">
                  {formatDate(new Date().toISOString(), "dd-MMM-yyyy")}
                </span>
              </div>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 w-10 rounded-full  text-xs">
                Completed
              </span>
              <p className="mb-2 text-[10px] leading-relaxed line-clamp-3 text-muted-foreground">
                {JSON.stringify(item.content)}
              </p>
              {/* <p className="leading-relaxed text-gray-600">{"Hi"}</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
