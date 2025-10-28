import React, { useEffect, useState } from "react";
import { getPublicProfiles } from "../services/api/profileApi";
import Chatbot from "../components/Chatbot";
import { FaMapMarkerAlt, FaBriefcase, FaProjectDiagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./animated.css";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profiles = await getPublicProfiles();
        if (profiles.length > 0) setProfile(profiles[0]);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-gray-400">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-red-400">
        No public profile found.
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0F172A] text-white overflow-hidden px-6 md:px-16 pt-24 md:pt-32">
      {/* Background */}
      <div className="animated-bg" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left - Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">Hey,</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {profile.name || "Admin"}
          </h1>
          {profile.title && (
            <p className="text-indigo-400 text-xl font-semibold">{profile.title}</p>
          )}
          {profile.bio && (
            <p className="text-slate-300 text-lg md:text-xl">{profile.bio}</p>
          )}

          {/* Dynamic Info Cards */}
          <div className="flex flex-wrap gap-4 mt-4">
            {profile.location && (
              <span className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg">
                <FaMapMarkerAlt /> {profile.location}
              </span>
            )}
            {profile.experience_years && (
              <span className="flex items-center gap-2 bg-pink-600 px-4 py-2 rounded-lg">
                <FaBriefcase /> {profile.experience_years} Years Experience
              </span>
            )}
            {profile.total_projects && (
              <span className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg">
                <FaProjectDiagram /> {profile.total_projects} Projects
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => navigate("/portfolio")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-110 hover:shadow-lg transition-all font-semibold"
            >
              View Projects
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-indigo-500/40 hover:to-pink-500/40 hover:scale-110 transition-all font-medium border border-white/10"
            >
              Get in Touch
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className="px-6 py-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 hover:scale-110 transition-all font-medium border border-indigo-400"
            >
              Blog / Update
            </button>
          </div>
        </div>

        {/* Right - Profile Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0">
          {profile.profile_pic && (
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] rounded-[40px] overflow-hidden group">
              <div className="absolute inset-0 animate-picGlow" />
              <img
                src={profile.profile_pic}
                alt={profile.name}
                className="relative w-full h-full object-cover rounded-[40px] z-10"
                style={{
                  maskImage:
                    "radial-gradient(circle at center, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at center, black 70%, transparent 100%)",
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </main>
  );
}
