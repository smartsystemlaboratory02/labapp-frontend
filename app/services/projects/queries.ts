import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  addProjectMemberRequest,
  addProjectObjectiveRequest,
  createProjectAnnouncementRequest,
  createProjectRequest,
  deleteProjectMemberRequest,
  deleteProjectObjectiveRequest,
  deleteProjectRequest,
  editProjectObjectiveRequest,
  editProjectRequest,
  getProjectAnnouncementsRequest,
  getProjectRequest,
  getProjectsRequest,
  updateProjectMemberRoleRequest,
} from "./requests";
import type { ProjectInfo } from "./types";

export const useGetProjectsQuery = () => {
  return useQuery({
    queryKey: ["getProjects"],
    queryFn: getProjectsRequest,
    placeholderData: keepPreviousData,
    staleTime: 600000,
  });
};

export const useGetProjectQuery = (
  projectId: string,
  initialData?: ProjectInfo,
) => {
  return useQuery({
    queryKey: ["getProject", projectId],
    queryFn: () => getProjectRequest(projectId),
    placeholderData: keepPreviousData,
    initialData: initialData,
    staleTime: 300000,
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
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
        queryClient.invalidateQueries({ queryKey: ["getProject", projectId] }));
    },
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
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
        queryClient.invalidateQueries({ queryKey: ["getProject", projectId] }));
    },
  });
};

export const useAddProjectMemberMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ member, role }: { member: string; role: string }) =>
      addProjectMemberRequest(projectId, member, role),
    mutationKey: ["addProjectMemberRequest", projectId],
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
        queryClient.invalidateQueries({ queryKey: ["getProject", projectId] }));
    },
  });
};

export const useEditProjectObjectiveMutation = (
  projectId: string,
  objectiveId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ objective }: { objective: string }) =>
      editProjectObjectiveRequest(objectiveId, objective),
    mutationKey: ["editProjectObjectiveRequest", objectiveId],
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
        queryClient.invalidateQueries({ queryKey: ["getProject", projectId] }));
    },
  });
};

export const useDeleteProjectObjectiveMutation = (
  projectId: string,
  objectiveId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProjectObjectiveRequest(objectiveId),
    mutationKey: ["deleteProjectObjectiveRequest", objectiveId],
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
        queryClient.invalidateQueries({ queryKey: ["getProject", projectId] }));
    },
  });
};

export const useUpdateProjectMemberRoleMutation = (
  projectId: string,
  memberId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ role }: { role: "lead" | "intern" }) =>
      updateProjectMemberRoleRequest(memberId, role),

    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
        queryClient.invalidateQueries({ queryKey: ["getProject", projectId] }));
    },
  });
};

export const useDeleteProjectMemberMutation = (
  projectId: string,
  memberId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProjectMemberRequest(memberId),
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["getProjects"] }),
        queryClient.invalidateQueries({ queryKey: ["getProject", projectId] }));
    },
  });
};

export const useGetProjectAnnouncementsQuery = (projectId: string) => {
  return useQuery({
    queryKey: ["getProjectAnnouncements", projectId],
    queryFn: () => getProjectAnnouncementsRequest(projectId),
  });
};

export const useCreateProjectAnnouncementMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      createProjectAnnouncementRequest(projectId, title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProjectAnnouncements", projectId],
      });
    },
  });
};
