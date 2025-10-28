import api from "./index.js"; // your axios instance with baseURL & auth

// ---------- Admin CRUD ----------
export const createShowcase = async (formData) => {
  try {
    const response = await api.post("/showcase", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    console.error("Create Showcase Error:", err);
    throw err;
  }
};

export const updateShowcase = async (id, formData) => {
  try {
    const response = await api.put(`/showcase/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    console.error("Update Showcase Error:", err);
    throw err;
  }
};

export const deleteShowcase = async (id) => {
  try {
    const response = await api.delete(`/showcase/${id}`);
    return response.data;
  } catch (err) {
    console.error("Delete Showcase Error:", err);
    throw err;
  }
};

// ---------- Public Fetch ----------
export const fetchShowcase = async () => {
  try {
    const response = await api.get("/showcase");
    return response.data;
  } catch (err) {
    console.error("Fetch Showcase Error:", err);
    throw err;
  }
};

export const fetchShowcaseById = async (id) => {
  try {
    const response = await api.get(`/showcase/${id}`);
    return response.data;
  } catch (err) {
    console.error("Fetch Showcase By ID Error:", err);
    throw err;
  }
};
