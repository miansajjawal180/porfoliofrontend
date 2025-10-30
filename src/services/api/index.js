import axios from "axios";
import { getToken } from "../../utils/auth";

// ✅ Updated deployed backend URL
const API_BASE_URL = "https://portfoliobackend-v1nw.vercel.app/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  // If you only use JWT header, withCredentials is not needed
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper to manually set token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;

// Auth API
export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

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
