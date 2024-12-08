import { Navigate, Route, Routes } from "react-router-dom";
import SOPsDashboard from "./sops-dashboard";
import SOPOverview from "./create-sop/overview";
import SOPLayout from "./create-sop/components/sop-layout";
import Content from "./create-sop/content";
import Review from "./create-sop/review";

const SOPContent = () => {
  return (
    <Routes>
      <Route path="/" element={<SOPsDashboard />} />
      <Route path="/create" element={<SOPLayout />}>
        {/* CREATE CASE */}
        <Route path="overview" element={<SOPOverview />} />
      </Route>
      {/* CREATE CASE */}
      <Route path=":id/*" element={<SOPLayout />}>
        <Route path="overview" element={<SOPOverview />} />
        <Route path="content" element={<Content />} />
        <Route path="review" element={<Review />} />
      </Route>
      <Route path="/create" element={<div />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default SOPContent;
