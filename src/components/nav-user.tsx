import { BadgeCheck, Bell, LogOut, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { CaretSortIcon, ComponentPlaceholderIcon } from "@radix-ui/react-icons";
import { useUserQuery } from "@/hooks/queries/user";
import { Skeleton } from "./ui";
import { useLogoutMutation } from "@/hooks/mutations";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function NavUser() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { data: userData, isLoading: isUserDataLoading } = useUserQuery();
  const logoutMutation = useLogoutMutation();
  const imgSrc = `https://api.dicebear.com/7.x/avataaars/svg?seed=${
    userData?.name ?? "avatar"
  }&eyebrows=default&eyes=default&mouth=smile`;

  const logout = () => {
    logoutMutation.mutate();
  };

  if (isUserDataLoading)
    return (
      <>
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-10" />
      </>
    );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="w-8 h-8 rounded-lg">
                <AvatarImage src={imgSrc} alt={userData?.name} />
                <AvatarFallback className="rounded-lg">A</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="font-semibold truncate">{userData?.name}</span>
                <span className="text-xs truncate">{userData?.email}</span>
              </div>
              <CaretSortIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarImage src={imgSrc} alt={userData?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-semibold truncate">
                    {userData?.name}
                  </span>
                  <span className="text-xs truncate">{userData?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/sop-content/create/overview");
                }}
              >
                <Sparkles />
                Create New SOP
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/user");
                }}
              >
                <BadgeCheck />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/sop-content");
                }}
              >
                <ComponentPlaceholderIcon />
                My SOPs
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <p className="ml-1 text-muted-foreground text-[10px]">
                Background
              </p>
              <DropdownMenuItem
                className="flex justify-between gap-2 p-1 m-0 focus:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((_, index) => {
                  return (
                    <div
                      className={cn(
                        "w-[25px] gap-2 ring-1 h-[25px] text-center p-2 hover:bg-accent rounded-full cursor-pointer",
                        index === 0 && "bg-purple-300 hover:bg-purple-400",
                        index === 1 &&
                          "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600",
                        index === 2 &&
                          "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600",
                        index === 3 &&
                          "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600",
                        index === 4 &&
                          "bg-gradient-to-r from-gray-500 to-white-500 hover:from-gray-600 hover:to-white-600",
                        index === 5 &&
                          "bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600",
                        localStorage.getItem("bgId") === index.toString() &&
                          "ring-4 ring-accent-foreground"
                      )}
                      onClick={() => {
                        localStorage.setItem("bgId", index.toString());
                        window.location.reload();
                      }}
                    />
                  );
                })}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
