import React from "react";
import DashboardCard from "../DashboardCard";
import { MessageNotif } from "iconsax-reactjs";
import ComingSoonMask from "~/components/ui/ComingSoonMask";
import { DEMO_DATA } from "~/dashboardDemo";
import RequestItem from "./RequestItem";

const Requests = () => {
  return (
    <DashboardCard title="Pending Requests" icon={MessageNotif} href="#">
      <div className="relative overflow-hidden">
        <ComingSoonMask />
        <div className="grid grid-cols-1 gap-4 mlg:grid-cols-2">
          {DEMO_DATA.requests.map((req) => (
            <RequestItem key={req._id} req={req} />
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export default Requests;
