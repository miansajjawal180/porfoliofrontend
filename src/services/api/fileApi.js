import api from "./index";

export const getFiles = async () => (await api.get("/files")).data;

export const uploadFile = async (formData) => {
  const res = await api.post("/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteFile = async (id) => (await api.delete(`/files/${id}`)).data;
