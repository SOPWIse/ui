import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, useNavigate } from "react-router-dom";
import { ScrollToTop } from "./utils/ScrollToTop.ts";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import App from "./App.tsx";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk publishable key to the .env.local file");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: () => false,
      refetchOnWindowFocus: false,
    },
  },
});

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <ClerkLoaded>
        {children}
        <Outlet />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider>
          <RootLayout>
            <App />
          </RootLayout>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
