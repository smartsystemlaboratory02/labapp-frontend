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
  status: string;
  deadline: string;

  objectives: ProjectInfoObjective[];

  created_by: string | null;

  members: ProjectInfoMember[];
}