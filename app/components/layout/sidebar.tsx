import * as React from "react";
import { NavLink, Link, useLocation } from "react-router";
import {
  Category,
  People,
  FolderOpen,
  UserTick,
  ClipboardText,
  PresentionChart,
  Task,
  Messages1,
  Setting2,
  Logout,
} from "iconsax-reactjs";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import HorizontalLogo from "../ui/HorizontalLogo";
import { cn } from "~/lib/utils";

const navData = [
  { title: "Dashboard", url: "/dashboard", icon: Category },
  { title: "Personnel", url: "/personnel", icon: People },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Reports", url: "/reports", icon: ClipboardText },
  { title: "Requests", url: "/requests", icon: PresentionChart },
  { title: "Attendance", url: "/attendance", icon: UserTick },
  { title: "To-do", url: "/to-do", icon: Task },
  { title: "Team Chat", url: "/teamchat", icon: Messages1 },
  { title: "Settings", url: "/settings", icon: Setting2 },
];

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="bg-primary border-none"
      {...props}
    >
      <SidebarHeader className="pt-8 px-6">
        <HorizontalLogo />
      </SidebarHeader>

      <SidebarContent className="mt-10 px-4 pr-0">
        <SidebarMenu className="gap-4">
          {navData.map((item) => {
            const isActive = location.pathname.startsWith(item.url);
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={cn(
                    "group h-16 transition-all duration-300 rounded-l-full px-0",
                    isActive ? "bg-white hover:bg-white" : "hover:bg-white/10",
                  )}
                >
                  <NavLink
                    to={item.url}
                    className={cn(
                      "flex items-center gap-3 w-full h-full pl-4 transition-all duration-300",
                      isActive ? "activeText" : "",
                    )}
                  >
                    <Icon
                      size="20"
                      variant={isActive ? "Bold" : "Linear"}
                      className={cn(
                        "shrink-0 transition-all duration-300",
                        isActive
                          ? "text-primary scale-110"
                          : "text-zinc-100/70 group-hover:text-white group-hover:scale-110",
                      )}
                    />

                    <span
                      className={cn(
                        "text-sm tracking-tight transition-all duration-300",
                        isActive
                          ? "font-bold text-primary"
                          : "font-medium text-zinc-100/80 group-hover:text-white",
                      )}
                    >
                      {item.title}
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="pb-10 px-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-12 rounded-xl text-zinc-100/70 hover:text-red-400 hover:bg-white/10 transition-all duration-300 group"
            >
              <Link to="/">
                <Logout
                  size="20"
                  variant="Linear"
                  className="shrink-0 transition-transform group-hover:-translate-x-1"
                />
                <span className="font-bold ml-3 text-sm">Log Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
