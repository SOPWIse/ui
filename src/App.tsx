import "./App.css";
import { Suspense } from "react";
import { Toaster } from "./components/toaster";
import { useTheme } from "./context/ThemeProvider";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { Loader } from "./components/loader";
import { useUserQuery } from "./hooks/queries/user";
import { useUser } from "@clerk/clerk-react";

function App() {
  const { theme } = useTheme();
  const { data: userData } = useUserQuery();
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <Loader />;

  const isLoggedIn = !!userData || isSignedIn;

  return (
    <Suspense fallback={<Loader />}>
      {isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
      <Toaster theme={theme} />
    </Suspense>
  );
}

export default App;
