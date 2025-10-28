// src/services/adminApi.js
import api from "./api"; // axios instance with token

// ✅ Create a new admin
export const createAdmin = async (data) => {
  const res = await api.post("/admin/create", data);
  return res.data;
};

// ✅ Get all admins
export const getAllAdmins = async () => {
  const res = await api.get("/admin/all");
  return res.data;
};

// ✅ Update an admin
export const updateAdmin = async (id, data) => {
  const res = await api.put(`/admin/update/${id}`, data);
  return res.data;
};

// ✅ Delete an admin
export const deleteAdmin = async (id) => {
  const res = await api.delete(`/admin/delete/${id}`);
  return res.data;
};
