import { Navigate, Route, Routes } from "react-router-dom";
import UserDashboard from "./dashboard";
import EditUser from "./edit-user";
import Layout from "./edit-user/components/layout";

const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="edit-user/:id/*" element={<Layout />}>
        <Route path="" element={<EditUser />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Users;
