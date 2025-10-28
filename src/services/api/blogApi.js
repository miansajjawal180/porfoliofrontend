// services/blogApi.js
import api from "./index.js"; // your main Axios instance

// 🟢 Get all blogs (public)
export const fetchAllBlogs = async () => {
  try {
    const response = await api.get("/blogs");
    return response.data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error;
  }
};

// 🟢 Get single blog by ID (public)
export const fetchBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    throw error;
  }
};

// 🟢 Add new blog (admin)
export const addBlog = async (blogData, token) => {
  try {
    const formData = new FormData();
    for (let key in blogData) {
      formData.append(key, blogData[key]);
    }

    const response = await api.post("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};

// 🟢 Update blog (admin)
export const updateBlog = async (id, blogData, token) => {
  try {
    const formData = new FormData();
    for (let key in blogData) {
      formData.append(key, blogData[key]);
    }

    const response = await api.put(`/blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating blog ${id}:`, error);
    throw error;
  }
};

// 🟢 Delete blog (admin)
export const deleteBlog = async (id, token) => {
  try {
    const response = await api.delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog ${id}:`, error);
    throw error;
  }
};
