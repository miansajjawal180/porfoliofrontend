import React, { useEffect, useState, useRef } from "react";
import {
  fetchShowcase,
  createShowcase,
  updateShowcase,
  deleteShowcase,
} from "../../services/api/showcaseApi";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Plus,
  Trash2,
  Edit,
  Upload,
  X,
  Search,
  Filter,
} from "lucide-react";
import Modal from "../../components/ui/Modal";

export default function ShowcaseAdmin() {
  const [showcases, setShowcases] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const canvasRef = useRef(null);

  // 🔹 Fetch showcase data
  const fetchShowcasesData = async () => {
    try {
      setFetching(true);
      const data = await fetchShowcase();
      setShowcases(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching showcase:", err);
      setShowcases([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchShowcasesData();
  }, []);

  // 🔹 Handlers
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || (!file && !editingItem)) {
      return alert("Please fill all fields.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("media_type", mediaType);
    if (file) formData.append("media", file);

    try {
      setLoading(true);
      if (editingItem) {
        await updateShowcase(editingItem.id, formData);
      } else {
        await createShowcase(formData);
      }
      setTitle("");
      setCategory("");
      setFile(null);
      setEditingItem(null);
      setModalOpen(false);
      fetchShowcasesData();
    } catch (err) {
      console.error("Error saving showcase:", err);
      alert("Failed to save showcase.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setTitle(item.title || "");
    setCategory(item.category || "");
    setMediaType(item.media_type || "image");
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this showcase item?")) return;
    try {
      await deleteShowcase(id);
      fetchShowcasesData();
    } catch (err) {
      console.error("Error deleting showcase:", err);
    }
  };

  // 🔹 Filter + Search
  const filteredShowcases = showcases.filter((item) => {
    const mediaMatch =
      filterType === "all" ? true : item.media_type?.toLowerCase() === filterType;
    const searchMatch =
      (item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return mediaMatch && searchMatch;
  });

  // 🔹 Animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrame;

    const particles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(8, 0, 25, 0.8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        gradient.addColorStop(0, "rgba(168, 85, 247, 0.9)");
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // 🔹 Render
  return (
    <div className="relative min-h-screen text-gray-100 overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {/* Add Showcase Button */}
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setEditingItem(null);
              setTitle("");
              setCategory("");
              setMediaType("image");
              setModalOpen(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 px-6 py-3 rounded-2xl font-semibold hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:scale-105 transition-all"
          >
            <Plus size={18} /> Add Showcase
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#0b0125]/80 to-[#08001a]/90 p-4 rounded-2xl border border-indigo-700/30 backdrop-blur-md shadow-[inset_0_0_20px_rgba(99,102,241,0.15)]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="text-indigo-400" size={18} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-950/40 border border-indigo-700/30 text-white rounded-lg px-3 py-2 outline-none hover:border-indigo-500 focus:border-indigo-400 transition"
            >
              <option value="all">All Media</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>
          </div>

          <div className="relative w-full md:w-1/3">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-950/40 border border-indigo-700/30 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Showcase Grid */}
        {fetching ? (
          <p className="text-center text-gray-400">Loading showcases...</p>
        ) : filteredShowcases.length === 0 ? (
          <p className="text-center text-gray-400">No showcase items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShowcases.map((item) => (
              <Card
                key={item.id}
                className="bg-gradient-to-br from-[#0f012e]/80 to-[#0a0120]/80 border border-indigo-700/30 rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300"
              >
                {item.media_type === "video" ? (
                  <video
                    src={item.media_url}
                    controls
                    className="w-full h-56 object-cover rounded-t-2xl"
                  />
                ) : (
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-56 object-cover rounded-t-2xl"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-indigo-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{item.category}</p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/20"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      className="border-red-500 text-red-400 hover:bg-red-600/20"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gradient-to-br from-[#0b0125]/90 to-[#0a0020]/90 rounded-2xl border border-indigo-700/30 shadow-[0_0_30px_rgba(99,102,241,0.25)]">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-500 text-center">
            {editingItem ? "Edit Showcase" : "Add New Showcase"}
          </h2>

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0f012e]/60 border border-indigo-700/40 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          <input
            type="text"
            placeholder="Category (e.g. Web App, Design, UI/UX)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0f012e]/60 border border-indigo-700/40 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />

          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0f012e]/60 border border-indigo-700/40 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="image">🖼️ Image</option>
            <option value="video">🎥 Video</option>
          </select>

          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-indigo-600/50 bg-[#0f012e]/50 p-6 rounded-2xl cursor-pointer hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all">
            <Upload size={22} className="text-indigo-400" />
            <span className="text-sm text-gray-300">
              {file ? file.name : "Click to upload file"}
            </span>
            <input
              type="file"
              accept={mediaType === "video" ? "video/*" : "image/*"}
              onChange={handleFileChange}
              hidden
            />
          </label>

          <div className="flex justify-end gap-4 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="border border-gray-600 text-gray-300 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
            >
              <X size={16} /> Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 px-6 py-2 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105 transition-all"
            >
              {loading ? "Saving..." : editingItem ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
