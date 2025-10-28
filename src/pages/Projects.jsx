import React, { useEffect, useState } from "react";
import { Github, ExternalLink, Image, Video } from "lucide-react";
import { getProjects } from "../services/api/projectApi";
import { getShowcases } from "../services/api/showcaseApi";
import { motion } from "framer-motion";

// 🌈 Animated Background
const AnimatedBackground = () => {
  const shapes = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((_, i) => {
        const size = Math.random() * 35 + 10;
        const shapeType = Math.random() > 0.5 ? "circle" : "square";
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        const left = `${Math.random() * 100}%`;
        const duration = 12 + Math.random() * 10;

        return (
          <motion.div
            key={i}
            className={`absolute ${
              shapeType === "circle" ? "rounded-full" : "rounded-md"
            }`}
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              top: "100%",
              left,
              opacity: 0.18,
              filter: "blur(1px)",
            }}
            animate={{
              y: ["100%", "-150%"],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 8,
            }}
          />
        );
      })}
    </div>
  );
};

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [showcases, setShowcases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, showRes] = await Promise.all([
          getProjects(),
          getShowcases(),
        ]);
        setProjects(projRes);
        setShowcases(showRes.data || showRes);
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0F172A] text-white flex flex-col items-center px-6 py-20 overflow-hidden">
      {/* 🌌 Background */}
      <AnimatedBackground />

      {/* 🌟 Portfolio Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 drop-shadow-[0_4px_10px_rgba(99,102,241,0.3)] relative z-10"
      >
        My Portfolio
      </motion.h1>
      <p className="mt-3 text-slate-400 text-lg relative z-10">
        A collection of my latest projects and creative showcases
      </p>

      {/* 🔹 Loading State */}
      {loading ? (
        <p className="text-slate-400 mt-20 text-lg">Loading content...</p>
      ) : (
        <>
          {/* 🔹 PROJECTS SECTION */}
          <h2 className="text-3xl font-bold mt-16 mb-8 text-indigo-400 relative z-10">
            🚀 Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl relative z-10">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group bg-[#1E293B]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-500 hover:-translate-y-3"
              >
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}

                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {project.tech_stack && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech_stack.split(",").map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/10 text-slate-300"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-4">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all"
                    >
                      <ExternalLink size={18} />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 🔸 SHOWCASE SECTION */}
          <h2 className="text-3xl font-bold mt-24 mb-8 text-pink-400 relative z-10">
            🎨 Showcases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl relative z-10">
            {showcases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-[#1E293B]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] transition-all hover:-translate-y-3"
              >
                {item.media_type === "image" ? (
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <video
                    src={item.media_url}
                    controls
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    {item.media_type === "image" ? (
                      <Image size={20} className="text-indigo-400" />
                    ) : (
                      <Video size={20} className="text-pink-400" />
                    )}
                  </div>
                  <p className="text-slate-400 text-sm">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      <p className="mt-20 text-slate-500 text-sm tracking-wide relative z-10">
        Constantly building, learning & evolving 💡
      </p>
    </div>
  );
}
