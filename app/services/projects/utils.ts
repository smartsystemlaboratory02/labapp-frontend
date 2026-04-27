export const PROJECT_STATUS_MAP = {
  completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-600",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-amber-50 text-amber-600",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600",
  },
} as const;
