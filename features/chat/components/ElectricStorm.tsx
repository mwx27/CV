"use client";

import { useEffect, useRef } from "react";

// A full-window "electric storm" intro. Bolts burst in from the window edges and
// gather onto the chat launcher (bottom-right); when it lands, onComplete fires —
// the caller uses that to open the chat. One-shot per mount.

// Palette mirrors the launcher's resting arcs (ChatLauncherButton).
const STROKE = "#eaffff";
const GLOW_BLUE = "#3b82f6";
const GLOW_CYAN = "#67e8f9";

// The launcher sits at `fixed bottom-5 right-5` and the button is 56px wide, so
// its centre is 20 + 28 = 48px in from the bottom-right corner.
const TARGET_INSET = 48;

type Pt = { x: number; y: number };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInCubic = (t: number) => t * t * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const rand = (min: number, max: number) => min + Math.random() * (max - min);

// A jagged lightning polyline via midpoint displacement. Regenerated every
// frame so the bolt jitters like a live arc.
function boltPoints(x1: number, y1: number, x2: number, y2: number): Pt[] {
  const out: Pt[] = [{ x: x1, y: y1 }];
  const build = (p1: Pt, p2: Pt, d: number) => {
    if (d < 4) {
      out.push(p2);
      return;
    }
    const mid = {
      x: (p1.x + p2.x) / 2 + rand(-d, d),
      y: (p1.y + p2.y) / 2 + rand(-d, d),
    };
    build(p1, mid, d / 2);
    build(mid, p2, d / 2);
  };
  build({ x: x1, y: y1 }, { x: x2, y: y2 }, Math.hypot(x2 - x1, y2 - y1) * 0.12);
  return out;
}

// Three stacked strokes (wide blue glow → cyan → white core) for the neon look.
function strokeBolt(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  alpha: number,
  width: number,
) {
  if (pts.length < 2 || alpha <= 0) return;
  ctx.globalAlpha = clamp01(alpha);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);

  ctx.strokeStyle = GLOW_BLUE;
  ctx.shadowColor = GLOW_BLUE;
  ctx.shadowBlur = 16;
  ctx.lineWidth = width * 2.2;
  ctx.stroke();

  ctx.strokeStyle = GLOW_CYAN;
  ctx.shadowColor = GLOW_CYAN;
  ctx.shadowBlur = 8;
  ctx.lineWidth = width * 1.2;
  ctx.stroke();

  ctx.strokeStyle = STROKE;
  ctx.shadowBlur = 0;
  ctx.lineWidth = Math.max(0.8, width * 0.6);
  ctx.stroke();
}

// A soft radial glow used to "land" the storm on the button.
function drawBloom(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  alpha: number,
) {
  if (alpha <= 0) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(190,247,255,${alpha})`);
  g.addColorStop(0.4, `rgba(103,232,249,${alpha * 0.5})`);
  g.addColorStop(1, "rgba(59,130,246,0)");
  ctx.globalAlpha = 1;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function edgePoint(w: number, h: number): Pt {
  switch (Math.floor(rand(0, 4))) {
    case 0:
      return { x: rand(0, w), y: -12 };
    case 1:
      return { x: w + 12, y: rand(0, h) };
    case 2:
      return { x: rand(0, w), y: h + 12 };
    default:
      return { x: -12, y: rand(0, h) };
  }
}

type Scene = { duration: number; draw: (ctx: CanvasRenderingContext2D, t: number) => void };

// The storm: bolts strike inward from the window edges onto points scattered
// around the button's rim, then their far ends retract into it while the rim
// crackles — the geometry literally points the eye at the launcher.
function buildScene(w: number, h: number, tx: number, ty: number): Scene {
  const starts = Array.from({ length: 7 }, () => {
    const e = edgePoint(w, h);
    const ang = rand(0, Math.PI * 2);
    // Land on the button's rim (it's 56px wide → radius 28), spread by angle.
    const r = rand(26, 29);
    return { x: e.x, y: e.y, lx: tx + Math.cos(ang) * r, ly: ty + Math.sin(ang) * r };
  });
  return {
    duration: 1200,
    draw: (ctx, t) => {
      starts.forEach((s, i) => {
        let sx = s.x;
        let sy = s.y;
        let a: number;
        let width = 1.4;
        if (t < 150) {
          a = easeOutCubic(t / 150);
        } else if (t < 600) {
          a = 0.85 + 0.15 * Math.sin((t + i * 90) / 35);
        } else {
          const p = easeInCubic(clamp01((t - 600) / 600));
          sx = lerp(s.x, s.lx, p);
          sy = lerp(s.y, s.ly, p);
          a = 1 - p;
          width = lerp(1.4, 0.6, p);
        }
        strokeBolt(ctx, boltPoints(sx, sy, s.lx, s.ly), a, width);
      });
      // The rim crackles from the start — short arcs chasing around the
      // button's edge for the whole storm.
      const RIM_R = 28;
      const segs = 11;
      for (let k = 0; k < segs; k++) {
        const flick = Math.sin(t / 28 + k * 1.7) > 0.05 ? 1 : 0.2;
        const a0 = (k / segs) * Math.PI * 2 + t / 350;
        const x1 = tx + Math.cos(a0) * RIM_R;
        const y1 = ty + Math.sin(a0) * RIM_R;
        const x2 = tx + Math.cos(a0 + 0.55) * RIM_R;
        const y2 = ty + Math.sin(a0 + 0.55) * RIM_R;
        strokeBolt(ctx, boltPoints(x1, y1, x2, y2), flick * 0.9, 2.2);
      }
      const land = t > 600 ? easeInCubic(clamp01((t - 600) / 600)) : 0;
      drawBloom(ctx, tx, ty, 30 + 45 * land, 0.55 * land);
    },
  };
}

export function ElectricStorm({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Keep the callback in a ref so the rAF effect runs exactly once per mount.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const finish = () => onCompleteRef.current();

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      finish();
      return;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const scene = buildScene(w, h, w - TARGET_INSET, h - TARGET_INSET);

    let raf = 0;
    let start = 0;
    let done = false;
    const frame = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      scene.draw(ctx, t);
      if (t >= scene.duration) {
        if (!done) {
          done = true;
          finish();
        }
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="no-print pointer-events-none fixed left-0 top-0 z-[60]"
    />
  );
}
