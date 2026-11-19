/**
 * src/saga-app.js — 5-Act 10 Septillion Year Stellar Lifecycle & Quantum Tunneling Controller
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { fromQ16 } from "./core.js";
import { SAGA_ACTS } from "./saga-acts-data.js";
import {
  PANE_W,
  PANE_H,
  createSagaState,
  triggerNuclearFusionStep,
  beginQuantumGlyph,
  extendQuantumGlyph,
  endQuantumGlyph,
  stepSagaFrame,
  buildCosmicReceipt,
} from "./stellar-physics.js";
import { createAmbientTechnoAudio } from "./ambient-techno-audio.js";
import { renderSplitScreenSaga } from "./split-screen-renderer.js";

const FIXED_DT_MS = 1000 / 60;

function initBlackDwarfSaga() {
  const canvas = document.getElementById("saga-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const audio = createAmbientTechnoAudio();

  const actTitleEl = document.getElementById("act-title");
  const actReactionEl = document.getElementById("act-reaction");
  const actPromptEl = document.getElementById("act-prompt");
  const vmWhisperEl = document.getElementById("vm-whisper");
  const tunnelHudEl = document.getElementById("hud-tunnel");
  const audioBtn = document.getElementById("btn-audio");
  const receiptBox = document.getElementById("receipt-output");

  let state = createSagaState(0);

  const syncHud = () => {
    const act = state.actDef;
    if (actTitleEl) actTitleEl.textContent = `${act.title} • ${act.timescale}`;
    if (actReactionEl) actReactionEl.textContent = act.reaction;
    if (actPromptEl) actPromptEl.textContent = act.glyphPrompt;
    if (vmWhisperEl) vmWhisperEl.textContent = act.vmWhisper;
    if (tunnelHudEl) {
      tunnelHudEl.textContent = `Act ${state.actIndex + 1}/5 • Quantum Tunnel Events: ${state.totalQuantumTunnelEvents}`;
    }
    audio.setAct(state.actIndex);
  };

  syncHud();

  const toCanvasCoords = (ev) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((ev.clientX - rect.left) / rect.width) * (PANE_W * 2),
      y: ((ev.clientY - rect.top) / rect.height) * PANE_H,
    };
  };

  canvas?.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();
    canvas.setPointerCapture?.(ev.pointerId);
    const { x, y } = toCanvasCoords(ev);

    // Check if user tapped directly on an atomic nucleus in the Left Pane
    if (x <= PANE_W) {
      for (const n of state.nuclei) {
        if (!n.fused && Math.hypot(x - fromQ16(n.xQ16), y - fromQ16(n.yQ16)) < 26) {
          state = triggerNuclearFusionStep(state, n.id);
          audio.playTunnelingSpark();
          syncHud();
          return;
        }
      }
      state = beginQuantumGlyph(state, x, y);
    }
  });

  canvas?.addEventListener("pointermove", (ev) => {
    if (!state.brushStroke) return;
    const { x, y } = toCanvasCoords(ev);
    state = extendQuantumGlyph(state, x, y);
  });

  const finishGlyph = () => {
    if (!state.brushStroke) return;
    const prevAct = state.actIndex;
    const prevFusions = state.fusionsCompleted;
    state = endQuantumGlyph(state);
    if (state.actIndex !== prevAct || state.fusionsCompleted > prevFusions) {
      audio.playTunnelingSpark();
    }
    syncHud();
  };

  canvas?.addEventListener("pointerup", finishGlyph);
  canvas?.addEventListener("pointercancel", finishGlyph);

  document.getElementById("btn-fuse")?.addEventListener("click", () => {
    state = triggerNuclearFusionStep(state, null);
    audio.playTunnelingSpark();
    syncHud();
  });

  document.querySelectorAll("[data-act]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-act")) || 0;
      const preservedTunnels = state.totalQuantumTunnelEvents;
      state = { ...createSagaState(idx), totalQuantumTunnelEvents: preservedTunnels };
      syncHud();
    });
  });

  audioBtn?.addEventListener("click", () => {
    const muted = audio.toggleMute();
    audioBtn.textContent = muted ? "Sound: Muted" : "Sound: 114 BPM Ambient Techno (On)";
  });

  document.getElementById("btn-receipt")?.addEventListener("click", () => {
    const receipt = buildCosmicReceipt(state);
    if (receiptBox) receiptBox.value = JSON.stringify(receipt, null, 2);
  });

  let lastTime = performance.now();
  let accumulator = 0;

  function loop(now) {
    accumulator += Math.min(100, now - lastTime);
    lastTime = now;

    while (accumulator >= FIXED_DT_MS) {
      state = stepSagaFrame(state);
      accumulator -= FIXED_DT_MS;
    }

    syncHud();
    if (ctx) renderSplitScreenSaga(ctx, state);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

window.addEventListener("DOMContentLoaded", initBlackDwarfSaga);
