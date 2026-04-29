import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllPersonnelInfoRequest, getAllPersonnelRequest } from "./requests";

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
