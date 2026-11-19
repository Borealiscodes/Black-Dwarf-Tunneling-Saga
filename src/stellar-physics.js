/**
 * src/stellar-physics.js — Q16.16 WKB Quantum Tunneling, Mestel Cooling & Split-Screen Lattice Physics (Ledger 1)
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { toQ16, fromQ16, qAdd, qSub, qMul, sha256Hex } from "./core.js";
import { SAGA_ACTS } from "./saga-acts-data.js";

export const PANE_W = 340; // Each half of 680x440 split-screen canvas
export const PANE_H = 440;

/**
 * Deterministic Q16.16 WKB Quantum Tunneling Transmission Probability:
 * T_WKB = exp(-2 * pi * eta), where eta is the Sommerfeld Coulomb barrier parameter.
 * Returns Q16.16 probability scaled into [1 .. 65536].
 */
export function computeWkbTunnelingQ16(sommerfeldEta) {
  const eta = Math.max(0.1, Math.min(8.0, sommerfeldEta));
  const prob = Math.exp(-2 * Math.PI * eta * 0.28);
  return toQ16(Math.max(0.001, Math.min(1.0, prob)));
}

/**
 * Deterministic Mestel White-Dwarf Cooling Luminosity Ratio: L(tau) = (1 + tau)^(-7/5)
 */
export function computeMestelLuminosityQ16(normalizedAge) {
  const tau = Math.max(0, normalizedAge);
  const lum = Math.pow(1 + tau, -1.4);
  return toQ16(Math.max(0.01, Math.min(1.0, lum)));
}

function buildAtomicNucleiForAct(actIndex) {
  // 12 nuclei arranged in a crystalline / plasma core lattice inside the left pane (340x440)
  const cols = 3;
  const rows = 4;
  const nuclei = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const baseX = 78 + c * 92;
      const baseY = 92 + r * 86;
      nuclei.push({
        id: idx,
        baseXQ16: toQ16(baseX),
        baseYQ16: toQ16(baseY),
        xQ16: toQ16(baseX),
        yQ16: toQ16(baseY),
        fused: false,
        flashTicks: 0,
      });
    }
  }
  return nuclei;
}

export function createSagaState(actIndex = 0) {
  const idx = Math.max(0, Math.min(SAGA_ACTS.length - 1, actIndex | 0));
  const actDef = SAGA_ACTS.at(idx);

  return {
    tick: 0,
    actIndex: idx,
    actDef,
    fusionsCompleted: 0,
    totalQuantumTunnelEvents: 0,
    sommerfeldEta: idx === 3 ? 2.4 : 1.1,
    wkbProbQ16: computeWkbTunnelingQ16(idx === 3 ? 2.4 : 1.1),
    luminosityQ16: idx >= 2 ? computeMestelLuminosityQ16(idx * 2.5) : toQ16(1.0),
    nuclei: buildAtomicNucleiForAct(idx),
    brushStroke: null, // Active Celestial Glyph stroke in left pane
    lastGlyph: "NONE",
    supernovaShockQ16: idx === 4 ? toQ16(24) : 0,
  };
}

export function triggerNuclearFusionStep(state, targetNucleusId = null) {
  let fusedAny = false;
  const nextNuclei = state.nuclei.map((n) => {
    if (!fusedAny && !n.fused && (targetNucleusId === null || n.id === targetNucleusId)) {
      fusedAny = true;
      return { ...n, fused: true, flashTicks: 30 };
    }
    return n;
  });

  if (!fusedAny) return state;

  const fusionsCompleted = state.fusionsCompleted + 1;
  const isTunnelingAct = state.actIndex === 3;
  const totalQuantumTunnelEvents = state.totalQuantumTunnelEvents + (isTunnelingAct ? 1 : 0);

  // Lower Coulomb barrier slightly as lattice excites
  const nextEta = Math.max(0.5, state.sommerfeldEta - 0.25);
  const nextLuminosity =
    state.actIndex === 2
      ? computeMestelLuminosityQ16(fusionsCompleted * 2.2)
      : state.luminosityQ16;

  let nextState = {
    ...state,
    fusionsCompleted,
    totalQuantumTunnelEvents,
    sommerfeldEta: nextEta,
    wkbProbQ16: computeWkbTunnelingQ16(nextEta),
    luminosityQ16: nextLuminosity,
    nuclei: nextNuclei,
  };

  // Advance automatically to next cosmic Act when target fusions complete
  if (fusionsCompleted >= state.actDef.targetFusions && state.actIndex < SAGA_ACTS.length - 1) {
    const advanced = createSagaState(state.actIndex + 1);
    return {
      ...advanced,
      tick: state.tick,
      totalQuantumTunnelEvents,
      lastGlyph: state.lastGlyph,
    };
  }

  return nextState;
}

