import { Navigate, Route, Routes } from "react-router-dom";
import SOPsDashboard from "./sops-dashboard";

const SOPContent = () => {
  return (
    <Routes>
      <Route path="/" element={<SOPsDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default SOPContent;
