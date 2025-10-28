// src/pages/admin/Profile.jsx
import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { getProfile, updateProfile } from "../../services/api/profileApi";


export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data || {});
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setProfile({
        ...profile,
        profile_pic: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleResumeChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setProfile({
        ...profile,
        resume_link: e.target.files[0].name,
      });
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      setSaving(true);
      const formData = new FormData();

      // basic info
      formData.append("name", profile.name || "");
      formData.append("email", profile.email || "");
      formData.append("title", profile.title || "");
      formData.append("short_bio", profile.short_bio || "");
      formData.append("about_bio", profile.about_bio || "");
      formData.append("bio", profile.bio || "");
      formData.append("phone", profile.phone || "");
      formData.append("location", profile.location || "");
      formData.append("resume_link", profile.resume_link || "");
      formData.append("experience_years", profile.experience_years || "");
      formData.append("total_projects", profile.total_projects || "");
      formData.append("education", profile.education || "");

      // uploads
      if (avatarFile) formData.append("profile_pic", avatarFile);
      if (resumeFile) formData.append("resume", resumeFile);
      if (password) formData.append("password", password);

      await updateProfile(formData);

      alert("✅ Profile updated successfully!");
      setPassword("");
      setResumeFile(null);
      fetchProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("❌ Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="p-6 text-indigo-300 animate-pulse">Loading profile...</p>;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 p-6 flex flex-col items-center">
      {/* Animated Background Layer */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          {/* vertical lines */}
          <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-700 to-transparent opacity-60 animate-vertical-move"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-700 to-transparent opacity-50 animate-vertical-move delay-2000"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-600 to-transparent opacity-40 animate-vertical-move delay-4000"></div>

          {/* floating geometric shapes */}
          <div className="absolute -left-12 -top-6 w-40 h-40 rounded-md bg-gradient-to-br from-indigo-700 to-purple-600 opacity-20 blur-sm animate-float-slow transform rotate-12"></div>
          <div className="absolute right-6 top-10 w-28 h-28 rounded-sm bg-gradient-to-br from-pink-600 to-indigo-700 opacity-18 blur-sm animate-float direction-right"></div>

          {/* stars / dots */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 space-x-6 opacity-60">
            <span className="block w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse-fast inline-block mr-4"></span>
            <span className="block w-1 h-1 rounded-full bg-purple-300 animate-pulse inline-block mr-3"></span>
            <span className="block w-1.5 h-1.5 rounded-full bg-pink-300 animate-pulse-slower inline-block"></span>
          </div>

          {/* tiny squares */}
          <div className="absolute bottom-10 left-8 grid gap-3" style={{ gridTemplateColumns: "repeat(3, 12px)" }}>
            <div className="w-3 h-3 bg-indigo-600 animate-square"></div>
            <div className="w-3 h-3 bg-purple-600 animate-square delay-1000"></div>
            <div className="w-3 h-3 bg-pink-600 animate-square delay-2000"></div>
          </div>

          {/* triangles (SVG) */}
          <svg className="absolute top-44 right-28 w-20 h-20 opacity-20 animate-rotate-slow" viewBox="0 0 100 100">
            <polygon points="50,5 95,95 5,95" fill="url(#g1)"/>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#6d28d9" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Page header */}
      <h1 className="relative z-10 text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
        Admin Profile
      </h1>

      <Card className="relative z-10 bg-gradient-to-br from-indigo-900/40 to-purple-900/30 border border-indigo-600/30 max-w-5xl w-full p-6 shadow-2xl rounded-2xl backdrop-blur-xl">
        <CardContent>
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <img
              src={
                profile.profile_pic ||
                `https://ui-avatars.com/api/?name=${profile.name || "Admin"}&background=7c3aed&color=fff&size=256`
              }
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover ring-2 ring-indigo-400/30 shadow-xl"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatarInput"
                  />
                  <span className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-600 to-pink-600 text-slate-100 font-medium shadow hover:scale-105 transition-transform">
                    Upload Avatar
                  </span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeChange}
                    className="hidden"
                    id="resumeInput"
                  />
                  <span className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-slate-100 font-medium shadow hover:scale-105 transition-transform">
                    Upload Resume (PDF)
                  </span>
                </label>

                {profile.resume_link && (
                  <a
                    href={profile.resume_link}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-sm px-3 py-1 rounded-md bg-indigo-700/40 text-indigo-100 hover:bg-indigo-700/60 transition"
                  >
                    View Resume
                  </a>
                )}
              </div>
              <p className="mt-3 text-sm text-indigo-200/70">
                Pro tip: square avatar looks best. Resume will be stored on the server (Cloudinary).
              </p>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Field label="Full Name" name="name" value={profile.name} onChange={handleInputChange} />
              <Field label="Email Address" name="email" value={profile.email} onChange={handleInputChange} readOnly />
              <Field label="Title" name="title" value={profile.title} onChange={handleInputChange} />
              <Field label="Phone" name="phone" value={profile.phone} onChange={handleInputChange} />
              <Field label="Location" name="location" value={profile.location} onChange={handleInputChange} />
              <Field label="Experience (Years)" name="experience_years" value={profile.experience_years} onChange={handleInputChange} type="number" />
              <Field label="Total Projects" name="total_projects" value={profile.total_projects} onChange={handleInputChange} type="number" />
            </div>

            <div className="space-y-4">
              <Field label="Short Bio" name="short_bio" value={profile.short_bio} onChange={handleInputChange} textarea />
              <Field label="About Bio" name="about_bio" value={profile.about_bio} onChange={handleInputChange} textarea />
              <Field label="Bio" name="bio" value={profile.bio} onChange={handleInputChange} textarea />
              <Field label="Education" name="education" value={profile.education} onChange={handleInputChange} textarea />
              <Field label="Resume Link" name="resume_link" value={profile.resume_link} onChange={handleInputChange} />
            </div>
          </div>

          {/* Password */}
          <div className="mt-6">
            <h3 className="text-indigo-200 text-sm font-semibold mb-2">Change Password</h3>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (optional)"
              className="w-full bg-gradient-to-r from-slate-800/60 to-slate-800/40 border border-indigo-600/30 text-indigo-100 placeholder-indigo-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Save Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-lg shadow-2xl hover:scale-105 transition-transform"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Embedded CSS for animations (Tailwind + custom) */}
      <style>{`
        /* floating animations */
        @keyframes floatSlow {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.18; }
          50% { transform: translateY(-18px) translateX(6px); opacity: 0.26; }
          100% { transform: translateY(0px) translateX(0px); opacity: 0.18; }
        }
        @keyframes verticalMove {
          0% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(30%); opacity: 0.3; }
          100% { transform: translateY(0); opacity: 0.6; }
        }
        @keyframes pulseFast {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.4); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        @keyframes squareBounce {
          0% { transform: translateY(0) scale(1); opacity:0.9; }
          50% { transform: translateY(-8px) scale(1.05); opacity:0.6; }
          100% { transform: translateY(0) scale(1); opacity:0.9; }
        }
        @keyframes rotateSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .animate-vertical-move { animation: verticalMove 10s ease-in-out infinite; }
        .animate-pulse-fast { animation: pulseFast 1.6s ease-in-out infinite; }
        .animate-pulse { animation: pulseFast 2.4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulseFast 3s ease-in-out infinite; }
        .animate-square { animation: squareBounce 2.2s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotateSlow 30s linear infinite; }
        .direction-right { transform-origin: center; animation-direction: alternate; }

        /* small delays via classes */
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }

        /* make hidden file inputs accessible by labels we styled above */
        input[type="file"] + span { cursor: pointer; }
      `}</style>
    </div>
  );
}

// Reusable input/textarea component styled to project colors
function Field({ label, name, value, onChange, textarea, type = "text", readOnly = false }) {
  return (
    <div>
      <label className="text-indigo-200 text-sm font-semibold mb-2 block">
        {label}
      </label>
      {textarea ? (
        <Textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={label}
          readOnly={readOnly}
          className="w-full min-h-[90px] resize-none bg-gradient-to-r from-slate-800/60 to-slate-800/40 border border-indigo-600/30 text-indigo-100 placeholder-indigo-300 focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <Input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={label}
          readOnly={readOnly}
          className="w-full bg-gradient-to-r from-slate-800/60 to-slate-800/40 border border-indigo-600/30 text-indigo-100 placeholder-indigo-300 focus:ring-2 focus:ring-indigo-500"
        />
      )}
    </div>
  );
}
