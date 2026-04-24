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
