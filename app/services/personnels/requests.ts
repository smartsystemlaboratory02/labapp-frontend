import { makeRequest } from "../api";
import type { Personnel, PersonnelInfo } from "./types";

export const getAllPersonnelRequest = () =>
  makeRequest<Personnel[]>("/personnels", "GET");

export const getAllPersonnelInfoRequest = () =>
  makeRequest<PersonnelInfo[]>("/personnels/info", "GET");

export const getPersonnelInfoByIdRequest = (id: string) =>
  makeRequest<PersonnelInfo>(`/personnels/${id}`, "GET");

export const changePersonnelRoleRequest = (
  userId: string,
  role: "intern" | "admin" | "lead",
) => makeRequest(`admin/user/update-role`, "PATCH", { user_id: userId, role });

export const activatePersonnelRequest = (userId: string) =>
  makeRequest(`admin/user/activate/${userId}`, "PUT");

export const deactivatePersonnelRequest = (userId: string) =>
  makeRequest(`admin/user/deactivate/${userId}`, "PUT");
