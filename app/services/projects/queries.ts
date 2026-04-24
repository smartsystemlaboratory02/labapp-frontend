import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { createProjectRequest, getProjectsRequest } from "./requests";

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
