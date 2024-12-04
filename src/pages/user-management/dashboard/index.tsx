import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import { UsersTable } from "./components/data-table";
import Scaffold from "@/components/scaffold";

const UserDashboard = () => {
  return (
    <Scaffold>
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
    </Scaffold>
  );
};

export default UserDashboard;
