import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Note,
  MessageNotif,
  NotificationBing,
  TaskSquare,
} from "iconsax-reactjs";
import { containerVariants } from "~/motionVariants";
import { DEMO_DATA } from "~/dashboardDemo";

import WelcomeHero from "./components/WelcomeHero";
import DashboardCard from "./components/DashboardCard";
import ProjectItem from "./components/ProjectItem";
import ReportItem from "./components/ReportItem";
import RequestItem from "./components/RequestItem";
import NotificationItem from "./components/NotificationItem";
import TodoItem from "./components/TodoItem";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-400 mx-auto grid grid-cols-1 dt:grid-cols-3 gap-6 lg:gap-8"
      >
        <div className="space-y-6 lg:space-y-8 dt:col-span-2">
          <WelcomeHero name={DEMO_DATA.name} />

          <div className="md:grid md:grid-cols-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8 dt:space-y-0">
            <DashboardCard
              title="Active Projects"
              icon={Briefcase}
              href="/home/projects"
            >
              <div className="space-y-1">
                {DEMO_DATA.projects.map((project) => (
                  <ProjectItem key={project._id} project={project} />
                ))}
              </div>
            </DashboardCard>

            <DashboardCard
              title="Quick Reports"
              icon={Note}
              href="/home/reports"
            >
              <div className="grid grid-cols-1 gap-3">
                {DEMO_DATA.reports.map((report) => (
                  <ReportItem key={report._id} report={report} />
                ))}
              </div>
            </DashboardCard>
          </div>

          <DashboardCard
            title="Pending Requests"
            icon={MessageNotif}
            href="/home/requests"
          >
            <div className="grid grid-cols-1 gap-4 mlg:grid-cols-2">
              {DEMO_DATA.requests.map((req) => (
                <RequestItem key={req._id} req={req} />
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="md:grid md:grid-cols-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8 dt:grid-cols-1 dt:flex dt:flex-col dt:space-y-0">
          <DashboardCard title="Notifications" icon={NotificationBing}>
            <div className="space-y-5">
              {DEMO_DATA.notifications.map((n, idx) => (
                <NotificationItem key={idx} notification={n} />
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="My Tasks" icon={TaskSquare} href="/home/to-do">
            <div className="space-y-2">
              {DEMO_DATA.todos.map((t) => (
                <TodoItem key={t._id} todo={t} />
              ))}
            </div>
          </DashboardCard>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
