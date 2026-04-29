import { makeRequest } from "../api";
import type { PersonnelInfo } from "../personnels/types";
import type { DashBoardData } from "./types";

export const getUserDataRequest = () =>
  makeRequest<PersonnelInfo>("/user", "GET");

export const getDashboardDataRequest = () =>
  makeRequest<DashBoardData>("/dashboard", "GET");
