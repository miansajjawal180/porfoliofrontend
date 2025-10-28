// src/pages/Blogs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllBlogs } from "../services/api/blogApi";
import { Card, CardContent } from "../components/ui/card";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        if (data.success) setBlogs(data.blogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-10">Loading blogs...</p>
    );

  if (!blogs.length)
    return <p className="text-center text-gray-400 mt-10">No blogs found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a001a] via-[#0a0030] to-[#00114d] py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        Latest Blogs
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            className="bg-[#0f052e] border border-gray-800 text-white rounded-2xl shadow-md overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            {/* 🖼️ Blog Image */}
            {blog.image_url && (
              <img
                src={
                  blog.image_url.startsWith("http")
                    ? blog.image_url
                    : `http://localhost:5000${blog.image_url}`
                }
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
            )}

            {/* 📄 Blog Info */}
            <CardContent className="p-5">
              <h2 className="text-2xl font-semibold mb-2 text-white">
                {blog.title}
              </h2>

              <p className="text-gray-400 text-sm mb-3">
                By {blog.author || "Admin"} •{" "}
                {new Date(blog.created_at).toLocaleDateString()}
              </p>

              <p className="text-gray-300 mb-4 line-clamp-3">
                {blog.content.length > 150
                  ? blog.content.slice(0, 150) + "..."
                  : blog.content}
              </p>

              {/* ✅ Fixed Route Path */}
              <Link
                to={`/blogs/${blog.id}`}
                className="inline-block text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Read More →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
