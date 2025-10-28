// src/pages/Projects.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/api/projectApi";
import { Plus, Search, Edit3, Trash2, ArrowRightCircle, X } from "lucide-react";

/**
 * Admin Projects page with animated "stars + waves" background.
 * - Backend expectations:
 *   createProject(formData) -> expects field "image" for file
 *   updateProject(id, formData)
 *   getProjects() -> returns array of projects
 *
 * Paste into: src/pages/Projects.jsx
 */

const DEFAULT_PAGE_SIZE = 9;

function Badge({ children, className = "" }) {
  return (
    <span
      className={
        "inline-block text-xs px-2 py-0.5 rounded-full bg-white/6 text-slate-200 " +
        className
      }
    >
      {children}
    </span>
  );
}

function ProjectCard({ project, onEdit, onDelete }) {
  const techs = project.tech || [];
  return (
    <div className="bg-white/5 p-4 rounded-2xl shadow-sm border border-white/6 flex flex-col justify-between hover:scale-[1.02] transform transition">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white/95">{project.title || "Untitled Project"}</h3>
            <div className="text-xs text-slate-300 mt-1 line-clamp-3">{project.description || ""}</div>
          </div>
          <div className="text-right">
            <Badge className={project.status === "published" ? "bg-emerald-600/30" : "bg-yellow-600/20"}>
              {project.status || "draft"}
            </Badge>
            <div className="text-xs text-slate-400 mt-2">{new Date(project.createdAt || Date.now()).toLocaleDateString()}</div>
          </div>
        </div>

        {techs?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {techs.map((t, i) => (
              <span key={i} className="text-xs text-slate-200 bg-white/6 px-2 py-1 rounded-md">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm text-indigo-300 hover:underline">
              Live
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-sm text-slate-300 hover:underline">
              GitHub
            </a>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => onEdit(project)} className="p-2 rounded-md hover:bg-white/6 transition text-slate-200">
            <Edit3 size={16} />
          </button>
          <button onClick={() => onDelete(project)} className="p-2 rounded-md hover:bg-red-600/30 transition text-red-300">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Animated Background as internal component ---------- */
function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // stars
    const stars = Array.from({ length: Math.max(60, Math.floor(W / 15)) }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.6 + Math.random() * 1.6,
      alpha: 0.15 + Math.random() * 0.6,
      vy: 0.1 + Math.random() * 0.4,
    }));

    // floating shapes
    const shapes = Array.from({ length: 12 }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: 12 + Math.random() * 28,
      vx: -0.3 + Math.random() * 0.6,
      vy: -0.2 + Math.random() * 0.4,
      rot: Math.random() * Math.PI * 2,
      type: Math.random() > 0.5 ? "tri" : "square",
      opacity: 0.06 + Math.random() * 0.12,
    }));

    // subtle wave params
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // background gradient
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#04050a");
      g.addColorStop(1, "#071028");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // moving stars
      for (const s of stars) {
        s.y += s.vy;
        if (s.y > H + 10) s.y = -10;
        ctx.beginPath();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = "#ffffff";
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // faint wave overlay (sine)
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = "white";
      ctx.beginPath();
      const amp = 18;
      const freq = 0.0045;
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 10) {
        const y = H - 30 - Math.sin((x + t) * freq) * amp - Math.cos((x + t * 0.6) * freq * 1.5) * (amp / 3);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // shapes
      for (const sh of shapes) {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.rot += 0.002;
        if (sh.x < -100) sh.x = W + 100;
        if (sh.x > W + 100) sh.x = -100;
        if (sh.y < -100) sh.y = H + 100;
        if (sh.y > H + 100) sh.y = -100;

        ctx.save();
        ctx.translate(sh.x, sh.y);
        ctx.rotate(sh.rot);
        ctx.globalAlpha = sh.opacity;
        ctx.strokeStyle = "#8b5cf6"; // purple-ish
        ctx.lineWidth = 1;
        if (sh.type === "tri") {
          ctx.beginPath();
          ctx.moveTo(0, -sh.size / 1.2);
          ctx.lineTo(sh.size / 1.1, sh.size / 1.4);
          ctx.lineTo(-sh.size / 1.1, sh.size / 1.4);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.strokeRect(-sh.size / 2, -sh.size / 2, sh.size, sh.size);
        }
        ctx.restore();
      }

      t += 1;
      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full pointer-events-none" />;
}

/* -------------------- Main Projects component -------------------- */
export default function Projects() {
  // data + lists
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // controls
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // form
  const initialForm = {
    title: "",
    description: "",
    tech: [],
    liveUrl: "",
    github: "",
    status: "published",
    thumbnail: null,
  };
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  // fetch and normalize server shape -> front shape
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProjects();
      const list = Array.isArray(res) ? res : res?.data || [];
      const normalized = list.map((p) => ({
        id: p.id ?? p._id ?? p.project_id,
        title: p.title,
        description: p.description,
        tech: (p.tech_stack || p.tech || p.technologies || "")
          .toString()
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        github: p.github_link || p.github || p.repo || "",
        liveUrl: p.live_link || p.liveUrl || p.url || "",
        thumbnail: p.image_url || p.thumbnail || "",
        status: p.status || "published",
        createdAt: p.created_at || p.createdAt || p.createdAt,
      }));
      setProjects(normalized);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  // stats
  const stats = useMemo(() => {
    const total = projects.length;
    const published = projects.filter((p) => (p.status || "draft") === "published").length;
    const drafts = total - published;
    return { total, published, drafts };
  }, [projects]);

  // tech options
  const techOptions = useMemo(() => {
    const s = new Set();
    projects.forEach((p) => (p.tech || []).forEach((t) => t && s.add(t)));
    return Array.from(s).sort();
  }, [projects]);

  // filtering + search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter((p) => (statusFilter === "all" ? true : (p.status || "draft") === statusFilter))
      .filter((p) => (techFilter === "all" ? true : (p.tech || []).includes(techFilter)))
      .filter((p) => (q === "" ? true : (p.title || "").toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q)));
  }, [projects, query, statusFilter, techFilter]);

  const visible = filtered.slice(0, pageSize);
  const canLoadMore = filtered.length > visible.length;

  // handlers
  const openCreateModal = () => {
    setEditing(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditing(project);
    setForm({
      title: project.title || "",
      description: project.description || "",
      tech: project.tech || [],
      liveUrl: project.liveUrl || "",
      github: project.github || "",
      status: project.status || "draft",
      thumbnail: null,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete.id);
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      setShowDeleteConfirm(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  // form helpers
  const handleFormChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleTechToggle = (tech) => {
    setForm((f) => {
      const s = new Set(f.tech || []);
      if (s.has(tech)) s.delete(tech); else s.add(tech);
      return { ...f, tech: Array.from(s) };
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0] || null;
    handleFormChange("thumbnail", file);
  };

  // Save (create or update) - always send FormData so multer on backend can handle image
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (!form.title || !form.title.trim()) {
        alert("Title is required");
        setSaving(false);
        return;
      }

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description || "");
      // backend expects tech_stack
      fd.append("tech_stack", (form.tech || []).join(","));
      fd.append("github_link", form.github || "");
      fd.append("live_link", form.liveUrl || "");
      // append image file if present - backend expects "image"
      if (form.thumbnail) fd.append("image", form.thumbnail);

      let res;
      if (editing) {
        // update
        res = await updateProject(editing.id, fd);
      } else {
        // create
        res = await createProject(fd);
      }

      // refresh list (simple)
      await fetchProjects();

      setIsModalOpen(false);
      setEditing(null);
      setForm(initialForm);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Projects</h1>
            <div className="text-sm text-slate-400 mt-1">Manage portfolio projects — add, edit, publish, or remove.</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-300">
              <span className="font-semibold text-white mr-2">{stats.total}</span>Total
              <span className="mx-3 text-slate-400">•</span>
              <span className="font-semibold text-emerald-400 mr-1">{stats.published}</span>Published
              <span className="mx-3 text-slate-400">•</span>
              <span className="font-semibold text-yellow-300 mr-1">{stats.drafts}</span>Drafts
            </div>

            <button onClick={openCreateModal} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-95 transition">
              <Plus size={16} /> Add Project
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Search size={16} />
              </span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 border border-white/6 text-white/90" />
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-white/5 border border-white/6 text-white/90">
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-white/5 border border-white/6 text-white/90">
              <option value="all">All tech</option>
              {techOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <button onClick={fetchProjects} className="px-3 py-2 rounded-lg bg-white/6 text-white/90 hover:bg-white/10 transition">
              <ArrowRightCircle size={16} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-36 rounded-2xl bg-white/6 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {filtered.length === 0 ? (
                <div className="text-sm text-slate-300">No projects match your filters.</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visible.map((p) => (
                      <ProjectCard key={p.id} project={p} onEdit={openEditModal} onDelete={handleDeleteClick} />
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-center">
                    {canLoadMore ? (
                      <button onClick={() => setPageSize((s) => s + DEFAULT_PAGE_SIZE)} className="px-4 py-2 rounded-lg bg-white/6 text-white/90 hover:bg-white/10 transition">
                        Load more
                      </button>
                    ) : (
                      <div className="text-sm text-slate-400">No more projects</div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {error && <div className="text-sm text-red-300">Error: {error}</div>}

        {/* Add / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => { setIsModalOpen(false); setEditing(null); }} />
            <form onSubmit={handleSave} className="relative z-50 w-full max-w-2xl bg-slate-900 p-6 rounded-2xl border border-white/6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{editing ? "Edit Project" : "Add Project"}</h3>
                <button type="button" onClick={() => { setIsModalOpen(false); setEditing(null); }} className="p-2 rounded-md hover:bg-white/6">
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-slate-300">Title</label>
                  <input className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/6" value={form.title} onChange={(e) => handleFormChange("title", e.target.value)} />
                </div>

                <div>
                  <label className="text-sm text-slate-300">Status</label>
                  <select className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/6" value={form.status} onChange={(e) => handleFormChange("status", e.target.value)}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-slate-300">Description</label>
                  <textarea rows={4} className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/6" value={form.description} onChange={(e) => handleFormChange("description", e.target.value)} />
                </div>

                <div>
                  <label className="text-sm text-slate-300">Live URL</label>
                  <input className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/6" value={form.liveUrl} onChange={(e) => handleFormChange("liveUrl", e.target.value)} />
                </div>

                <div>
                  <label className="text-sm text-slate-300">GitHub URL</label>
                  <input className="w-full mt-1 p-2 rounded-md bg-white/5 border border-white/6" value={form.github} onChange={(e) => handleFormChange("github", e.target.value)} />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-slate-300">Technologies (click to toggle)</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {techOptions.map((t) => (
                      <button key={t} type="button" onClick={() => handleTechToggle(t)} className={`px-2 py-1 rounded-lg text-sm ${form.tech?.includes(t) ? "bg-indigo-600 text-white" : "bg-white/6 text-white/90"}`}>
                        {t}
                      </button>
                    ))}
                    <input
                      placeholder="Add tech (press Enter)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = e.target.value.trim();
                          if (!val) return;
                          handleFormChange("tech", Array.from(new Set([...(form.tech || []), val])));
                          e.target.value = "";
                        }
                      }}
                      className="px-2 py-1 rounded-lg bg-white/6 text-white/90"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-300">Thumbnail (optional)</label>
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="mt-1 text-sm text-slate-300" />
                  {editing && editing.thumbnail && <div className="text-xs mt-2 text-slate-400">Current: <a href={editing.thumbnail} target="_blank" rel="noreferrer" className="text-indigo-300 underline">view</a></div>}
                </div>

                <div className="flex items-end justify-end gap-2">
                  <button type="button" onClick={() => { setIsModalOpen(false); setEditing(null); }} className="px-4 py-2 rounded-lg bg-white/6 text-white/90">Cancel</button>
                  <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">
                    {saving ? "Saving..." : (editing ? "Save changes" : "Create project")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Delete confirm */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowDeleteConfirm(false)} />
            <div className="relative z-50 w-full max-w-md bg-slate-900 p-6 rounded-2xl border border-white/6">
              <h3 className="text-lg font-semibold">Delete project</h3>
              <p className="text-sm text-slate-300 mt-2">Are you sure you want to delete <span className="font-medium">{projectToDelete?.title}</span>? This action cannot be undone.</p>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-lg bg-white/6">Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
