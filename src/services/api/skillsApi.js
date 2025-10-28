// services/skillsApi.js
import api from "./index.js"; // your main Axios instance

// 🟢 Get all skills (public)
export const fetchAllSkills = async () => {
  try {
    const response = await api.get("/skills");
    return response.data;
  } catch (error) {
    console.error("Error fetching all skills:", error);
    throw error;
  }
};

// 🟢 Get single skill by ID (admin)
export const fetchSkillById = async (id, token) => {
  try {
    const response = await api.get(`/skills/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching skill ${id}:`, error);
    throw error;
  }
};

// 🟢 Add new skill (admin)
export const addSkill = async (skillData, token) => {
  try {
    const response = await api.post("/skills", skillData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding skill:", error);
    throw error;
  }
};

// 🟢 Update skill (admin)
export const updateSkill = async (id, skillData, token) => {
  try {
    const response = await api.put(`/skills/${id}`, skillData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating skill ${id}:`, error);
    throw error;
  }
};

// 🟢 Delete skill (admin)
export const deleteSkill = async (id, token) => {
  try {
    const response = await api.delete(`/skills/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting skill ${id}:`, error);
    throw error;
  }
};
