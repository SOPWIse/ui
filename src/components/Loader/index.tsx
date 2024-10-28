import { getRandomQuote } from "@/utils/getRandomQuote";
import type { ComponentProps } from "react";
import { HashLoader } from "react-spinners";

interface ILoaderProps extends ComponentProps<typeof HashLoader> {}

export function Loader({ ...props }: ILoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <HashLoader
        color="#505050"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        {...props}
      />
      <span className="italic text-muted-foreground">
        "{getRandomQuote()?.quote}"
      </span>
    </div>
  );
}
