import { cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";

const Scaffold = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar();
  return (
    <section
      className={cn(
        "w-full h-full p-10 mt-12 bg-background text-foreground transition-all duration-300 ease-in-out",
        open ? "ms-[230px] w-[84%]" : "ms-[50px] w-[97%]"
      )}
    >
      {children}
    </section>
  );
};

export default Scaffold;
