import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  addProjectMemberRequest,
  addProjectObjectiveRequest,
  createProjectRequest,
  deleteProjectRequest,
  editProjectRequest,
  getProjectsRequest,
} from "./requests";
import type { ProjectInfo } from "./types";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["getProjects"],
    queryFn: getProjectsRequest,
    placeholderData: keepPreviousData,
    staleTime: 600000,
  });
};

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProjectRequest,
    mutationKey: ["createProjectRequest"],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
  });
};

export const useEditProjectMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ProjectInfo>) =>
      editProjectRequest(projectId, data),
    mutationKey: ["editProjectRequest", projectId],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
  });
};

export const useDeleteProjectMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProjectRequest(projectId),
    mutationKey: ["deleteProjectRequest", projectId],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
  });
};

export const useAddProjectObjectiveMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (objective: string) =>
      addProjectObjectiveRequest(projectId, objective),
    mutationKey: ["addProjectObjectiveRequest", projectId],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
    // TODO: Invalidate specific project query instead of all projects
  });
};

export const useAddProjectMemberMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ member, role }: { member: string; role: string }) =>
      addProjectMemberRequest(projectId, member, role),
    mutationKey: ["addProjectMemberRequest", projectId],
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
    // TODO: Invalidate specific project query instead of all projects
  });
};
