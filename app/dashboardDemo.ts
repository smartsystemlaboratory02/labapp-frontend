import {
  Add,
  FolderCloud,
  TickCircle,
  Timer1,
  ArrowRight,
  More,
} from "iconsax-reactjs";

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

export const MOCK_STATS = [
  {
    label: "Total Projects",
    count: 12,
    icon: FolderCloud,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    label: "In Progress",
    count: 8,
    icon: Timer1,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    label: "Completed",
    count: 4,
    icon: TickCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

export const MOCK_PROJECTS = [
  {
    _id: "p1",
    name: "SSRL Solar Grid",
    deadline: "2024-12-20",
    status: "In Progress",
    description:
      "Optimization of power distribution in Sector 7 using neural modeling.",
    team: [
      { id: "JD", color: "#FFDEDE" },
      { id: "AS", color: "#DEFFDF" },
      { id: "MK", color: "#DEEFFF" },
      { id: "+4", color: "#F3F4F6" },
    ],
  },
  {
    _id: "p2",
    name: "Lab Inventory System",
    deadline: "2024-11-15",
    status: "Completed",
    description: "Automated tracking for chemical reagents and equipment logs.",
    team: [
      { id: "BT", color: "#F0DEFF" },
      { id: "KL", color: "#FFFEDE" },
    ],
  },
  {
    _id: "p3",
    name: "Mobile Diagnostics",
    deadline: "2025-01-05",
    status: "In Progress",
    description: "React Native field app for remote equipment telemetry.",
    team: [
      { id: "OP", color: "#E0F2FE" },
      { id: "WE", color: "#FEE2E2" },
      { id: "YU", color: "#F0FDF4" },
    ],
  },
  {
    _id: "p4",
    name: "Security Audit 2.0",
    deadline: "2024-10-30",
    status: "Completed",
    description:
      "Full security overhaul of the laboratory biometric access points.",
    team: [
      { id: "RS", color: "#FEF3C7" },
      { id: "TY", color: "#E0E7FF" },
    ],
  },
];

export const MOCK_MEMBERS = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Frontend Developer",
    initial: "AR",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "UI Designer",
    initial: "SC",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    role: "Backend Lead",
    initial: "MJ",
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: "4",
    name: "Lena Volkov",
    role: "DevOps Engineer",
    initial: "LV",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "1",
    name: "Alex Rivera",
    role: "Frontend Developer",
    initial: "AR",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "UI Designer",
    initial: "SC",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    role: "Backend Lead",
    initial: "MJ",
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: "4",
    name: "Lena Volkov",
    role: "DevOps Engineer",
    initial: "LV",
    color: "bg-purple-100 text-purple-600",
  },
];
