import { makeRequest } from "../api";
import type { Personnel, PersonnelInfo } from "./types";

export const getAllPersonnelRequest = () => makeRequest<Personnel[]>("/personnels", "GET");

export const getAllPersonnelInfoRequest = () => makeRequest<PersonnelInfo[]>("/personnels/info", "GET");