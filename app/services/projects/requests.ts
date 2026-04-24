import { makeRequest } from "../api";
import type { Project, ProjectInfo } from "./types";

export const createProjectRequest = (data: Project) =>
  makeRequest("/projects/", "POST", data);

export const getProjectsRequest = () => makeRequest<ProjectInfo[]>(`/projects/`, "GET");