import { Link } from "react-router-dom";

import { useTheme } from "@/context/ThemeProvider";
import { ToggleTheme } from "../theme-toggler";

const Logo = {
  light: "light logo",
  dark: "dark logo",
} as const;

const Navbar = () => {
  const { theme, systemPreference } = useTheme();
  const NavLogo = theme === "system" ? Logo[systemPreference] : Logo[theme];

  return (
    <nav className="fixed top-0 z-20 w-full border-b bg-background">
      <div className="max-w-full px-2 mx-auto sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14">
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <Link
              to="/"
              className="flex items-center justify-center flex-shrink-0"
            >
              {/* CHANGE THIS TO IMG WHEN WE HAVE THE LOGOS */}
              <h1 className="block w-auto h-11">{NavLogo}</h1>
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <ToggleTheme />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
