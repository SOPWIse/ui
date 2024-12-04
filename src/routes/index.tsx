// LAZILY LOAD THE MODULES AND DEFINE THE ROUTING HERE, EXAMPLE SHOWN BELOW
/**
 * const UsersAndRoles = lazy(() => import("@/pages/users-and-roles"));
 *
 */

import { AppSidebar } from "@/components/app-sidebar";
import Layout from "@/components/layout";
import { Loader } from "@/components/loader";
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthLayout from "@/pages/auth/components/auth-layout";
import SignIn from "@/pages/auth/sign-in";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/home"));
const User = lazy(() => import("@/pages/user-management"));
const SOPContent = lazy(() => import("@/pages/sop-content"));

const SignUp = lazy(() => import("@/pages/auth/sign-up"));

const masterRoutes = [
  {
    path: "/home/*",
    element: <Home />,
    permission: "*",
  },
  {
    path: "/user/*",
    element: <User />,
    permission: "*",
  },
  {
    path: "/sop-content/*",
    element: <SOPContent />,
    permission: "*",
  },
];

export function PrivateRoutes() {
  return (
    <SidebarProvider className="relative z-20">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={"/home"} replace />}></Route>
          /** DEFINE THE ROUTES BELOW */
          {masterRoutes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={
                <Suspense fallback={<Loader />}>{route.element}</Suspense>
              }
            />
          ))}
          <Route path="*" element={<Navigate to={"/home"} replace />} />
        </Route>
      </Routes>
      <AppSidebar />
    </SidebarProvider>
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
