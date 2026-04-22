import { makeRequest } from "../api";

export const signupRequest = (data: FormData) =>
  makeRequest<unknown, unknown>("/auth/register", "POST", data);
