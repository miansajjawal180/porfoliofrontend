// src/services/api/messageApi.js
import api from "./index.js"; // your main Axios instance

// Public: create (send) a new message
export const createMessage = async (data) => {
  try {
    const res = await api.post("/messages", data);
    return res.data;
  } catch (err) {
    console.error("Error sending message:", err);
    // throw the server response body if present, otherwise a generic error
    throw err.response?.data || { message: "Failed to send message" };
  }
};

// Admin: get all messages (requires token)
export const getMessages = async (token) => {
  try {
    const res = await api.get("/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw err.response?.data || { message: "Failed to fetch messages" };
  }
};

// Admin: delete a message (requires token)
export const deleteMessage = async (id, token) => {
  try {
    const res = await api.delete(`/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting message:", err);
    throw err.response?.data || { message: "Failed to delete message" };
  }
};
