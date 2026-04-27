import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
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
