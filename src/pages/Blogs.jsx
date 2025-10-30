import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAllBlogs } from "../services/api/blogApi";
import Chatbot from "../components/Chatbot";
import "./Animated.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        if (data.success) setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    loadBlogs();
  }, []);

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-[#0F172A] text-white">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Section Heading */}
        <motion.h2
          className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Blogs
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="text-gray-300 mb-12 text-lg md:text-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Insights, stories, and creative thoughts from my professional journey.
        </motion.p>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <motion.div
                key={blog.id || index}
                className="relative bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all group"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, rotateY: 3 }}
              >
                {/* Glowing overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>

                {/* Image */}
                {blog.image_url && (
                  <img
                    src={
                      blog.image_url.startsWith("http")
                        ? blog.image_url
                        : `http://localhost:5000${blog.image_url}`
                    }
                    alt={blog.title}
                    className="w-full h-56 object-cover rounded-xl mb-5 relative z-10"
                  />
                )}

                {/* Title */}
                <h3 className="text-2xl font-semibold mb-3 relative z-10 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                  {blog.title}
                </h3>

                {/* Meta Info */}
                <p className="text-gray-400 text-sm mb-3 relative z-10">
                  By {blog.author || "Admin"} •{" "}
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 relative z-10 leading-relaxed line-clamp-3">
                  {blog.content.length > 150
                    ? blog.content.slice(0, 150) + "..."
                    : blog.content}
                </p>

                {/* Read More Button */}
                <a
                  href={`/blogs/${blog.id}`}
                  className="inline-block text-indigo-400 hover:text-indigo-300 font-medium relative z-10"
                >
                  Read More →
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">
              No blogs available yet.
            </p>
          )}
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </section>
  );
};

export default Blogs;

/* 🌌 Animated Background */
const AnimatedBackground = () => {
  const stars = Array.from({ length: 60 });

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Gradient BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]" />

      {/* Floating Stars */}
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random() * 0.8,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}

      {/* Glowing Gradient Layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-r from-indigo-500/30 via-pink-400/30 to-blue-500/30 blur-3xl"
        animate={{ x: ["0%", "50%", "0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
