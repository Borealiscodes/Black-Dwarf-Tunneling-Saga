/**
 * src/split-screen-renderer.js — Split-Screen Atomic Core Lattice (Left) & Full Star Lifecycle (Right) Renderer (Ledger 2)
 * Zero-flicker deep obsidian cosmos with WKB Coulomb barrier ring, crystalline lattice bonds,
 * Celestial Quantum Glyph strokes, and smooth macroscopic stellar evolution.
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { fromQ16 } from "./core.js";
import { PANE_W, PANE_H } from "./stellar-physics.js";

export function renderSplitScreenSaga(ctx, state) {
  const { width, height } = ctx.canvas;
  const act = state.actDef;

  // 1. Steady obsidian-indigo cosmic backdrop (zero flicker)
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "#030712");
  bg.addColorStop(0.5, "#090d16");
  bg.addColorStop(1, "#0f172a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // =========================================================================
  // LEFT PANE: ATOMIC & NUCLEAR LATTICE (0 .. 340 px)
  // =========================================================================
  ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
  ctx.fillRect(8, 8, PANE_W - 14, PANE_H - 16);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(8, 8, PANE_W - 14, PANE_H - 16);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 11px monospace";
  ctx.fillText("ATOMIC / NUCLEAR CORE (Q16.16)", 20, 28);

  const wkbPct = (fromQ16(state.wkbProbQ16) * 100).toFixed(2);
  ctx.fillStyle = "#94a3b8";
  ctx.font = "10px monospace";
  ctx.fillText(`T_WKB: ${wkbPct}%  |  CORE: ${act.coreTempKelvin}`, 20, 44);

  // Crystalline lattice bonds in White Dwarf / Black Dwarf Acts (Acts III-IV)
  if (state.actIndex === 2 || state.actIndex === 3) {
    ctx.strokeStyle = "rgba(99, 102, 241, 0.28)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < state.nuclei.length; i++) {
      const a = state.nuclei.at(i);
      const ax = fromQ16(a.xQ16);
      const ay = fromQ16(a.yQ16);
      if ((i % 3) < 2) {
        const b = state.nuclei.at(i + 1);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(fromQ16(b.xQ16), fromQ16(b.yQ16));
        ctx.stroke();
      }
      if (i + 3 < state.nuclei.length) {
        const c = state.nuclei.at(i + 3);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(fromQ16(c.xQ16), fromQ16(c.yQ16));
        ctx.stroke();
      }
    }
  }

  // Render atomic nuclei & Coulomb barrier rings
  for (const n of state.nuclei) {
    const nx = fromQ16(n.xQ16);
    const ny = fromQ16(n.yQ16);

    // Coulomb barrier potential ring around unfused nuclei
    if (!n.fused) {
      ctx.strokeStyle = state.actIndex === 3 ? "rgba(129, 140, 248, 0.55)" : "rgba(250, 204, 21, 0.35)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(nx, ny, 22, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Nucleus core color by Act & Fusion state
    let coreFill = "#fde047"; // Hydrogen / Helium plasma
    let label = state.actIndex === 0 ? "¹H" : state.actIndex === 1 ? "⁴He" : "¹²C";

    if (n.fused) {
      coreFill = "#34d399";
      label = state.actIndex === 0 ? "⁴He" : state.actIndex === 1 ? "¹²C" : "²⁴Mg";
    } else if (state.actIndex === 3) {
      coreFill = "#6366f1"; // Cold zero-point Carbon-12 nucleus
    }

    ctx.fillStyle = coreFill;
    ctx.beginPath();
    ctx.arc(nx, ny, n.fused ? 13 : 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#030712";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText(label, nx, ny + 3);
    ctx.textAlign = "left";
  }

  // Active Celestial Quantum Glyph Stroke on Left Pane
  if (state.brushStroke && state.brushStroke.length > 0) {
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    state.brushStroke.forEach((pt, idx) => {
      const px = fromQ16(pt.xQ16);
      const py = fromQ16(pt.yQ16);
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
  }

  // =========================================================================
  // RIGHT PANE: MACROSCOPIC STAR LIFECYCLE (340 .. 680 px)
  // =========================================================================
  const rx = PANE_W + 6;
  ctx.fillStyle = "rgba(9, 13, 22, 0.65)";
  ctx.fillRect(rx, 8, PANE_W - 14, PANE_H - 16);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(rx, 8, PANE_W - 14, PANE_H - 16);

  ctx.fillStyle = "#fde047";
  ctx.font = "bold 11px monospace";
  ctx.fillText("MACROSCOPIC STAR VIEW", rx + 12, 28);

  const lumPct = (fromQ16(state.luminosityQ16) * 100).toFixed(1);
  ctx.fillStyle = "#94a3b8";
  ctx.font = "10px monospace";
  ctx.fillText(`LUMINOSITY: ${lumPct}%  |  FUSIONS: ${state.fusionsCompleted}/${act.targetFusions}`, rx + 12, 44);

  const starCx = PANE_W + PANE_W * 0.5;
  const starCy = PANE_H * 0.54;
  const pulse = Math.sin(state.tick * 0.05) * (state.actIndex === 3 ? 0.5 : 3.5);
  const r = act.starRadius + pulse;

  // Background starfield dots in right pane
  ctx.fillStyle = "rgba(248, 250, 252, 0.45)";
  for (let s = 0; s < 18; s++) {
    const sx = rx + 18 + ((s * 67) % (PANE_W - 44));
    const sy = 64 + ((s * 89) % (PANE_H - 90));
    ctx.fillRect(sx, sy, 1.8, 1.8);
  }

  // Outer Stellar Corona / Nebula Halo
  const halo = ctx.createRadialGradient(starCx, starCy, r * 0.25, starCx, starCy, r * 1.85);
  halo.addColorStop(0, act.starHaloColor);
  halo.addColorStop(1, "rgba(3, 7, 18, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(starCx, starCy, r * 1.85, 0, Math.PI * 2);
  ctx.fill();

  // Act V Supernova Expanding Shockwave Ring
  const shockR = fromQ16(state.supernovaShockQ16);
  if (shockR > 0) {
    ctx.strokeStyle = "rgba(56, 189, 248, 0.72)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(starCx, starCy, shockR, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Stellar Body
  ctx.fillStyle = act.starCoreColor;
  ctx.beginPath();
  ctx.arc(starCx, starCy, Math.max(12, r), 0, Math.PI * 2);
  ctx.fill();

  // Black Dwarf obsidian rim highlight (Act IV)
  if (state.actIndex === 3) {
    ctx.strokeStyle = "#818cf8";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Timescale footer badge inside right pane
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  ctx.fillText(act.timescale, starCx, PANE_H - 22);
  ctx.textAlign = "left";
}
