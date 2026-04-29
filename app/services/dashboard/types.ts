export interface ActiveProject {
  id: string;
  name: string;
  description: string;
  status: "in_progress" | "completed" | "cancelled";
  deadline: string;
}

export interface DashboardNotification {
  id: string;
  title: string;
  time: string;
}

export interface DashBoardData {
  name: string;
  profile_img: string;
  active_projects: ActiveProject[];
  quick_reports: [];
  my_tasks: [];
  notifications: DashboardNotification[];
}
