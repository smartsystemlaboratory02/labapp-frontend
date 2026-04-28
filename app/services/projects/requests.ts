import { makeRequest } from "../api";
import type { Project, ProjectInfo } from "./types";

export const createProjectRequest = (data: Project) =>
  makeRequest("/projects/", "POST", data);

export const getProjectsRequest = () =>
  makeRequest<ProjectInfo[]>(`/projects/`, "GET");

export const editProjectRequest = (
  projectId: string,
  data: Partial<ProjectInfo>,
) => {
  return makeRequest(`/projects/${projectId}`, "PUT", data);
};

export const deleteProjectRequest = (projectId: string) =>
  makeRequest(`/projects/${projectId}`, "DELETE");

export const addProjectObjectiveRequest = (
  projectId: string,
  objective: string,
) =>
  makeRequest(`/projects/objectives`, "POST", {
    project_id: projectId,
    objective,
  });

export const getProjectObjectivesRequest = (projectId: string) =>
  makeRequest(`/projects/${projectId}/objectives`, "GET");

export const addProjectMemberRequest = (
  projectId: string,
  member: string,
  role: string,
) =>
  makeRequest(`/projects/members`, "POST", {
    project_id: projectId,
    user_id: member,
    role,
  });
