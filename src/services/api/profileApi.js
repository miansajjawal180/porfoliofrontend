import api from "./index";

// 👤 Get Logged-in User Profile
export const getProfile = async () => {
  const res = await api.get("/profile/me");
  return res.data;
};

// ✏️ Update Logged-in User Profile
export const updateProfile = async (formData) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await api.put("/profile/me", formData, config);
  return res.data;
};

// 🌍 Get All Public Profiles (non-admins)
export const getPublicProfiles = async () => {
  const res = await api.get("/profile/public");
  return res.data;
};

// 👑 ADMIN — Get All Users
export const adminGetAllUsers = async () => {
  const res = await api.get("/profile/admin/all");
  return res.data;
};

// 🗑️ ADMIN — Delete User by ID
export const adminDeleteUser = async (userId) => {
  const res = await api.delete(`/profile/admin/${userId}`);
  return res.data;
};
