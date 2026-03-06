import * as React from "react";
import { NavLink, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  UsersRound,
  FolderOpenDot,
  UserRoundCheck,
  ClipboardList,
  HandHelping,
  LayoutList,
  MessageCircleDashed,
  Settings,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

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
import { cn } from "~/lib/utils";

const navData = [
  { title: "Dashboard", url: "/home/dashboard", icon: LayoutDashboard },
  { title: "Personnel", url: "/home/personnel", icon: UsersRound },
  { title: "Projects", url: "/home/projects", icon: FolderOpenDot },
  { title: "Reports", url: "/home/reports", icon: ClipboardList },
  { title: "Requests", url: "/home/requests", icon: HandHelping },
  { title: "Attendance", url: "/home/attendance", icon: UserRoundCheck },
  { title: "To-do", url: "/home/to-do", icon: LayoutList },
  { title: "Team Chat", url: "/home/teamchat", icon: MessageCircleDashed },
  { title: "Settings", url: "/home/settings", icon: Settings },
];

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="bg-primary"
      {...props}
    >
      <SidebarHeader className="pt-8 px-6">
        <Link
          to="/home/dashboard"
          className="flex items-center gap-3 text-secondary ml-4"
        >
          <img
            src="/ssrl-logo.png"
            alt="SSRL Logo"
            className="p-2 bg-white rounded-md size-12"
          />
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-bold text-xl tracking-tight">SSRL</span>
            <span className="text-[10px] uppercase font-bold tracking-widest">
              Lab App
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="mt-10 px-4">
        <SidebarMenu className="gap-2">
          {navData.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={cn(
                    "group h-12 transition-all duration-300 rounded-xl px-4",
                    isActive
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 shadow-xl shadow-zinc-200/50 dark:shadow-none"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  <NavLink to={item.url} className="flex items-center w-full">
                    <item.icon
                      className={cn(
                        "size-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                        isActive ? "text-current" : "text-zinc-400",
                      )}
                    />
                    <span
                      className={cn(
                        "font-semibold ml-3 text-sm tracking-tight",
                        isActive ? "opacity-100" : "opacity-80",
                      )}
                    >
                      {item.title}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="ml-auto size-1.5 rounded-full bg-current"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
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
              className="h-12 rounded-xl text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300 group"
            >
              <Link to="/">
                <LogOut className="size-5 shrink-0 transition-transform group-hover:-translate-x-1" />
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