export function beginQuantumGlyph(state, x, y) {
  if (x > PANE_W) return state; // Glyphs are drawn on the Left Atomic Lattice pane
  return {
    ...state,
    brushStroke: [{ xQ16: toQ16(x), yQ16: toQ16(y) }],
  };
}

export function extendQuantumGlyph(state, x, y) {
  if (!state.brushStroke) return state;
  const clampedX = Math.max(12, Math.min(PANE_W - 12, x));
  const clampedY = Math.max(12, Math.min(PANE_H - 12, y));
  const last = state.brushStroke.at(-1);
  if (Math.hypot(clampedX - fromQ16(last.xQ16), clampedY - fromQ16(last.yQ16)) < 2) {
    return state;
  }
  return {
    ...state,
    brushStroke: [...state.brushStroke, { xQ16: toQ16(clampedX), yQ16: toQ16(clampedY) }],
  };
}

export function endQuantumGlyph(state) {
  if (!state.brushStroke || state.brushStroke.length < 5) {
    return { ...state, brushStroke: null };
  }

  const pts = state.brushStroke;
  const sx = fromQ16(pts.at(0).xQ16);
  const sy = fromQ16(pts.at(0).yQ16);
  const ex = fromQ16(pts.at(-1).xQ16);
  const ey = fromQ16(pts.at(-1).yQ16);
  const chord = Math.hypot(ex - sx, ey - sy);

  let pathLen = 0;
  for (let i = 1; i < pts.length; i++) {
    pathLen += Math.hypot(
      fromQ16(pts.at(i).xQ16) - fromQ16(pts.at(i - 1).xQ16),
      fromQ16(pts.at(i).yQ16) - fromQ16(pts.at(i - 1).yQ16)
    );
  }

  let detected = "SLASH";
  if (chord < 48 && pathLen > 120) detected = "CIRCLE";
  else if (chord / Math.max(1, pathLen) < 0.82) detected = "WAVE";

  const cleared = { ...state, brushStroke: null, lastGlyph: detected };
  // Any valid Celestial Quantum Glyph catalyzes a nuclear fusion / tunneling event!
  return triggerNuclearFusionStep(cleared, null);
}

export function stepSagaFrame(state) {
  const tick = state.tick + 1;

  // Thermal jitter amplitude shrinks dramatically from Act I (plasma) to Act IV (0.001 K black dwarf crystal)
  const jitterAmp = [7.5, 9.5, 2.5, 0.6, 14.0].at(state.actIndex) || 2.0;

  const nextNuclei = state.nuclei.map((n) => {
    const phase = tick * 0.08 + n.id * 1.7;
    const dx = Math.cos(phase) * jitterAmp;
    const dy = Math.sin(phase * 1.3) * jitterAmp;
    return {
      ...n,
      xQ16: qAdd(n.baseXQ16, toQ16(dx)),
      yQ16: qAdd(n.baseYQ16, toQ16(dy)),
      flashTicks: Math.max(0, n.flashTicks - 1),
    };
  });

  const supernovaShockQ16 =
    state.actIndex === 4
      ? toQ16(24 + ((tick * 1.4) % 135))
      : 0;

  return {
    ...state,
    tick,
    nuclei: nextNuclei,
    supernovaShockQ16,
  };
}

export function buildCosmicReceipt(state) {
  const payload = {
    schema: "ndh.black.dwarf.tunneling.saga.v1",
    act: state.actIndex + 1,
    actSlug: state.actDef.slug,
    timescale: state.actDef.timescale,
    tick: state.tick,
    fusionsCompleted: state.fusionsCompleted,
    quantumTunnelEvents: state.totalQuantumTunnelEvents,
    wkbProbQ16: state.wkbProbQ16,
    vmVexStatus: "DORMANT_AND_SEALED",
  };
  return {
    ...payload,
    sha256: sha256Hex(JSON.stringify(payload)),
  };
}
