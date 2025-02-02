import { Skeleton } from "@/components/ui";

const EventSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col w-full border rounded-md min-h-[180px] p-4 gap-2">
      <Skeleton className="w-full h-28" />
      <div className="flex gap-2">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    </div>
  );
};

export default EventSkeleton;
