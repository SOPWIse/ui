import { Suspense } from "react";
import "./App.css";
import { Toaster } from "./components/toaster";
import { useTheme } from "./context/ThemeProvider";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { Loader } from "./components/loader";
import { useUserQuery } from "./hooks/queries/user";

function App() {
  const { theme } = useTheme();
  const { data: userData } = useUserQuery();
  const isLoggedIn = !!userData;

  return (
    <Suspense fallback={<Loader />}>
      {isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
      <Toaster theme={theme} />
    </Suspense>
  );
}

export default App;
