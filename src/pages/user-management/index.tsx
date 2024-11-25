import { Navigate, Route, Routes } from "react-router-dom";
import UserDashboard from "./dashboard";

const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Users;
