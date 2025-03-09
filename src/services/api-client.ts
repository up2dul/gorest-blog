import axios from "axios";
import { clearUserAuth, getUserAuth } from "./auth-storage";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
      console.log("token expired", error);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
