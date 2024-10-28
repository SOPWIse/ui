import "./App.css";
import { Toaster } from "./components/Toaster";
import { useTheme } from "./context/ThemeProvider";
import { PrivateRoutes } from "./routes";

function App() {
  const { theme } = useTheme();
  // TODO:CHANGE THIS LATER AFTER API IMPLEMENTATION
  const isLoggedIn = true;

  return (
    <>
      {isLoggedIn ? <PrivateRoutes /> : null}
      <Toaster theme={theme} />
    </>
  );
}

export default App;
