import React, { useState } from "react";
import { motion } from "framer-motion";
import { createMessage } from "../services/api/messageApi";
import "./Animated.css"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await createMessage(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex justify-center items-center px-6 py-16 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="contact-bg" />
      <div className="form-glow" />

      {/* Form Card */}
      <motion.div
        className="relative z-10 max-w-2xl w-full bg-white/10 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Get in Touch ✨
        </motion.h1>
        <p className="text-center text-gray-300 mb-8">
          Have a project idea or just want to say hi? Drop me a message below!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "email", "subject"].map((field, i) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <label className="block text-sm font-semibold mb-2 text-indigo-300 capitalize">
                {field === "name" ? "Full Name" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder={`Enter your ${field}`}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/70 border border-indigo-500/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-semibold mb-2 text-indigo-300">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 border border-indigo-500/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </motion.div>

          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <button
              type="submit"
              disabled={loading}
              className="contact-btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-pink-500/30 transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.div>

          {success && (
            <motion.p className="text-center text-green-400 mt-4 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              ✅ Message sent successfully! I’ll get back to you soon.
            </motion.p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
