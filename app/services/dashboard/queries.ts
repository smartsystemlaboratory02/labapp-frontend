import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDashboardDataRequest, getUserDataRequest } from "./requests";

export const useGetDashboardDataQuery = () => {
  return useQuery({
    queryKey: ["getDashboardData"],
    queryFn: getDashboardDataRequest,
    staleTime: 150000,
    placeholderData: keepPreviousData,
  });
};

export const useGetUserDataQuery = () => {
  return useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserDataRequest,
    staleTime: 600000,
    placeholderData: keepPreviousData,
  });
};
