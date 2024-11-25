import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import { UsersTable } from "./components/data-table";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

const UserDashboard = () => {
  const { open } = useSidebar();

  return (
    <section
      className={cn(
        "w-full h-full p-10 ms-16 mt-12 bg-background text-foreground transition-all duration-300 ease-in-out",
        open ? "ms-[250px] w-[84%]" : "ms-[50px] w-[97%]"
      )}
    >
      <div className="flex items-center justify-between w-full mb-8">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <div className="flex gap-2">
          <Link to={"#"}>
            <Button>+ Add New User</Button>
          </Link>
        </div>
      </div>
      {/* Table */}
      <UsersTable />
    </section>
  );
};

export default UserDashboard;
