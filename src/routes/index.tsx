// LAZILY LOAD THE MODULES AND DEFINE THE ROUTING HERE, EXAMPLE SHOWN BELOW
/**
 * const UsersAndRoles = lazy(() => import("@/pages/users-and-roles"));
 *
 */

import Layout from "@/components/Layout";
import { Loader } from "@/components/Loader";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/home"));

const masterRoutes = [
  {
    path: "/home/*",
    element: <Home />,
    permission: "*",
  },
];

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={"/home"} replace />}></Route>
        /** DEFINE THE ROUTES BELOW */
        {masterRoutes.map((route, index) => (
          <Route
            path={route.path}
            key={index}
            element={<Suspense fallback={<Loader />}>{route.element}</Suspense>}
          />
        ))}
        <Route path="*" element={<Navigate to={"/home"} replace />} />
      </Route>
    </Routes>
  );
}
