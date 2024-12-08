import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { SOPsTable } from "../components/data-table";
import Scaffold from "@/components/scaffold";

const SOPsDashboard = () => {
  return (
    <Scaffold>
      <div className="flex items-center justify-between w-full mb-8">
        <h1 className="text-3xl font-bold">SOPs Dashboard</h1>
        <div className="flex gap-2">
          <Link to={"/sop-content/create/overview"}>
            <Button>+ Add New SOP</Button>
          </Link>
        </div>
      </div>
      {/* Table */}
      <SOPsTable />
    </Scaffold>
  );
};

export default SOPsDashboard;
