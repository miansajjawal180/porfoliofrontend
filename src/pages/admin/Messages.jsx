// src/pages/admin/Messages.jsx
import React, { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "../../services/api/messageApi";
import { Trash2 } from "lucide-react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // ✅ admin token
      const res = await getMessages(token);
      setMessages(res.data || []); // ✅ access the correct array
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const token = localStorage.getItem("token");
      await deleteMessage(id, token);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Failed to delete message!");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-900/60 border border-indigo-500/30 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
          Messages
        </h1>

        {loading ? (
          <p className="text-gray-400 text-center">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages found.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="border border-indigo-500/20 bg-gray-800/60 p-5 rounded-xl flex justify-between items-start hover:border-indigo-500/40 transition-all"
              >
                <div>
                  <h3 className="text-lg font-semibold text-indigo-400">
                    {msg.name}
                  </h3>
                  <p className="text-sm text-gray-400">{msg.email}</p>
                  <p className="text-sm text-gray-300 mt-1">
                    <strong>Subject:</strong> {msg.subject || "No subject"}
                  </p>
                  <p className="text-gray-200 mt-2">{msg.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-400 hover:text-red-500 transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
