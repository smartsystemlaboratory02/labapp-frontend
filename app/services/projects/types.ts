export interface EditProjectFormValues {
  name?: string;
  description?: string;
  status?: "completed" | "in_progress" | "cancelled";
  deadline?: string | Date;
}

export interface ProjectMember {
  user_id: string;
  role: "intern" | "lead";
}

export interface ProjectObjective {
  objective: string;
  status: string;
}

export interface Project {
  name: string;
  description: string;
  target_deadline: string;
  project_members: ProjectMember[];
  project_objectives: ProjectObjective[];
}

export interface ProjectInfoObjective {
  id: string;
  project_id: string;
  objective: string;
  status: string;
}

export interface ProjectInfoMember {
  id: string;
  first_name: string;
  last_name: string;
  role: "intern" | "lead";
  profile_img: string | null;
}

export interface ProjectInfo {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "cancelled";
  deadline: string;
  objectives: ProjectInfoObjective[];
  members: ProjectInfoMember[];
  created_by: {
    first_name: string;
    last_name: string;
  };
  created_at: string;
  resources: ProjectResourceLink[];
}

export interface ProjectAnnouncement {
  project_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  id: string;
  content: string;
  created_by: {
    first_name: string;
    last_name: string;
  };
}

export interface ProjectResourceLink {
  id: string;
  title: string;
  resource_link: string;
  created_at: string;
  updated_at: string;
  type: "link" | "doc";
}
