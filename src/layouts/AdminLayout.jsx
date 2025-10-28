import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout({ children, pageTitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen text-white 
      bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#1E3A8A]
      overflow-hidden"
    >
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Section */}
      <div className="flex flex-col flex-1 relative">
        {/* Header */}
        <AdminHeader
          setSidebarOpen={setSidebarOpen}
          pageTitle={pageTitle}
        />

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto p-6 
          bg-white/5 backdrop-blur-sm 
          border-t border-white/10 
          shadow-inner scroll-smooth"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
