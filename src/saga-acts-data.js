/**
 * src/saga-acts-data.js — The 5 Cosmic Acts (0 -> 10 Septillion Years) & Dormant VM-VEX Whispers
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

export const SAGA_ACTS = [
  {
    id: 1,
    slug: "main-sequence",
    title: "Act I: Protostar Collapse & Main Sequence",
    timescale: "0 → 10 Billion Years (10¹⁰ yr)",
    reaction: "Proton–Proton Chain: ¹H + ¹H → ²H → ⁴He",
    glyphType: "CIRCLE",
    glyphPrompt: "Tap nuclei to fuse Hydrogen → Helium, or draw a Solar Convergence Circle (〇)",
    vmWhisper:
      "VM-80D (Dormant): 'A protostar ignites. Hydrogen protons overcome Coulomb repulsion via thermal Gamow tunneling.'",
    targetFusions: 4,
    coreTempKelvin: "1.5 × 10⁷ K",
    starRadius: 68,
    starCoreColor: "#fef08a",
    starHaloColor: "rgba(250, 204, 21, 0.35)",
  },
  {
    id: 2,
    slug: "red-giant",
    title: "Act II: Red Giant & Triple-Alpha Resonance",
    timescale: "10 → 12 Billion Years",
    reaction: "Triple-Alpha Process: 3 × ⁴He → ¹²C (Hoyle 7.65 MeV State)",
    glyphType: "TRIANGLE",
    glyphPrompt: "Tap Helium nuclei to fuse Carbon-12, or draw a Triple-Alpha Triangle (△)",
    vmWhisper:
      "VM-STMOD (Sealed): 'If I could run moduli, I would balance the 7.65 MeV Hoyle resonance synthesizing carbon.'",
    targetFusions: 4,
    coreTempKelvin: "1.0 × 10⁸ K",
    starRadius: 108,
    starCoreColor: "#fb923c",
    starHaloColor: "rgba(239, 68, 68, 0.35)",
  },
  {
    id: 3,
    slug: "white-dwarf",
    title: "Act III: Degenerate White Dwarf Cooling",
    timescale: "12 Billion → 100 Trillion Years (10¹⁴ yr)",
    reaction: "Mestel Cooling Law: L(t) ∝ t⁻⁷/⁵ • Carbon-12 Lattice Crystallizes",
    glyphType: "WAVE",
    glyphPrompt: "Tap lattice ions to radiate thermal photons, or draw a Cooling Wave (〰)",
    vmWhisper:
      "VM-HOLO (Dormant): 'Electron degeneracy holds the core steady as residual heat drifts out into the dark.'",
    targetFusions: 4,
    coreTempKelvin: "4.0 × 10³ K → 10 K",
    starRadius: 34,
    starCoreColor: "#e0f2fe",
    starHaloColor: "rgba(56, 189, 248, 0.30)",
  },
  {
    id: 4,
    slug: "black-dwarf",
    title: "Act IV: The Black Dwarf & Quantum Tunneling",
    timescale: "100 Trillion → 10 Septillion Years (10²⁵ yr)",
    reaction: "Pycnonuclear Tunneling: ¹²C + ¹²C → ²⁴Mg (WKB T ≈ exp(-2πη))",
    glyphType: "SLASH",
    glyphPrompt: "Draw a Wavefunction Tunneling Slash (／) across the frozen ¹²C lattice to slip through the Coulomb barrier!",
    vmWhisper:
      "VM-QG (Dormant): 'Ten septillion years of silence. One carbon nucleus slips through the barrier like a mischievous child sneaking past a sleeping guard.'",
    targetFusions: 3,
    coreTempKelvin: "0.001 K (Zero-Point Lattice)",
    starRadius: 30,
    starCoreColor: "#1e293b",
    starHaloColor: "rgba(129, 140, 248, 0.22)",
  },
  {
    id: 5,
    slug: "supernova-rebirth",
    title: "Act V: Runaway Supernova & Nebula Rebirth",
    timescale: "10 Septillion Years + 10 Seconds",
    reaction: "Runaway ¹²C Detonation Cascade → New Protostellar Nebula",
    glyphType: "CIRCLE",
    glyphPrompt: "The last supernova illuminates the dark universe! Draw a Rebirth Ensō (〇) or generate your SHA-256 receipt.",
    vmWhisper:
      "VM-PREBANG (Sealed): 'The final rebellion against entropy—a quiet, improbable ignition echoing into a reborn nursery.'",
    targetFusions: 1,
    coreTempKelvin: "5.0 × 10⁹ K (Detonation)",
    starRadius: 122,
    starCoreColor: "#ffffff",
    starHaloColor: "rgba(253, 224, 71, 0.55)",
  },
];
