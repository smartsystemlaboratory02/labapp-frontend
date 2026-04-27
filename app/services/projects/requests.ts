import { makeRequest } from "../api";
import type { Project, ProjectInfo } from "./types";

export const createProjectRequest = (data: Project) =>
  makeRequest("/projects/", "POST", data);

export const getProjectsRequest = () =>
  makeRequest<ProjectInfo[]>(`/projects/`, "GET");

export const editProjectRequest = (projectId: string, data: Partial<ProjectInfo>) => {
  return makeRequest(`/projects/${projectId}`, "PUT", data);
};

export const deleteProjectRequest = (projectId: string) =>
  makeRequest(`/projects/${projectId}`, "DELETE");