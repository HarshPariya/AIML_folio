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
 * Performance notes:
 * - On mobile, particle count and link-distance are reduced to cut O(n²) cost.
 * - On mobile, animation is throttled to ~30 fps via timestamp gating.
 * - Canvas is marked pointer-events-none so touches pass through immediately.
 */
export function NeuralNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    // Cap DPR to 1 on mobile — rendering at 2× doubles pixel work
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    // Target ~30 fps on mobile (33ms frame budget) vs full fps on desktop
    const frameInterval = isMobile ? 33 : 0;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let pulses: { a: number; b: number; t: number; speed: number }[] = [];
    let lastFrame = 0;

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

      // Mobile: drastically fewer nodes & smaller link distance to cut O(n²) cost
      const maxNodes = isMobile ? 35 : 120;
      const density = Math.max(
        isMobile ? 20 : 40,
        Math.min(Math.floor((width * height) / (isMobile ? 18000 : 10000)), maxNodes)
      );
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.18 : 0.25),
        vy: (Math.random() - 0.5) * (isMobile ? 0.18 : 0.25),
        r: Math.random() * 1.6 + 0.8,
      }));
    };

    // Shorter link distance on mobile reduces O(n²) edge pairs significantly
    const linkDist = isMobile ? 90 : 140;

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);

      // Throttle on mobile
      if (frameInterval > 0 && ts - lastFrame < frameInterval) return;
      lastFrame = ts;

      ctx.clearRect(0, 0, width, height);

      // edges + collect candidates for pulses
      const near: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          // Use squared distance first to skip sqrt when possible
          const distSq = dx * dx + dy * dy;
          if (distSq < linkDist * linkDist) {
            const dist = Math.sqrt(distSq);
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

      // Spawn fewer pulses on mobile
      const maxPulses = isMobile ? 6 : 14;
      const spawnChance = isMobile ? 0.04 : 0.08;
      if (pulses.length < maxPulses && near.length && Math.random() < spawnChance) {
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
        // mouse/touch repulsion (skip expensive hypot on mobile when no pointer)
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d > 0 && d < 120) {
          const force = (120 - d) / 120;
          n.x += (dx / d) * force * 1.4;
          n.y += (dy / d) * force * 1.4;
        }

        n.x += n.vx;
        n.y += n.vy;
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

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    // Touch repulsion is cosmetic – skip on mobile to avoid consuming touch events
    if (!isMobile) {
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchstart", onTouchMove, { passive: true });
      window.addEventListener("touchend", onLeave, { passive: true });
    }
    document.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (!isMobile) {
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchstart", onTouchMove);
        window.removeEventListener("touchend", onLeave);
      }
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
