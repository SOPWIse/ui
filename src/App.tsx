import "./App.css";
import { Toaster } from "./components/toaster";
import { useTheme } from "./context/ThemeProvider";
import { PrivateRoutes, PublicRoutes } from "./routes";

function App() {
  const { theme } = useTheme();
  // TODO:CHANGE THIS LATER AFTER API IMPLEMENTATION
  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <>
      {isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
      <Toaster theme={theme} />
    </>
  );
}

export default App;
