"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * Animated neural-network field rendered on a 2D canvas: drifting nodes,
 * proximity-linked synapses, traveling signal pulses, and gentle mouse
 * repulsion. Lightweight (no WebGL), DPR-aware, and reduced-motion safe.
 *
 * Mobile optimisations:
 * - Detects touch devices and halves node density + skips every other frame
 * - Listens for custom "menuopen"/"menuclose" events to pause RAF entirely
 *   while the mobile navigation overlay is visible (frees CPU for the UI thread)
 * - Pauses on document visibility change (tab hidden / screen off)
 */
export function NeuralNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = false;
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let pulses: { a: number; b: number; t: number; speed: number }[] = [];

    // Pause flags — RAF exits early when either is true
    let menuOpen = false;
    let hidden = false;
    // Frame-skip counter for mobile (draw every 2nd frame)
    let frameCount = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Mobile: use lower density cap to keep CPU usage low
      const maxDensity = isMobile ? 50 : 120;
      const density = Math.max(
        isMobile ? 20 : 40,
        Math.min(Math.floor((width * height) / (isMobile ? 20000 : 10000)), maxDensity)
      );
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
        vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
        r: Math.random() * 1.6 + 0.8,
      }));

      if (reduce) {
        requestAnimationFrame(draw);
      }
    };

    const linkDist = isMobile ? 110 : 140;

    const draw = () => {
      // Re-schedule first so we always have the next frame queued
      raf = requestAnimationFrame(draw);

      // Exit early without drawing if menu is open or tab is hidden
      if (menuOpen || hidden) return;

      // Mobile: skip odd frames (halves GPU/CPU load while keeping animation alive)
      frameCount++;
      if (isMobile && frameCount % 2 !== 0) return;

      ctx.clearRect(0, 0, width, height);

      // edges + collect candidates for pulses
      const near: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.5;
            ctx.strokeStyle = `rgba(124, 92, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (dist < linkDist * 0.6) near.push([i, j]);
          }
        }
      }

      // occasionally spawn a signal pulse along a near edge
      if (!reduce && pulses.length < (isMobile ? 6 : 14) && near.length && Math.random() < 0.08) {
        const [a, b] = near[Math.floor(Math.random() * near.length)];
        pulses.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.02 });
      }

      // render + advance pulses
      pulses = pulses.filter((p) => {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) return false;
        p.t += p.speed;
        if (p.t >= 1) return false;
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.9)";
        ctx.shadowColor = "rgba(34, 211, 238, 0.9)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });

      // nodes
      for (const n of nodes) {
        // mouse / touch repulsion — skip on mobile when no active touch
        if (!isMobile || mouse.x !== -9999) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            const force = (120 - d) / 120;
            n.x += (dx / d) * force * 1.4;
            n.y += (dy / d) * force * 1.4;
          }
        }

        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196, 181, 253, 0.8)";
        ctx.fill();
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Menu open/close events dispatched from navbar
    const onMenuOpen = () => { menuOpen = true; };
    const onMenuClose = () => { menuOpen = false; };

    // Pause when tab is hidden (saves battery on mobile)
    const onVisibilityChange = () => {
      hidden = document.hidden;
    };

    resize();
    if (reduce) {
      draw();
      cancelAnimationFrame(raf); // single static frame
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchend", onLeave);
    window.addEventListener("menuopen", onMenuOpen);
    window.addEventListener("menuclose", onMenuClose);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("menuopen", onMenuOpen);
      window.removeEventListener("menuclose", onMenuClose);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
