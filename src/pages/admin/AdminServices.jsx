import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  fetchAdminServices,
  addService,
  updateService,
  deleteService,
} from "../../services/api/servicesApi";
import { Plus, Trash2, Edit3 } from "lucide-react";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    icon_url: "",
    order_index: 0,
    is_active: true,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await fetchAdminServices(token);
      setServices(data || []);
    } catch (err) {
      console.error("Error loading services:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateService(form.id, form, token);
      } else {
        await addService(form, token);
      }
      setForm({
        id: null,
        title: "",
        description: "",
        icon_url: "",
        order_index: 0,
        is_active: true,
      });
      setIsAdding(false);
      loadServices();
    } catch (err) {
      console.error("Error saving service:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteService(id, token);
      loadServices();
    }
  };

  const filteredServices = services.filter((service) =>
    service.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#030014] text-white p-10 overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 relative z-10 gap-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          Manage Services
        </motion.h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search services..."
            className="px-4 py-2 rounded-lg bg-[#111827] text-white outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setForm({
                id: null,
                title: "",
                description: "",
                icon_url: "",
                order_index: 0,
                is_active: true,
              });
              setIsAdding(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <Plus size={18} /> Add Service
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-lg shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {service.icon_url ? (
                    <img
                      src={service.icon_url}
                      alt={service.title}
                      className="w-12 h-12 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 text-xl font-bold">
                      {service.title.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-3">
                      {service.description}
                    </p>
                    <p
                      className={`mt-1 text-xs font-medium ${
                        service.is_active ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {service.is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/40 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    className="p-2 bg-indigo-500/20 rounded-lg hover:bg-indigo-500/40 transition"
                    onClick={() => {
                      setForm(service);
                      setIsAdding(true);
                    }}
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No services found.
          </p>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111827] p-8 rounded-2xl w-[90%] max-w-md shadow-2xl relative"
          >
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              {form.id ? "Edit Service" : "Add New Service"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Service Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="p-3 rounded-lg bg-[#0F172A] text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <textarea
                placeholder="Service Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="p-3 rounded-lg bg-[#0F172A] text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Icon URL (optional)"
                value={form.icon_url}
                onChange={(e) =>
                  setForm({ ...form, icon_url: e.target.value })
                }
                className="p-3 rounded-lg bg-[#0F172A] text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              {/* Live Preview */}
              {form.icon_url && (
                <img
                  src={form.icon_url}
                  alt="icon preview"
                  className="w-16 h-16 object-contain mt-2 rounded-lg"
                />
              )}

              {/* Order index & Active toggle */}
              <div className="flex items-center justify-between gap-4 mt-2">
                <input
                  type="number"
                  placeholder="Order Index"
                  value={form.order_index}
                  onChange={(e) =>
                    setForm({ ...form, order_index: Number(e.target.value) })
                  }
                  className="p-2 rounded-lg bg-[#0F172A] text-white w-24 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) =>
                      setForm({ ...form, is_active: e.target.checked })
                    }
                    className="w-5 h-5 accent-indigo-500"
                  />
                  <span className="text-white text-sm font-medium">
                    Active
                  </span>
                </label>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      id: null,
                      title: "",
                      description: "",
                      icon_url: "",
                      order_index: 0,
                      is_active: true,
                    });
                    setIsAdding(false);
                  }}
                  className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// 🌌 Animated Background
const AnimatedBackground = () => {
  const stars = Array.from({ length: 70 });
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A2E] via-[#111827] to-[#030014]" />
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random() * 0.7,
          }}
          animate={{
            y: [0, Math.random() * 20 - 10],
            x: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
};
