// src/components/Navbar.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Services", link: "/services" },
    { name: "Skills", link: "/skills" },
    { name: "Blogs", link: "/blogs" }, // changed from "Resume" to "Blogs"
    { name: "Portfolio", link: "/portfolio" },
  ];

  const rightItems = [{ name: "Login", link: "/login" }];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] shadow-2xl text-white border-b border-white/10 m-0 p-0">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text hover:scale-110 transition-transform duration-300">
          <Link to="/">MSDEV</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center w-full">
          <ul className="flex gap-10 ml-16">
            {navItems.map((item) => (
              <li key={item.name} className="relative group cursor-pointer">
                <Link
                  to={item.link}
                  className="font-medium text-gray-300 hover:text-white transition duration-300 text-lg"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Right Side (Login) */}
          <ul className="flex gap-8 ml-auto">
            {rightItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className="px-5 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/40"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-white/10"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-5 bg-gradient-to-b from-[#1e1b4b] to-[#312e81] px-6 py-5 shadow-lg">
          {navItems.concat(rightItems).map((item) => (
            <li
              key={item.name}
              className="hover:text-indigo-300 transition-colors duration-300 cursor-pointer text-lg"
            >
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
