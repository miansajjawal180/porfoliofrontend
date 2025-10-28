// src/pages/admin/AdminBlogs.jsx
import React, { useEffect, useState } from "react";
import { fetchAllBlogs, addBlog, updateBlog, deleteBlog } from "../../services/api/blogApi";
import { motion } from "framer-motion";
import { Trash2, Edit, PlusCircle, Save, X } from "lucide-react";

// 🎨 Animated Background Component
const AnimatedBackground = () => {
  const stars = Array.from({ length: 50 });
  const squares = Array.from({ length: 20 });
  const triangles = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {stars.map((_, i) => (
        <motion.div
          key={"star-" + i}
          className="absolute bg-white rounded-full opacity-50"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
        />
      ))}
      {squares.map((_, i) => (
        <motion.div
          key={"square-" + i}
          className="absolute bg-indigo-600/30"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10 + Math.random() * 5, repeat: Infinity }}
        />
      ))}
      {triangles.map((_, i) => (
        <motion.div
          key={"triangle-" + i}
          className="absolute w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-indigo-400/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 12 + Math.random() * 5, repeat: Infinity, repeatType: "loop" }}
        />
      ))}
      <motion.div
        className="absolute w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-400 opacity-20"
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
      />
    </div>
  );
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", author: "", tags: "", image: null });
  const [editingBlog, setEditingBlog] = useState(null);
  const token = localStorage.getItem("token");

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await fetchAllBlogs();
      setBlogs(data.blogs || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, newBlog, token);
        setEditingBlog(null);
      } else {
        await addBlog(newBlog, token);
      }
      setNewBlog({ title: "", content: "", author: "", tags: "", image: null });
      setModalOpen(false);
      loadBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setNewBlog({ title: blog.title, content: blog.content, author: blog.author, tags: blog.tags, image: null });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id, token);
        loadBlogs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredBlogs = blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-white">
      <AnimatedBackground />

      {/* Top bar: search + add blog */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
        />
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-semibold transition-all"
        >
          Add Blog <PlusCircle size={20} />
        </button>
      </div>

      {/* Blog cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading blogs...</p>
        ) : filteredBlogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="bg-gray-800/70 p-4 rounded-xl backdrop-blur-sm shadow-lg flex flex-col justify-between"
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(99,102,241,0.6)" }}
            >
              {blog.image_url && <img src={blog.image_url} alt={blog.title} className="w-full h-40 object-cover rounded-md mb-3" />}
              <h2 className="text-xl font-bold mb-1">{blog.title}</h2>
              <p className="text-gray-300 mb-2 line-clamp-4">{blog.content}</p>
              <p className="text-sm text-indigo-400 mb-1">Author: {blog.author}</p>
              <p className="text-sm text-gray-400 mb-2">Tags: {blog.tags}</p>
              <p className="text-xs text-gray-500 mb-2">{new Date(blog.created_at).toLocaleDateString()}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(blog)} className="flex items-center gap-1 text-indigo-400 hover:text-indigo-200">
                  <Edit size={18} /> Edit
                </button>
                <button onClick={() => handleDelete(blog.id)} className="flex items-center gap-1 text-red-400 hover:text-red-200">
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal for Add/Edit Blog */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg relative">
            <button
              onClick={() => { setModalOpen(false); setEditingBlog(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">{editingBlog ? "Edit Blog" : "Add Blog"}</h2>
            <form onSubmit={handleAddOrUpdate} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <textarea
                placeholder="Content"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                rows={4}
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newBlog.tags}
                onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })}
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-semibold transition-all">
                {editingBlog ? "Update Blog" : "Add Blog"} {editingBlog ? <Save size={20} /> : <PlusCircle size={20} />}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
