import "./App.css";
import { useTheme } from "@/context/ThemeProvider";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { Loader } from "@/components/loader";
import useAuthStatus from "@/hooks/queries/user/useAuthStatus";
import { Suspense } from "react";
import SmoothTransition from "@/components/smooth-transition";
import { Toaster } from "@/components/toaster";

function App() {
  const { theme } = useTheme();

  const { isLoggedIn, isLoading } = useAuthStatus();

  if (isLoading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <>
        <SmoothTransition>
          {isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
        </SmoothTransition>
        <Toaster theme={theme} />
      </>
    </Suspense>
  );
}

export default App;
