import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllPersonnelRequest } from "./requests";

export const useGetAllPersonnelQuery = () =>
  useQuery({
    queryKey: ["personnels"],
    queryFn: getAllPersonnelRequest,
    placeholderData: keepPreviousData,
    staleTime: 600000,
  });
