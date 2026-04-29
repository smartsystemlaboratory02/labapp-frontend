import React from "react";
import DashboardCard from "../DashboardCard";
import ComingSoonMask from "~/components/ui/ComingSoonMask";
import { Note } from "iconsax-reactjs";
import ReportItem from "./ReportItem";
import { DEMO_DATA } from "~/dashboardDemo";

const Reports = () => {
  return (
    <DashboardCard title="Quick Reports" icon={Note} href="#">
      <div className="relative overflow-hidden">
        <ComingSoonMask />
        <div className="grid grid-cols-1 gap-3">
          {DEMO_DATA.reports.map((report) => (
            <ReportItem key={report._id} report={report} />
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export default Reports;
