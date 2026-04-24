import { makeRequest } from "../api";
import type { Project } from "./types";

export const createProjectRequest = (data: Project) =>
  makeRequest("/personnels", "POST", data);
