// src/pages/BlogDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogById } from "../services/api/blogApi";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await fetchBlogById(id);
        if (data.success) {
          setBlog(data.blog);
        } else {
          console.error("Failed to load blog");
        }
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-400">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="text-center mt-10 text-red-500">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0120] to-[#110b30] text-white py-16 px-6 md:px-20 flex flex-col items-center">
      <Card className="bg-[#1b103d]/60 backdrop-blur-xl border border-purple-800/40 rounded-2xl p-6 shadow-lg max-w-5xl w-full flex flex-col md:flex-row gap-8">
        {/* Left side: text */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="text-gray-400 text-sm mb-4">
            By <span className="text-purple-400">{blog.author}</span> •{" "}
            {new Date(blog.created_at).toLocaleDateString()}
          </div>
          <div
            className="text-gray-200 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Right side: image */}
        {blog.image_url && (
          <div className="md:w-1/3 flex justify-center items-start">
            <img
              src={
                blog.image_url.startsWith("http")
                  ? blog.image_url
                  : `http://localhost:5000${blog.image_url}`
              }
              alt={blog.title}
              className="rounded-xl shadow-lg max-h-96 object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}
      </Card>

      {/* 🟣 Back button at bottom */}
      <div className="mt-10">
        <Button
          onClick={() => navigate(-1)}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white"
        >
          ← Back to Blogs
        </Button>
      </div>
    </div>
  );
}
