import api from "./index";

// 🌍 Public fetch (only active services)
export const fetchPublicServices = async () => {
  const res = await api.get("/services/public");
  return res.data;
};

// 🛠️ Admin fetch (active + inactive)
export const fetchAdminServices = async (token) => {
  const res = await api.get("/services", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🟢 Add service (Admin only)
export const addService = async (data, token) => {
  const res = await api.post("/services", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🟡 Update service (Admin only)
export const updateService = async (id, data, token) => {
  const res = await api.put(`/services/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🔴 Delete service (Admin only)
export const deleteService = async (id, token) => {
  const res = await api.delete(`/services/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
