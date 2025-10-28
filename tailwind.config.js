/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 🌈 Animated gradient background
      keyframes: {
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        gradientMove: "gradientMove 10s ease infinite",
      },

      // 🎨 Color & shadow customizations (matches your futuristic theme)
      colors: {
        darkPurple: "#1a0034",
        deepBlue: "#0A043C",
        accentBlue: "#3b82f6",
      },
      boxShadow: {
        "neon-blue": "0 0 15px rgba(59,130,246,0.6)",
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // for smooth animations (used by ShadCN)
  ],
};
