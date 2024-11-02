import { Suspense } from "react";
import "./App.css";
import { Toaster } from "./components/toaster";
import { useTheme } from "./context/ThemeProvider";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { Loader } from "./components/loader";

function App() {
  const { theme } = useTheme();
  // TODO:CHANGE THIS LATER AFTER API IMPLEMENTATION
  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <Suspense fallback={<Loader />}>
      {isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
      <Toaster theme={theme} />
    </Suspense>
  );
}

export default App;
