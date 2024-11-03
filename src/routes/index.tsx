// LAZILY LOAD THE MODULES AND DEFINE THE ROUTING HERE, EXAMPLE SHOWN BELOW
/**
 * const UsersAndRoles = lazy(() => import("@/pages/users-and-roles"));
 *
 */

import Layout from "@/components/layout";
import { Loader } from "@/components/loader";
import AuthLayout from "@/pages/auth/components/auth-layout";
import SignIn from "@/pages/auth/sign-in";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/home"));
const SignUp = lazy(() => import("@/pages/auth/sign-up"));

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

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* TODO : DICUSS IF FORGOT PASSWORD IS NEEDED */}
        {/* <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<Loader />}>
              <ForgotPassword />
            </Suspense>
          }
        /> */}
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Route>
    </Routes>
  );
}
