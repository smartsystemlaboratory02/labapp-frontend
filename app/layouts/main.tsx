import { useState } from "react";
import SideNav from "~/components/layout/sidebar";
// import Headerbar from "../components/layout/Headerbar.jsx";
import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import AppSidebar from "~/components/layout/sidebar";

const MainLayout = () => {
  const [isSideNavOpen, setisSideNavOpen] = useState(false);
  const toggleSideNav = () => setisSideNavOpen(!isSideNavOpen);

  return (
    <div className="[--header-height:calc(--spacing(14))] max-h-screen relative">
      {/* <Headerbar toggleSideNav={toggleSideNav} isSideNavOpen={isSideNavOpen} /> */}
      <SidebarProvider className="flex flex-col">
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="h-full flex-1 bg-[#fafafa] dark:bg-[#050505]">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
export default MainLayout;
