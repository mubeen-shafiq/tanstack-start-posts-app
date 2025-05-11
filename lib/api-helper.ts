import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface ExtendedAxiosConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
}

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use(
  (config: ExtendedAxiosConfig) => {
    if (config.skipAuth) return config;

    const token = localStorage.getItem("token");

    if (!token) throw new AxiosError("Token not found!");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError && error?.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

export const GET_API = api.get;
export const POST_API = api.post;
export const PUT_API = api.put;
export const PATCH_API = api.patch;
export const DELETE_API = api.delete;

export default api;
