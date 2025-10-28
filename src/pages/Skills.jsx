import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAllSkills } from "../services/api/skillsApi";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const res = await fetchAllSkills();
        console.log("Fetched skills:", res);
        // ✅ if your backend returns { skills: [...] }
        setSkills(res.skills || res || []);
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };
    getSkills();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-300 text-lg">
        Loading skills...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F172A] text-white flex flex-col items-center justify-center px-6 py-24">
      {/* ✨ Animated Background */}
      <AnimatedBackground />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 drop-shadow-[0_4px_10px_rgba(99,102,241,0.3)]"
      >
        My Skills
      </motion.h1>

      <p className="mt-3 text-slate-400 text-lg text-center">
        Technologies I work with to build modern web experiences
      </p>

      {/* 🔷 Skill Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <motion.div
              key={skill.id}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group bg-[#1E293B]/60 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center 
                shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all duration-500 backdrop-blur-md"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition duration-700"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg transform group-hover:rotate-y-12 transition-transform duration-500">
                  {skill.icon_url ? (
                    <img
                      src={skill.icon_url}
                      alt={skill.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className="text-2xl font-bold">
                      {skill.name?.charAt(0) || "?"}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{skill.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{skill.level}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-slate-400 text-center col-span-full">
            No skills found.
          </p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-16 text-slate-400 text-sm tracking-wide"
      >
        Always learning & evolving 🚀
      </motion.div>
    </div>
  );
}

// 🌌 Animated Background (3D stars + waves)
const AnimatedBackground = () => {
  const shapes = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]" />
      {shapes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6,
          }}
          animate={{
            y: [0, Math.random() * 20 - 10],
            x: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}

      {/* Soft animated waves */}
      <motion.div
        className="absolute -bottom-10 left-0 w-full h-64 bg-gradient-to-r from-indigo-500/20 via-pink-400/20 to-blue-500/20 blur-3xl"
        animate={{
          x: ["0%", "50%", "0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-2xl rounded-full"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
