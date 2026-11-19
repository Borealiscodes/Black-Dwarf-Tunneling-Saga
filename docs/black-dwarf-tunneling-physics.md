# Deterministic Fixed-Point Modeling of Pycnonuclear Quantum Tunneling and Mestel Cooling Across a 10²⁵-Year Stellar Lifecycle

**Author:** Borealis Serenity Hedling  
**Affiliation:** Independent Researcher, NDH-Research-Pilot, County Dublin, Ireland  
**Date:** November 19, 2026  
**Version:** v1.0.0 (Companion Preprint for `Borealiscodes/Black-Dwarf-Tunneling-Saga`)  
**License:** CC BY 4.0 (Preprint Text) / MIT License (Reference Implementation)  

---

## Authorial Disclosure & Governance Note

This work translates astrophysical models of late-stage white dwarf cooling and pycnonuclear quantum tunneling (Caplan, 2020; Salpeter & Van Horn, 1969) into an interactive split-screen browser simulation. The author is an independent researcher and human rights defender transitioning into creative coding and science communication, **not** an academic astrophysicist. Both the prose and the zero-dependency JavaScript implementation were developed with AI assistance and verified via deterministic unit tests (`node --test`: 3/3 passing). In accordance with NDH governance, all `VM-VEX` hyperstructure references remain strictly descriptive and dormant.

---

## 1. Astrophysical Background: From Main Sequence to 10 Septillion Years

Low- to intermediate-mass stars ($M \lesssim 8\,M_\odot$) evolve through four classical thermodynamic regimes before entering the hypothetical pycnonuclear era of the far future (Adams & Laughlin, 1997; Caplan, 2020):

1. **Main Sequence ($0 \to 10^{10}\text{ yr}$):** Core hydrogen fuses via the proton–proton (`p-p`) chain ($4\,{}^1\text{H} \to {}^4\text{He} + 2e^+ + 2\nu_e + 26.73\text{ MeV}$) at $T_c \approx 1.5 \times 10^7\text{ K}$.
2. **Red Giant & Triple-Alpha Resonance ($10^{10} \to 1.2 \times 10^{10}\text{ yr}$):** Three ${}^4\text{He}$ nuclei fuse via the $7.65\text{ MeV}$ Hoyle state into ${}^{12}\text{C}$ and ${}^{16}\text{O}$ at $T_c \approx 10^8\text{ K}$.
3. **White Dwarf Mestel Cooling ($10^{10} \to 10^{14}\text{ yr}$):** Supported by electron degeneracy pressure, the carbon-oxygen core radiates residual thermal energy according to Mestel's cooling law (Mestel, 1952):
   $$L(t) \propto t^{-7/5}$$
4. **Black Dwarf Pycnonuclear Tunneling ($10^{14} \to 10^{25}\text{ yr}$):** Once cooled toward $T \to 0\text{ K}$, classical Maxwell–Boltzmann thermal fusion vanishes completely. Over timescales of $\sim 10^{25}\text{ years}$ (10 septillion years), zero-point lattice vibrations inside the body-centered cubic ${}^{12}\text{C}$ crystal enable **pycnonuclear quantum tunneling** (${}^{12}\text{C} + {}^{12}\text{C} \to {}^{24}\text{Mg}$), potentially triggering a runaway carbon detonation supernova in sufficiently massive black dwarfs (Caplan, 2020).

---

## 2. Deterministic `Q16.16` Mathematical Formulation (`Ledger 1`)

### 2.1 WKB Barrier Transmission Probability
For two nuclei of atomic numbers $Z_1, Z_2$ approaching with relative velocity $v$, the Coulomb repulsion barrier is parameterized by the dimensionless Sommerfeld parameter $\eta = \frac{Z_1 Z_2 e^2}{\hbar v}$. Under the Wentzel–Kramers–Brillouin (WKB) semiclassical approximation (Gamow, 1928), the barrier penetration probability scales exponentially as:

$$T_{\text{WKB}}(\eta) = \exp(-2\pi \eta)$$

In `stellar-physics.js`, we quantize the normalized barrier transmission onto the signed 32-bit `Q16.16` integer ring ($1.0 \equiv 65536$) with clamped bounds $[1, 65536]$ so that barrier reduction across consecutive tunneling events remains strictly monotonic and reproducible across hardware architectures.

### 2.2 Normalized Mestel Cooling Decay
Across dimensionless cooling age $\tau \ge 0$, normalized white-dwarf luminosity is evaluated deterministically in `Q16.16` via:

$$\tilde{L}(\tau) = \text{clamp}_{[0.01,\, 1.0]}\!\left( (1 + \tau)^{-7/5} \right)$$

---

## 3. Dual-Ledger Split-Screen Architecture (`Ledger 1` / `Ledger 2`)

* **Ledger 1 (`stellar-physics.js`):** Advances the 5-Act cosmic clock, computes `Q16.16` WKB barrier probabilities and Mestel luminosity decay, classifies left-pane Celestial Quantum Glyphs (`CIRCLE`, `WAVE`, `SLASH`), and generates canonical 64-character `SHA-256` cosmic run receipts.
* **Ledger 2 (`split-screen-renderer.js` & `ambient-techno-audio.js`):** Renders synchronized side-by-side views—the 12-ion `Q16.16` nuclear lattice on the left and the macroscopic star corona/shockwave on the right—using steady obsidian-indigo gradients (zero strobing) paired with a mute-by-default `114 BPM` D-Minor / D-Lydian WebAudio synthesizer.

---

## 4. References (APA 7th Edition)

* Adams, F. C., & Laughlin, G. (1997). A dying universe: The long-term fate and evolution of astrophysical objects. *Reviews of Modern Physics*, 69(2), 337–372. https://doi.org
* Caplan, M. E. (2020). Black dwarf supernova in the far future. *Monthly Notices of the Royal Astronomical Society*, 497(4), 4357–4362. https://doi.org
* Gamow, G. (1928). Zur Quantentheorie des Atomkernes [On the quantum theory of the atomic nucleus]. *Zeitschrift für Physik*, 51(3–4), 204–212. https://doi.org
* Hedling, B. S. (2026). *VM-VEX attempts to model black dwarf quantum tunneling (v1.0)*. NDH-Meta-Systems Archive. https://github.com
* Mestel, L. (1952). On the theory of white dwarf stars: I. The energy sources of white dwarfs. *Monthly Notices of the Royal Astronomical Society*, 112(6), 583–597. https://doi.org
* Salpeter, E. E., & Van Horn, H. M. (1969). Nuclear reaction rates at high densities. *The Astrophysical Journal*, 155, 183–202. https://doi.org
