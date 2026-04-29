import { makeRequest } from "../api";
import type { Project, ProjectAnnouncement, ProjectInfo } from "./types";

export const createProjectRequest = (data: Project) =>
  makeRequest("/projects/", "POST", data);

export const getProjectsRequest = () =>
  makeRequest<ProjectInfo[]>(`/projects/`, "GET");

export const getProjectRequest = (projectId: string) =>
  makeRequest<ProjectInfo>(`/projects/${projectId}`, "GET");

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

export const editProjectObjectiveRequest = (
  objectiveId: string,
  objective: string,
) => makeRequest(`/projects/objectives/${objectiveId}`, "PUT", { objective });

export const deleteProjectObjectiveRequest = (objectiveId: string) =>
  makeRequest(`/projects/objectives/${objectiveId}`, "DELETE");

export const updateProjectMemberRoleRequest = (
  memberId: string,
  role: "lead" | "intern",
) => makeRequest(`/projects/members/${memberId}`, "PUT", { role });

export const deleteProjectMemberRequest = (memberId: string) =>
  makeRequest(`/projects/members/${memberId}`, "DELETE");

export const getProjectAnnouncementsRequest = (projectId: string) =>
  makeRequest<{ announcements: ProjectAnnouncement[] }>(
    `/projects/announcements?project_id=${projectId}`,
    "GET",
  );

export const createProjectAnnouncementRequest = (
  projectId: string,
  title: string,
  content: string,
) =>
  makeRequest(`/projects/announcements`, "POST", {
    project_id: projectId,
    title,
    content,
  });
