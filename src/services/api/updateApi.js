import api from "./index";

export const getUpdates = async () => (await api.get("/updates")).data;
export const createUpdate = async (data) => (await api.post("/updates", data)).data;
export const updateUpdate = async (id, data) => (await api.put(`/updates/${id}`, data)).data;
export const deleteUpdate = async (id) => (await api.delete(`/updates/${id}`)).data;
