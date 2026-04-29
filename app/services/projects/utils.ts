import type { EditProjectFormValues } from "./types";

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

export const normalizeProject = (data: EditProjectFormValues) => ({
  name: data.name?.trim(),
  description: data.description?.trim(),
  status: data.status,
  deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined,
});

export const getChangedFields = (
  current: Record<string, any>,
  initial: Record<string, any>,
) => {
  const payload: Record<string, any> = {};

  Object.keys(current).forEach((key) => {
    if (current[key] !== initial[key]) {
      payload[key] = current[key];
    }
  });

  return payload;
};