import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDashboardDataRequest } from "./requests";

export const useGetDashboardDataQuery = () => {
  return useQuery({
    queryKey: ["getDashboardData"],
    queryFn: getDashboardDataRequest,
    staleTime: 150000,
    placeholderData: keepPreviousData,
  });
};


