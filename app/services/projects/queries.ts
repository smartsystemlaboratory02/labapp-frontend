import { useMutation } from "@tanstack/react-query";
import { createProjectRequest } from "./requests";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: createProjectRequest,
    mutationKey: ["createProjectRequest"],
  });
};
