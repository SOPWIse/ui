import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Home;
