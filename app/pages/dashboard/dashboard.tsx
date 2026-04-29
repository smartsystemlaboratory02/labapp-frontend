import { motion } from "framer-motion";
import { containerVariants } from "~/motionVariants";
import { DEMO_DATA } from "~/dashboardDemo";

import WelcomeHero from "./components/WelcomeHero";
import Reports from "./components/reports/Reports";
import Requests from "./components/requests/Requests";
import Notifications from "./components/notifications/Notifications";
import Projects from "./components/projects/Projects";
import Todos from "./components/todos/Todos";
import { useGetDashboardDataQuery } from "~/services/dashboard/queries";
import DashboardSkeleton from "./components/DashboardSkeleton";
import DashboardError from "./components/DashboardError";
import type { DashBoardData } from "~/services/dashboard/types";

const Dashboard = () => {
  const {
    data: dashboardData,
    isLoading: isDashboardDataLoading,
    refetch: retry,
    isError: isDashboardDataError,
  } = useGetDashboardDataQuery();

  if (isDashboardDataLoading) return <DashboardSkeleton />;
  if (isDashboardDataError || !dashboardData)
    return <DashboardError onRetry={retry} />;

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-400 mx-auto grid grid-cols-1 dt:grid-cols-3 gap-6 lg:gap-8"
      >
        <div className="space-y-6 lg:space-y-8 dt:col-span-2">
          <WelcomeHero name={dashboardData.name} />

          <div className="md:grid md:grid-cols-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8 dt:space-y-0">
            <Projects projects={dashboardData.active_projects} />
            <Reports />
          </div>
          <Requests />
        </div>

        <div className="md:grid md:grid-cols-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8 dt:grid-cols-1 dt:flex dt:flex-col dt:space-y-0">
          <Notifications notifications={dashboardData.notifications} />
          <Todos />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
