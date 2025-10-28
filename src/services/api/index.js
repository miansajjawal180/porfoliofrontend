// src/services/api/index.js
import axios from "axios";
import { getToken } from "../../utils/auth";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Export helper to manually set token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;

// Re-export all other APIs
export * from "./authApi";
export * from "./adminApi";
export * from "./projectApi";
export * from "./updateApi";
export * from "./messageApi";
export * from "./fileApi";
export * from "./socialApi";
export * from "./profileApi";
export * from "./showcaseApi";
export * from "./servicesApi";
export * from "./openaiApi";
export * from "./blogApi";
export * from "./skillsApi";