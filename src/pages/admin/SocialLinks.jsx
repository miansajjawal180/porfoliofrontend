import React, { useEffect, useState } from "react";
import {
  getAllSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../../services/api/socialApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "",
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const data = await getAllSocialLinks();
      setSocialLinks(data);
    } catch (err) {
      console.error("Failed to fetch social links:", err);
      toast.error("Failed to load social links");
    }
    setLoading(false);
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLink) {
        await updateSocialLink(editingLink.id, formData);
        toast.success("Social link updated!");
      } else {
        await createSocialLink(formData);
        toast.success("Social link created!");
      }
      setOpenDialog(false);
      setEditingLink(null);
      setFormData({ platform: "", url: "", icon: "" });
      fetchLinks();
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Error saving link");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this link?")) return;
    try {
      await deleteSocialLink(id);
      toast.success("Deleted successfully");
      fetchLinks();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  const openEditDialog = (link) => {
    setEditingLink(link);
    setFormData({
      platform: link.platform,
      url: link.url,
      icon: link.icon,
    });
    setOpenDialog(true);
  };

  return (
    <div className="relative overflow-hidden min-h-screen p-6 space-y-6 bg-[#050510] text-white">

      {/* ✨ Animated Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(90,0,160,0.15),_transparent_60%)]"></div>
      <div className="absolute inset-0 animate-[moveStars_120s_linear_infinite] opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-purple-800/30 to-transparent animate-[waveMove_8s_ease-in-out_infinite]"></div>

      <style>
        {`
        @keyframes moveStars {
          from { background-position: 0 0; }
          to { background-position: -10000px 5000px; }
        }
        @keyframes waveMove {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
        `}
      </style>

      {/* 🧭 Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center relative z-10"
      >
        <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Social Links
        </h1>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingLink(null);
                setFormData({ platform: "", url: "", icon: "" });
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90"
            >
              <PlusCircle size={18} /> Add Link
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-neutral-900 border border-neutral-700">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingLink ? "Edit Link" : "Add New Link"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Input
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                placeholder="Platform (e.g. GitHub, LinkedIn)"
                required
              />
              <Input
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="URL"
                required
              />
              <Input
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="Icon class or URL (optional)"
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
                >
                  {editingLink ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* 💫 Cards Section */}
      {loading ? (
        <p className="text-gray-400 relative z-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {socialLinks.length > 0 ? (
            socialLinks.map((link) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 border border-neutral-700 text-white shadow-lg backdrop-blur-xl transition-transform hover:scale-105 hover:shadow-purple-500/30">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>{link.platform}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(link)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(link.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate text-sm">{link.url}</p>
                    {link.icon && (
                      <p className="text-xs text-gray-400 mt-1">
                        Icon: {link.icon}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Created: {new Date(link.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">No links found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
