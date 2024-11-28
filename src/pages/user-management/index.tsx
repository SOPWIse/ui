import { Navigate, Route, Routes } from "react-router-dom";
import UserDashboard from "./dashboard";
import EditUser from "./edit-user";

const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="edit-user/:id/*" element={<EditUser />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Users;
