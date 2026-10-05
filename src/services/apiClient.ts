import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import * as axios from "axios";
import { ToastService } from "../providers/ToastProvider";
import { TokenManager } from "../utils/tokenManager";

export const ApiClient: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:1200/api/",
  timeout: 3000,
  headers: {
    Accept: "application/json",
    "X-User-Role": "owner",
  },
});

ApiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = await TokenManager.getAccessToken();

  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  console.log("🚀 API REQUEST");
  console.log("URL:", `${config.baseURL ?? ""}${config.url ?? ""}`);
  console.log("METHOD:", config.method?.toUpperCase());
  console.log("PARAMS:", config.params);
  console.log("BODY:", config.data);

  return config;
});

ApiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API RESPONSE");
    console.log("URL:", `${response.config.baseURL ?? ""}${response.config.url ?? ""}`);
    console.log("STATUS:", response.status);
    console.log("DATA:", response.data);

    return response;
  },
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = data?.message ?? data?.error ?? "Something went wrong.";

    console.log("❌ API RESPONSE ERROR");
    console.log("URL:", `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`);
    console.log("STATUS:", status);
    console.log("DATA:", data);

    ToastService.show(message, "error");

    if (data) {
      return Promise.resolve({ data });
    }

    return Promise.reject(error);
  },
);
