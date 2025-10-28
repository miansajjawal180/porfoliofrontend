// pages/admin/AdminSkills.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  fetchAllSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "../../services/api/skillsApi";
import { Edit, Trash2, PlusCircle } from "lucide-react";

// 🎨 Animated background component
const AnimatedBackground = () => {
  const stars = Array.from({ length: 50 });
  const squares = Array.from({ length: 20 });
  const triangles = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {stars.map((_, i) => (
        <motion.div
          key={`star-${i}`}
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
          key={`square-${i}`}
          className="absolute bg-indigo-500 opacity-20"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      ))}
      {triangles.map((_, i) => (
        <motion.div
          key={`triangle-${i}`}
          className="absolute w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: Math.random() * 15 + 10, repeat: Infinity }}
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

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [newSkill, setNewSkill] = useState({ name: "", level: "", icon_url: "" });
  const [editingSkill, setEditingSkill] = useState(null);
  const token = localStorage.getItem("token");

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await fetchAllSkills();
      setSkills(data.skills || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await updateSkill(editingSkill.id, newSkill, token);
      } else {
        await addSkill(newSkill, token);
      }
      setNewSkill({ name: "", level: "", icon_url: "" });
      setEditingSkill(null);
      loadSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setNewSkill({ name: skill.name, level: skill.level, icon_url: skill.icon_url });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(id, token);
        loadSkills();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-black text-white">
      <AnimatedBackground />

      {/* Search + Add Skill */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search skills by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/3"
        />
        <button
          onClick={handleAddOrUpdate}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-semibold transition-all"
        >
          <PlusCircle size={20} />
          {editingSkill ? "Update Skill" : "Add Skill"}
        </button>
      </div>

      {/* Add/Edit Skill Form */}
      <form
        onSubmit={handleAddOrUpdate}
        className="mb-6 p-4 bg-gray-800/70 rounded-xl backdrop-blur-sm shadow-lg flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          className="p-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          placeholder="Skill Level (Beginner, Intermediate, Expert)"
          value={newSkill.level}
          onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
          className="p-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          placeholder="Icon URL"
          value={newSkill.icon_url}
          onChange={(e) => setNewSkill({ ...newSkill, icon_url: e.target.value })}
          className="p-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </form>

      {/* Skill List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading skills...</p>
        ) : filteredSkills.length === 0 ? (
          <p>No skills found.</p>
        ) : (
          filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              className="bg-gray-800/70 p-4 rounded-xl backdrop-blur-sm shadow-lg flex flex-col justify-between"
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(99,102,241,0.6)" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold mb-2">{skill.name}</h2>
                  <p className="text-sm text-gray-400 mb-2">{skill.level}</p>
                  {skill.icon_url && <img src={skill.icon_url} alt={skill.name} className="w-10 h-10" />}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-200"
                  >
                    <Edit size={18} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-200"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{new Date(skill.created_at).toLocaleDateString()}</span>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
