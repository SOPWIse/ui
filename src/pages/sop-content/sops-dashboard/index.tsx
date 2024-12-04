import { Button } from "@/components/ui";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { SOPsTable } from "../components/data-table";

const SOPsDashboard = () => {
  const { open } = useSidebar();

  return (
    <section
      className={cn(
        "w-full h-full p-10 mt-12 bg-background text-foreground transition-all duration-300 ease-in-out",
        open ? "ms-[250px] w-[84%]" : "ms-[50px] w-[97%]"
      )}
    >
      <div className="flex items-center justify-between w-full mb-8">
        <h1 className="text-3xl font-bold">SOPs Dashboard</h1>
        <div className="flex gap-2">
          <Link to={"#"}>
            <Button>+ Add New SOP</Button>
          </Link>
        </div>
      </div>
      {/* Table */}
      <SOPsTable />
    </section>
  );
};

export default SOPsDashboard;
