import api from "./index";

// ✅ Get all public social links
export const getPublicSocialLinks = async () =>
  (await api.get("/socials/public")).data;

// ✅ Create a new social link
export const createSocialLink = async (data) =>
  (await api.post("/socials/create", data)).data;

// ✅ Get all social links (admin use)
export const getAllSocialLinks = async () =>
  (await api.get("/socials/all")).data;

// ✅ Update a social link
export const updateSocialLink = async (id, data) =>
  (await api.put(`/socials/update/${id}`, data)).data;

// ✅ Delete a social link
export const deleteSocialLink = async (id) =>
  (await api.delete(`/socials/delete/${id}`)).data;
