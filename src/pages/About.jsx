import React, { useEffect, useState } from "react";
import { getPublicProfiles } from "../services/api/profileApi";
import { getPublicSocialLinks } from "../services/api/socialApi";
import Chatbot from "../components/Chatbot";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";
import "./animated.css";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getPublicProfiles();
        const profiles = Array.isArray(profileRes)
          ? profileRes
          : profileRes?.data || [];
        setProfile(profiles[0] || null);

        const socialRes = await getPublicSocialLinks();
        const socials = Array.isArray(socialRes)
          ? socialRes
          : socialRes?.data || [];
        setSocialLinks(socials);
      } catch (err) {
        console.error("Error loading about page data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIcon = (platform) => {
    const name = platform?.toLowerCase() || "";
    if (name.includes("github")) return <FaGithub />;
    if (name.includes("linkedin")) return <FaLinkedin />;
    if (name.includes("facebook")) return <FaFacebook />;
    if (name.includes("youtube")) return <FaYoutube />;
    if (name.includes("instagram")) return <FaInstagram />;
    if (name.includes("twitter") || name.includes("x")) return <FaTwitter />;
    return <FaGlobe />;
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-gray-400">
        Loading profile...
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-red-400">
        No public profile found.
      </div>
    );

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 bg-[#0F172A] text-white pt-24 md:pt-28 overflow-hidden">
      {/* Background Animation */}
      <div aria-hidden className="animated-bg" />

      {/* LEFT IMAGE */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-8 md:mb-0 z-10">
        <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
          <div className="absolute inset-0 rounded-full animate-picGlow" />
          {profile.profile_pic && (
            <img
              src={profile.profile_pic}
              alt={profile.name}
              className="w-full h-full object-cover rounded-full relative z-10"
            />
          )}
        </div>
      </div>

      {/* RIGHT TEXT */}
      <div className="w-full md:w-2/3 z-10 space-y-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 animate-text-shine">
            Hello, I’m {profile.name || "Admin"}
          </span>
        </h1>

        {profile.title && (
          <p className="text-slate-300 text-lg md:text-xl font-medium">
            {profile.title}
          </p>
        )}

        {profile.bio && <p className="text-slate-400 max-w-xl">{profile.bio}</p>}

        {/* SOCIAL LINKS */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            {socialLinks.map((link) => (
              <a
                key={link.id || link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10 hover:scale-105"
              >
                <span className="text-xl text-indigo-400">{getIcon(link.platform)}</span>
                <span className="capitalize">{link.platform}</span>
              </a>
            ))}
          </div>
        )}

        {/* RESUME + CONTACT */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
          {profile.resume_link && (
            <a
              href={profile.resume_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-110 hover:shadow-lg transition-all font-semibold"
            >
              View Resume
            </a>
          )}

          <a
            href="/contact"
            className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-indigo-500/40 hover:to-pink-500/40 hover:scale-110 transition-all font-medium border border-white/10"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </section>
  );
}
