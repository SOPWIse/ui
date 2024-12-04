import * as React from "react";
import {
  GalleryVerticalEnd,
  NotebookPen,
  SearchIcon,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { FormInput } from "./form-input";
import { Button } from "./button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=change_this_later&eyebrows=default&eyes=default&mouth=smile`,
  },
  teams: [
    {
      name: "Sopwise",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "SOPs Module",
      url: "/sop-content",
      icon: NotebookPen,
      isActive: true,
      items: [
        {
          title: "SOPs",
          url: "/sop-content",
        },
      ],
    },
    {
      title: "Settings",
      url: "/user",
      icon: Settings,
      isActive: true,
      items: [
        {
          title: "Users & Permissions",
          url: "/user",
        },
      ],
    },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      {open && (
        <div className="relative flex items-center justify-center max-w-screen-md gap-2 px-2">
          <FormInput
            className="max-w-screen-md min-h-fit"
            placeholder="Search SOPs..."
          />
          {/* <kbd className="absolute pointer-events-none right-[0.3rem] top-[0.6rem] flex h-5 select-none items-center gap-1 rounded border border-[--border] bg-[--muted] px-1.5 font-mono text-[10px] font-medium opacity-100 [&amp;_span]:text-xs">
          <span>⌘</span>K
        </kbd> */}
          <Button variant={"outline"} className="max-w-sm h-9">
            <SearchIcon className="w-4 h-auto fill-background" />
          </Button>
        </div>
      )}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
