/**
 * test/stellar-physics.test.mjs — Verification of WKB Tunneling, Mestel Cooling & 5-Act Lifecycle
 * Run: node --test test/stellar-physics.test.mjs
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  computeWkbTunnelingQ16,
  computeMestelLuminosityQ16,
  createSagaState,
  triggerNuclearFusionStep,
  beginQuantumGlyph,
  extendQuantumGlyph,
  endQuantumGlyph,
  buildCosmicReceipt,
} from "../src/stellar-physics.js";

test("1. WKB Quantum Tunneling Transmission Decreases Monotonically with Coulomb Barrier", () => {
  const lowBarrier = computeWkbTunnelingQ16(1.0);
  const highBarrier = computeWkbTunnelingQ16(3.5);
  assert.ok(lowBarrier > highBarrier);
  assert.ok(highBarrier >= 1);
});

test("2. Mestel Cooling Law Decays Luminosity Across White Dwarf Age", () => {
  const young = computeMestelLuminosityQ16(0.5);
  const ancient = computeMestelLuminosityQ16(8.0);
  assert.ok(young > ancient);
});

test("3. Act IV Black Dwarf Quantum Tunneling Glyph Ignites Act V Supernova Rebirth", () => {
  let state = createSagaState(3); // Act IV: Black Dwarf (10^25 yr)
  assert.equal(state.actDef.slug, "black-dwarf");

  // Draw 3 Celestial Quantum Glyphs across the Left Atomic Lattice pane
  for (let g = 0; g < 3; g++) {
    state = beginQuantumGlyph(state, 60, 120 + g * 40);
    state = extendQuantumGlyph(state, 260, 260 + g * 40);
    state = endQuantumGlyph(state);
  }

  assert.equal(state.totalQuantumTunnelEvents, 3);
  assert.equal(state.actIndex, 4); // Automatically advanced to Act V: Supernova Rebirth
  assert.equal(buildCosmicReceipt(state).vmVexStatus, "DORMANT_AND_SEALED");
  assert.equal(buildCosmicReceipt(state).sha256.length, 64);
});
