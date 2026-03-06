export const DEMO_DATA = {
  name: "John",
  projects: [
    {
      _id: "1",
      name: "SSRL Solar Grid",
      description: "Optimization of power distribution in Sector 7.",
      status: "In Progress",
    },
    {
      _id: "2",
      name: "Lab Inventory System",
      description: "Automated tracking for chemical reagents.",
      status: "Completed",
    },
    {
      _id: "3",
      name: "Personnel Portal",
      description: "Upgrading the onboarding workflow for new interns.",
      status: "In Progress",
    },
    {
      _id: "4",
      name: "Security Audit",
      description: "Quarterly review of lab access protocols.",
      status: "Completed",
    },
    {
      _id: "5",
      name: "Mobile Diagnostics",
      description: "Flutter app for field equipment reporting.",
      status: "In Progress",
    },
  ],
  reports: [
    {
      _id: "r1",
      title: "Weekly Safety Summary",
      report_type: "Safety",
      direction: "outgoing",
    },
    {
      _id: "r2",
      title: "Q1 Resource Utilization",
      report_type: "Finance",
      direction: "incoming",
    },
    {
      _id: "r3",
      title: "Incident Report - Lab B",
      report_type: "Emergency",
      direction: "outgoing",
    },
    {
      _id: "r4",
      title: "Equipment Calibration Logs",
      report_type: "Technical",
      direction: "incoming",
    },
    {
      _id: "r5",
      title: "Intern Progress Evaluation",
      report_type: "Admin",
      direction: "outgoing",
    },
  ],
  requests: [
    {
      _id: "req1",
      title: "New Oscilloscope",
      type: "Equipment",
      status: "Pending",
    },
    {
      _id: "req2",
      title: "Annual Leave Request",
      type: "Admin",
      status: "Approved",
    },
    {
      _id: "req3",
      title: "Server Maintenance Slot",
      type: "IT",
      status: "Pending",
    },
    {
      _id: "req4",
      title: "Procurement: Lead Solder",
      type: "Supplies",
      status: "Pending",
    },
    {
      _id: "req5",
      title: "Access Key Re-issue",
      type: "Security",
      status: "Approved",
    },
  ],
  notifications: [
    { message: "New comment on SSRL Solar Grid project.", time: "2 mins ago" },
    {
      message: "Your report 'Weekly Safety Summary' was approved.",
      time: "1 hour ago",
    },
    {
      message: "Team meeting scheduled for tomorrow at 10 AM.",
      time: "4 hours ago",
    },
    {
      message: "Security update required for your laboratory workstation.",
      time: "1 day ago",
    },
    {
      message: "New intern assigned to your project group.",
      time: "2 days ago",
    },
  ],
  todos: [
    { _id: "t1", task: "Submit monthly lab logs", completed: true },
    { _id: "t2", task: "Calibrate sensor array A", completed: false },
    { _id: "t3", task: "Review technical documentation", completed: false },
    { _id: "t4", task: "Order new soldering tips", completed: true },
    { _id: "t5", task: "Update personnel directory", completed: false },
    { _id: "t6", task: "Backup project repository", completed: false },
  ],
};
