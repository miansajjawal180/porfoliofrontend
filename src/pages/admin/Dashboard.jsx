import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Layers,
  Wrench,
  Star,
  FileText,
  Briefcase,
} from "lucide-react";
import ChatBot from "../../components/Chatbot";

// 🧩 API imports
import { getProjects } from "../../services/api/projectApi";
import { fetchShowcase } from "../../services/api/showcaseApi";
import { fetchPublicServices } from "../../services/api/servicesApi";
import { fetchAllSkills } from "../../services/api/skillsApi";
import { fetchAllBlogs } from "../../services/api/blogApi";
import { getMessages } from "../../services/api/messageApi";
import { getToken } from "../../utils/auth";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [showcases, setShowcases] = useState([]);
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // 🧠 Fetch all dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();

        const [
          projectsData,
          showcasesData,
          servicesData,
          skillsData,
          blogsData,
          messagesData,
        ] = await Promise.all([
          getProjects(),
          fetchShowcase(),
          fetchPublicServices(),
          fetchAllSkills(),
          fetchAllBlogs(),
          getMessages(token),
        ]);

        // ✅ Universal data extractor
        const extractData = (res) => {
          if (!res) return [];
          if (Array.isArray(res)) return res;
          if (res.data && Array.isArray(res.data)) return res.data;
          if (res.blogs && Array.isArray(res.blogs)) return res.blogs;
          if (res.skills && Array.isArray(res.skills)) return res.skills;
          if (res.messages && Array.isArray(res.messages)) return res.messages;
          return [];
        };

        setProjects(extractData(projectsData));
        setShowcases(extractData(showcasesData));
        setServices(extractData(servicesData));
        setSkills(extractData(skillsData));
        setBlogs(extractData(blogsData));
        setMessages(extractData(messagesData));
      } catch (error) {
        console.error("❌ Error loading dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 Dashboard summary cards
  const cards = [
    { title: "Projects", count: projects.length, icon: <Briefcase />, route: "/admin/projects" },
    { title: "Showcases", count: showcases.length, icon: <Layers />, route: "/admin/showcase" },
    { title: "Services", count: services.length, icon: <Wrench />, route: "/admin/services" },
    { title: "Skills", count: skills.length, icon: <Star />, route: "/admin/skills" },
    { title: "Blogs", count: blogs.length, icon: <FileText />, route: "/admin/blogs" },
    { title: "Messages", count: messages.length, icon: <MessageSquare />, route: "/admin/messages" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0b001a] via-[#1a0033] to-[#000033] text-white relative">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => (
          <Card
            key={card.title}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-600/30 hover:scale-105 transition-transform shadow-2xl rounded-2xl backdrop-blur-sm"
          >
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-lg font-medium">{card.title}</p>
                <h2 className="text-3xl font-bold">{card.count}</h2>
              </div>
              <div className="text-purple-400">{card.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Data Sections */}
      <div className="space-y-10">
        <SectionList
          title="Recent Projects"
          data={projects}
          keys={["title", "description"]}
          route="/admin/projects"
          navigate={navigate}
        />
        <SectionList
          title="Showcases"
          data={showcases}
          keys={["title", "category"]}
          route="/admin/showcase"
          navigate={navigate}
        />
        <SectionList
          title="Services"
          data={services}
          keys={["title", "description"]}
          route="/admin/services"
          navigate={navigate}
        />
        <SectionList
          title="Skills"
          data={skills}
          keys={["name", "level"]}
          route="/admin/skills"
          navigate={navigate}
          showImageKey="icon_url" // ✅ Add icon preview
        />
        <SectionList
          title="Blogs"
          data={blogs}
          keys={["title", "author"]}
          route="/admin/blogs"
          navigate={navigate}
          showImageKey="image_url" // ✅ Add image preview
        />
        <SectionList
          title="Recent Messages"
          data={messages}
          keys={["name", "email"]}
          route="/admin/messages"
          navigate={navigate}
        />
      </div>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}

// 🔹 Section List Component
const SectionList = ({ title, data, keys, route, navigate, showImageKey }) => {
  const safeData = Array.isArray(data) ? data.slice(0, 5) : [];

  return (
    <Card className="bg-[#120033]/60 border border-purple-700/30 shadow-md rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-purple-300">{title}</h3>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
            onClick={() => navigate(route)}
          >
            View All
          </Button>
        </div>

        <div className="space-y-2">
          {safeData.length === 0 ? (
            <p className="text-gray-400 text-sm">No data available.</p>
          ) : (
            safeData.map((item) => (
              <div
                key={item.id || item[keys[0]] || crypto.randomUUID()}
                onClick={() => navigate(route)}
                className="flex items-center justify-between bg-purple-500/10 p-3 rounded-xl hover:bg-purple-600/20 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {showImageKey && item[showImageKey] && (
                    <img
                      src={item[showImageKey]}
                      alt="icon"
                      className="w-8 h-8 rounded-md object-cover border border-purple-400/30"
                    />
                  )}
                  <span>{item[keys[0]] || "—"}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {item[keys[1]] || ""}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
