import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function TimeTracker({ step }: { step: number }) {
  const [startTime, setStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState("0:00");

  useEffect(() => {
    // Reset start time whenever the step changes
    setStartTime(new Date());
  }, [step]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diffInSeconds = Math.floor(
        (now.getTime() - startTime.getTime()) / 1000
      );
      const minutes = Math.floor(diffInSeconds / 60);
      const seconds = diffInSeconds % 60;
      setElapsedTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex items-center p-3 space-x-2 border rounded-md h-9 bg-card">
      <Clock className="w-5 h-5 text-blue-500" />
      <div className="text-sm font-medium">
        <span className="text-gray-600">Step {step}</span>
        <span className="mx-2">•</span>
        <span className="text-blue-500">{elapsedTime}</span>
      </div>
    </div>
  );
}
