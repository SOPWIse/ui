import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  storageKey?: string;
}

interface ThemeProviderState {
  theme: "light" | "dark" | "system";
  setTheme: (theme: ThemeProviderState["theme"]) => void;
  systemPreference: "light" | "dark";
}

const initialState = {
  theme: "system",
  setTheme: () => null,
  systemPreference: window.matchMedia("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light",
} satisfies ThemeProviderState;

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeProviderState["theme"]>(
    () =>
      (localStorage.getItem(storageKey) ||
        defaultTheme) as ThemeProviderState["theme"],
  );

  useEffect(() => {
    const root = window?.document?.documentElement;

    root?.classList?.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        ?.matches
        ? "dark"
        : "light";

      root?.classList?.add(systemTheme);
      return;
    }

    root?.classList?.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    systemPreference: window.matchMedia("(prefers-color-scheme: dark)")?.matches
      ? "dark"
      : "light",
  } satisfies ThemeProviderState;

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
