import "./App.css";
import { Toaster } from "./components/toaster";
import { useTheme } from "./context/ThemeProvider";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { Loader } from "./components/loader";
import useAuthStatus from "./hooks/queries/user/useAuthStatus";

function App() {
  const { theme } = useTheme();

  const { isLoggedIn, isLoading } = useAuthStatus();

  if (isLoading) return <Loader />;

  return (
    <>
      {isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
      <Toaster theme={theme} />
    </>
  );
}

export default App;
