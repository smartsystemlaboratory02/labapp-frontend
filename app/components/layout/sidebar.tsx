import * as React from "react";
import { NavLink, useLocation } from "react-router";
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
import { useLogoutMutation } from "~/services/onboarding/queries";
import { toast } from "sonner";

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

  const { mutate: logout, isError, isPending } = useLogoutMutation();

  React.useEffect(() => {
    if (isError) {
      toast.error("Failed to logout");
    }
  }, [isError]);

  return (
    <Sidebar
      variant="sidebar"
      collapsible="none"
      className="bg-primary border-none h-screen"
      {...props}
    >
      <SidebarHeader className="pt-8 px-6">
        <HorizontalLogo />
      </SidebarHeader>

      <SidebarContent className="mt-6 px-4 pr-0">
        <SidebarMenu className="flex-1 space-y-7 font-semibold">
          {navData.map((item) => {
            const isActive = location.pathname.startsWith(item.url);
            const Icon = item.icon;

            return (
              <SidebarMenuItem
                key={item.title}
                className={cn(
                  "nav-button rounded-l-full h-12",
                  isActive && "active-nav",
                )}
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={cn(" rounded-l-full ")}
                >
                  <NavLink
                    to={item.url}
                    className="flex items-center gap-3 w-full h-full pl-4 transition-all duration-300 group/nav"
                  >
                    <Icon
                      size="24"
                      variant={isActive ? "Bulk" : "Linear"}
                      className={cn(
                        "shrink-0 transition-all duration-300 group-hover/nav:text-primary group-hover/nav:translate-x-2",
                        isActive
                          ? "text-primary scale-110"
                          : "text-zinc-100/70 group-hover/nav:scale-110",
                      )}
                    />

                    <span
                      className={cn(
                        "text-sm tracking-tight transition-all duration-300 group-hover/nav:text-primary ml-3",
                        isActive
                          ? "font-bold text-primary"
                          : "font-medium text-zinc-100/80",
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

      <SidebarFooter className="pb-10 px-6 pr-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="logout-button nav-button rounded-xl text-zinc-100/70 hover:text-red-500 hover:bg-zinc-100/70 group h-12 rounded-l-full"
            >
              <button className="flex" onClick={() => logout()}>
                <Logout
                  size="20"
                  variant="Linear"
                  className="shrink-0 transition-transform group-hover:translate-x-2"
                />
                <span className="font-bold ml-3 text-sm">
                  {isPending ? "Logging Out..." : "Log Out"}
                </span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
