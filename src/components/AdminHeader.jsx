import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { getProfile } from "../services/api/profileApi"; // ✅ Correct import

export default function AdminHeader({ setSidebarOpen, pageTitle }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-950 via-indigo-900 to-black text-white border-b border-indigo-800/40 shadow-2xl backdrop-blur-md">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden hover:scale-110 transition-transform text-indigo-400 hover:text-white"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <Menu size={28} />
      </button>

      {/* Page Title */}
      <h1 className="text-lg md:text-xl font-semibold tracking-wide bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
        {pageTitle || "Dashboard"}
      </h1>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        {profile ? (
          <>
            <span className="text-indigo-300 font-medium capitalize">
              {profile.name}
            </span>
            <img
              src={
                profile.profile_pic ||
                `https://ui-avatars.com/api/?name=${profile.name}&background=4F46E5&color=fff`
              }
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-indigo-500 shadow-md object-cover hover:scale-105 hover:shadow-indigo-500/40 transition-all duration-300"
            />
          </>
        ) : (
          <div className="animate-pulse flex items-center gap-3">
            <div className="h-4 w-20 bg-white/20 rounded"></div>
            <div className="w-10 h-10 bg-white/20 rounded-full"></div>
          </div>
        )}
      </div>
    </header>
  );
}
