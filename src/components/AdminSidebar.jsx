import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  User,
  LogOut,
  Menu,
  Image as ShowcaseIcon,
  Link as SocialIcon,
  FileText as BlogsIcon,
  Code as SkillsIcon,
  Briefcase as ServicesIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Projects", icon: <FolderKanban size={20} />, path: "/admin/projects" },
    { name: "Blogs", icon: <BlogsIcon size={20} />, path: "/admin/blogs" },
    { name: "Skills", icon: <SkillsIcon size={20} />, path: "/admin/skills" },
    { name: "Services", icon: <ServicesIcon size={20} />, path: "/admin/services" },
    { name: "Messages", icon: <Mail size={20} />, path: "/admin/messages" },
    { name: "Profile", icon: <User size={20} />, path: "/admin/profile" },
    { name: "Social Links", icon: <SocialIcon size={20} />, path: "/admin/social-links" },
    { name: "Showcase", icon: <ShowcaseIcon size={20} />, path: "/admin/showcase" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col w-64 
        bg-gradient-to-b from-gray-950 via-indigo-950 to-black 
        border-r border-indigo-700/30 shadow-2xl`}
      >
        <div className="p-5 text-2xl font-bold text-indigo-400 tracking-wide border-b border-white/10">
          MSDEV
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg scale-[1.02]"
                  : "text-gray-300 hover:bg-gradient-to-r hover:from-indigo-600/30 hover:to-blue-500/20 hover:text-white"
              }`}
            >
              <span className="text-indigo-400 group-hover:text-white transition">
                {item.icon}
              </span>
              <span className="tracking-wide">{item.name}</span>
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full mt-6 px-4 py-3 rounded-lg 
            text-gray-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-700 hover:text-white 
            transition-all duration-300"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-sm md:hidden transition 
          ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 w-64 h-full 
        bg-gradient-to-b from-gray-950 via-indigo-950 to-black 
        border-r border-indigo-700/30 p-4 md:hidden transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-indigo-400">MSDEV</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <Menu size={24} className="text-white" />
          </button>
        </div>

        <nav className="space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gradient-to-r hover:from-indigo-600/30 hover:to-blue-500/20 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-indigo-400 group-hover:text-white transition">
                {item.icon}
              </span>
              <span className="tracking-wide">{item.name}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full mt-6 px-4 py-3 rounded-lg 
            text-gray-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-700 hover:text-white 
            transition-all duration-300"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
