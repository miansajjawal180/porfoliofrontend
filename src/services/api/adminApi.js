import api from "./index";

export const createAdmin = async (data) => (await api.post("/admin/create", data)).data;
export const getAllAdmins = async () => (await api.get("/admin/all")).data;
export const updateAdmin = async (id, data) => (await api.put(`/admin/update/${id}`, data)).data;
export const deleteAdmin = async (id) => (await api.delete(`/admin/delete/${id}`)).data;
