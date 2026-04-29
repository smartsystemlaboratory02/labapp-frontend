import React from "react";
import DashboardCard from "../DashboardCard";
import { NotificationBing } from "iconsax-reactjs";
import { DEMO_DATA } from "~/dashboardDemo";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
  return (
    <DashboardCard title="Notifications" icon={NotificationBing}>
      <div className="space-y-5">
        {DEMO_DATA.notifications.map((n, idx) => (
          <NotificationItem key={idx} notification={n} />
        ))}
      </div>
    </DashboardCard>
  );
};

export default Notifications;
