import axios from "axios";
import { getSessionStorage, setSessionStorage } from "../utils/getSession";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const token = getSessionStorage("accessToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 👇 check for 427
    if (error.response?.status === 427 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-session`,
        );

        console.log("Retrying requests with new access token");
        return api(originalRequest); // retry original request
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      error?.response?.data?.detail[0]?.msg ||
      error?.response?.data?.detail ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  },
);

export const makeRequest = async <TResponse = unknown>(
  path: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  data?: any,
) => {
  const res = await api.request<TResponse>({
    url: path,
    method,
    data,
  });

  const response = res.data;
  console.log(response);

  return response;
};
