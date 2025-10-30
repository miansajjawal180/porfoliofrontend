import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, setAuthToken } from "../services/Api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      // Save token
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-800 px-4">
      <div className="bg-[#1E1B4B]/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md text-white border border-indigo-700">
        <h1 className="text-3xl font-extrabold mb-6 text-center tracking-wide">
          Admin Login
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg mb-4 border border-red-400/30 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              autoFocus
              className="w-full px-4 py-3 rounded-lg bg-[#0F172A] text-gray-100 placeholder-gray-400 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-[#0F172A] text-gray-100 placeholder-gray-400 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 font-semibold hover:from-purple-600 hover:to-blue-500 transition-all duration-300 shadow-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          © {new Date().getFullYear()} MSDEV Admin Panel
        </p>
      </div>
    </div>
  );
}
