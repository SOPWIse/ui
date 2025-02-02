import { useNavigate } from "react-router-dom";
import { SignedIn, SignOutButton, useAuth } from "@clerk/clerk-react";

// import { useTheme } from "@/context/ThemeProvider";
import { ToggleTheme } from "../theme-toggler";
import { useLogoutMutation } from "@/hooks/mutations";
import { useUser } from "@clerk/clerk-react";
import { Button } from "../button";
import { MdOutlineNotifications } from "react-icons/md";

// const Logo = {
//   light: "",
//   dark: "",
// } as const;

const Navbar = () => {
  // const { theme, systemPreference } = useTheme();
  // const NavLogo = theme === "system" ? Logo[systemPreference] : Logo[theme];
  const navigate = useNavigate();
  const logout = useLogoutMutation();
  const ssoUserData = useUser();
  const ssoAuth = useAuth();

  const handleLogout = () => {
    if (ssoUserData.isSignedIn) {
      ssoAuth.signOut();
    }
    logout.mutate();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 z-20 w-full border-b bg-sidebar">
      <div className="max-w-full px-2 mx-auto sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14">
          <div></div>
          {/* <div className="flex items-center justify-center flex-1 ">
            <Link
              to="/"
              className="flex items-center justify-center flex-shrink-0"
            >
              <h1 className="block w-auto h-11">{NavLogo}</h1>
            </Link>
          </div> */}

          {/* <button
            className="[--background:#000000] [--color:#ffffff] [--muted:#242424] [--muted-foreground:#9c9c9c] [--border:#2e2e2e] relative inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-[--border] bg-[--background] hover:bg-[--muted] text-[--muted-foreground] hover:text-[--color] px-4 py-2 justify-start rounded-[0.5rem] text-sm font-normal shadow-none h-8 w-64"
            type="button"
          >
            <span className="hidden lg:inline-flex">Search docs...</span>
            <span className="inline-flex lg:hidden">Search...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] flex h-5 select-none items-center gap-1 rounded border border-[--border] bg-[--muted] px-1.5 font-mono text-[10px] font-medium opacity-100 [&amp;_span]:text-xs">
              <span>⌘</span>K
            </kbd>
          </button> */}

          <div className="flex items-center justify-center">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <ToggleTheme />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button className="relative inline-block">
                <MdOutlineNotifications className="w-6 h-auto fill-foreground" />
                {true && (
                  // <span className="animate-ping transition-all duration-1000 ease-in-out absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>
                  <span className="absolute right-0.5 top-0.5 block h-1 w-1 rounded-full bg-red-400 ring-2 ring-red-300"></span>
                )}
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <SignedIn>
                <SignOutButton
                  children={
                    <Button variant={"link"} onClick={handleLogout}>
                      <p>Log Out</p>
                    </Button>
                  }
                ></SignOutButton>
              </SignedIn>
            </div>
            {!ssoUserData.isSignedIn && (
              <Button
                variant={"link"}
                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                onClick={handleLogout}
              >
                LogOut
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
