import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  activatePersonnelRequest,
  changePersonnelRoleRequest,
  deactivatePersonnelRequest,
  getAllPersonnelInfoRequest,
  getAllPersonnelRequest,
  getPersonnelInfoByIdRequest,
} from "./requests";
import type { PersonnelInfo } from "./types";

export const useGetAllPersonnelQuery = () =>
  useQuery({
    queryKey: ["personnels"],
    queryFn: getAllPersonnelRequest,
    placeholderData: keepPreviousData,
    staleTime: 600000,
  });

export const useGetAllPersonnelInfoQuery = () =>
  useQuery({
    queryKey: ["personnelsInfo"],
    queryFn: getAllPersonnelInfoRequest,
    placeholderData: keepPreviousData,
    staleTime: 600000,
  });

export const useGetPersonnelInfoByIdQuery = (
  userId: string,
  initialData?: PersonnelInfo,
) =>
  useQuery({
    queryKey: ["personnelInfoById", userId],
    queryFn: () => getPersonnelInfoByIdRequest(userId),
    placeholderData: keepPreviousData,
    initialData: initialData,
    staleTime: 600000,
  });

export const useChangePersonnelRoleMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (role: "intern" | "admin" | "lead") =>
      changePersonnelRoleRequest(userId, role),
    mutationKey: ["changePersonnelRoleRequest"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personnelsInfo"] });
      queryClient.invalidateQueries({
        queryKey: ["personnelInfoById", userId],
      });
    },
  });
};

export const useDeactivatePersonnelMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deactivatePersonnelRequest(userId),
    mutationKey: ["deactivatePersonnelRequest"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["personnelInfoById", userId],
      });
    },
  });
};

export const useActivatePersonnelMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => activatePersonnelRequest(userId),
    mutationKey: ["activatePersonnelRequest"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["personnelInfoById", userId],
      });
    },
  });
};
