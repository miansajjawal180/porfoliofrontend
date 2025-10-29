import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// ✅ Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Skills from "./pages/Skills";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";

// ✅ Admin Layout + Pages
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Projects from "./pages/admin/Projects";
import Messages from "./pages/admin/Messages";
import Profile from "./pages/admin/Profile";
import AdminBlogs from "./pages/admin/AdminBlogs.jsx";
import SocialLinks from "./pages/admin/SocialLinks";
import ShowcaseAdmin from "./pages/admin/showcaseAdmin";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminServices from "./pages/admin/AdminServices";

// ✅ Auth Helper
import { getToken } from "./utils/auth";

const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      {/* ✅ Public Routes */}
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div className="min-h-screen bg-[#0F172A]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogs/:id" element={<BlogDetails />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </>
          }
        />

        {/* ✅ Admin Routes (Protected by JWT) */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route
                  path="dashboard"
                  element={
                    <AdminLayout pageTitle="Dashboard">
                      <Dashboard />
                    </AdminLayout>
                  }
                />
                <Route
                  path="projects"
                  element={
                    <AdminLayout pageTitle="Projects">
                      <Projects />
                    </AdminLayout>
                  }
                />
                <Route
                  path="skills"
                  element={
                    <AdminLayout pageTitle="Skills">
                      <AdminSkills />
                    </AdminLayout>
                  }
                />
                <Route
                  path="services"
                  element={
                    <AdminLayout pageTitle="Services">
                      <AdminServices />
                    </AdminLayout>
                  }
                />
                <Route
                  path="messages"
                  element={
                    <AdminLayout pageTitle="Messages">
                      <Messages />
                    </AdminLayout>
                  }
                />
                <Route
                  path="blogs"
                  element={
                    <AdminLayout pageTitle="Blogs">
                      <AdminBlogs />
                    </AdminLayout>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <AdminLayout pageTitle="Profile">
                      <Profile />
                    </AdminLayout>
                  }
                />
                <Route
                  path="social-links"
                  element={
                    <AdminLayout pageTitle="Social Links">
                      <SocialLinks />
                    </AdminLayout>
                  }
                />
                <Route
                  path="showcase"
                  element={
                    <AdminLayout pageTitle="Showcase">
                      <ShowcaseAdmin />
                    </AdminLayout>
                  }
                />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
