import axios from "axios";
import { getSessionStorage } from "../utils/getSession";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getSessionStorage("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.detail || error.message || "Something went wrong";

    return Promise.reject(new Error(message));
  },
);

export const makeRequest = async <TResponse = unknown, TData = unknown>(
  path: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  data?: TData,
) => {
  const res = await api.request<TResponse>({
    url: path,
    method,
    data,
  });

  return res.data;
};
