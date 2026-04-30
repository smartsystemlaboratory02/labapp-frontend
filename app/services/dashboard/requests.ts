import { makeRequest } from "../api";
import type { PersonnelInfo } from "../personnels/types";
import type { DashBoardData } from "./types";

export const getDashboardDataRequest = () =>
  makeRequest<DashBoardData>("/dashboard", "GET");
