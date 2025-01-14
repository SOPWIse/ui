import { cn } from "@/lib/utils";

export function Background() {
  return (
    <div
      className={cn(
        "w-full -z-50 h-screen fixed top-0 right-0 left-0 dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.1] flex items-center justify-center",
      )}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="relative z-20 py-8 text-4xl font-bold text-transparent sm:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500"></p>
    </div>
  );
}
