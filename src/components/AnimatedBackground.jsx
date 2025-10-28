import React, { useEffect, useRef } from "react";

/**
 * Animated background: stars, floating lines, triangles
 * Smooth GPU-friendly animation using canvas.
 * Works perfectly with Tailwind dark themes.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // ✨ Star objects
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.3,
      opacity: 0.3 + Math.random() * 0.7,
    }));

    // 🟣 Triangles and squares
    const shapes = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 8 + Math.random() * 16,
      speedX: -0.5 + Math.random(),
      speedY: -0.5 + Math.random(),
      type: Math.random() > 0.5 ? "triangle" : "square",
      rotation: Math.random() * Math.PI * 2,
    }));

    function drawStar(s) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
      ctx.fill();
    }

    function drawShape(sh) {
      ctx.save();
      ctx.translate(sh.x, sh.y);
      ctx.rotate(sh.rotation);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (sh.type === "triangle") {
        ctx.moveTo(0, -sh.size);
        ctx.lineTo(sh.size, sh.size);
        ctx.lineTo(-sh.size, sh.size);
        ctx.closePath();
      } else {
        ctx.rect(-sh.size / 2, -sh.size / 2, sh.size, sh.size);
      }
      ctx.stroke();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // faint gradient bg
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0f172a"); // dark slate
      gradient.addColorStop(1, "#1e293b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // stars
      stars.forEach((s) => {
        s.y += s.speed;
        if (s.y > height) s.y = 0;
        drawStar(s);
      });

      // shapes
      shapes.forEach((sh) => {
        sh.x += sh.speedX;
        sh.y += sh.speedY;
        sh.rotation += 0.002;
        if (sh.x < -50) sh.x = width + 50;
        if (sh.y < -50) sh.y = height + 50;
        if (sh.x > width + 50) sh.x = -50;
        if (sh.y > height + 50) sh.y = -50;
        drawShape(sh);
      });

      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
    />
  );
}
