import React from "react";
import DashboardCard from "../DashboardCard";
import { NotificationBing } from "iconsax-reactjs";
import { DEMO_DATA } from "~/dashboardDemo";
import NotificationItem from "./NotificationItem";
import type { DashboardNotification } from "~/services/dashboard/types";

const Notifications = ({
  notifications,
}: {
  notifications: DashboardNotification[];
}) => {
  return (
    <DashboardCard title="Notifications" icon={NotificationBing}>
      <div className="space-y-5">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </DashboardCard>
  );
};

export default Notifications;
