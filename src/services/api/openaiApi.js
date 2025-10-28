import api from "./index";

// Public Chat
export const sendPublicChat = async (message) => {
  try {
    const res = await api.post("/openai/public/chat", { message });
    return res.data.reply;
  } catch (err) {
    console.error("Public chat failed:", err);
    throw err;
  }
};

// Admin Chat (requires token)
export const sendAdminChat = async (message, token) => {
  try {
    const res = await api.post("/openai/admin/chat", { message }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.reply;
  } catch (err) {
    console.error("Admin chat failed:", err);
    throw err;
  }
};
