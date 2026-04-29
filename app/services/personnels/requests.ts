import { makeRequest } from "../api";
import type { Personnel } from "./types";

export const getAllPersonnelRequest = () => makeRequest<Personnel[]>("/personnels", "GET");

