// src/services/api/projectApi.js
import api from "./index";

// 🟢 Get all public projects
export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

// 🟢 Get single project by ID
export const getProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

// 🔒 Admin: Create new project (with image upload)
export const createProject = async (formData) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await api.post("/projects", formData, config);
  return res.data;
};

// 🔒 Admin: Update existing project
export const updateProject = async (id, formData) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await api.put(`/projects/${id}`, formData, config);
  return res.data;
};

// 🔒 Admin: Delete project
export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};
