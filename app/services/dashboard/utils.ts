export const DASHBOARD_PROJECT_STATUS_MAP = {
  completed: {
    label: "Completed",
    className: "bg-emerald-500",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-amber-400",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-500",
  },
} as const;
