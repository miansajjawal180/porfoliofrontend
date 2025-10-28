// services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // change if deployed

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Helper to set Authorization header
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

/* -------------------- AUTH -------------------- */
export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

/* -------------------- ADMIN -------------------- */
export const createAdmin = async (data) => {
  const res = await api.post("/admin/create", data);
  return res.data;
};

export const getAllAdmins = async () => {
  const res = await api.get("/admin/all");
  return res.data;
};

export const updateAdmin = async (id, data) => {
  const res = await api.put(`/admin/update/${id}`, data);
  return res.data;
};

export const deleteAdmin = async (id) => {
  const res = await api.delete(`/admin/delete/${id}`);
  return res.data;
};

/* -------------------- PROJECTS -------------------- */
export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

export const getProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const createProject = async (data) => {
  const res = await api.post("/projects", data);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

/* -------------------- UPDATES -------------------- */
export const getUpdates = async () => {
  const res = await api.get("/updates");
  return res.data;
};

export const createUpdate = async (data) => {
  const res = await api.post("/updates", data);
  return res.data;
};

export const updateUpdate = async (id, data) => {
  const res = await api.put(`/updates/${id}`, data);
  return res.data;
};

export const deleteUpdate = async (id) => {
  const res = await api.delete(`/updates/${id}`);
  return res.data;
};

/* -------------------- MESSAGES -------------------- */
export const createMessage = async (data) => {
  const res = await api.post("/messages", data);
  return res.data;
};

export const getMessages = async () => {
  const res = await api.get("/messages");
  return res.data;
};

export const deleteMessage = async (id) => {
  const res = await api.delete(`/messages/${id}`);
  return res.data;
};

/* -------------------- FILES -------------------- */
export const getFiles = async () => {
  const res = await api.get("/files");
  return res.data;
};

export const uploadFile = async (formData) => {
  const res = await api.post("/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteFile = async (id) => {
  const res = await api.delete(`/files/${id}`);
  return res.data;
};

/* -------------------- SOCIALS -------------------- */
export const getSocials = async () => {
  const res = await api.get("/socials");
  return res.data;
};

export const createSocial = async (data) => {
  const res = await api.post("/socials", data);
  return res.data;
};

export const updateSocial = async (id, data) => {
  const res = await api.put(`/socials/${id}`, data);
  return res.data;
};

export const deleteSocial = async (id) => {
  const res = await api.delete(`/socials/${id}`);
  return res.data;
};

/* -------------------- PROFILE -------------------- */
export const getProfile = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/profile", data);
  return res.data;
};

export default api;
