import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import { clearUserAuth, getUserAuth } from "./auth-storage";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor to inject token
apiClient.interceptors.request.use(
  config => {
    const userAuth = getUserAuth();
    if (userAuth?.token) {
      config.headers.Authorization = `Bearer ${userAuth?.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// response interceptor to handle token errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      clearUserAuth();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
