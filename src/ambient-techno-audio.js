/**
 * src/ambient-techno-audio.js — Mute-by-Default 114 BPM Calming Minimal-Techno WebAudio Synthesizer (Ledger 2)
 * Tuned to a warm D-Minor / D-Lydian ambient pulse (D2 sub-bass, Dm9 chord echoes,
 * liquid arpeggios, and crystalline quantum-tunneling bell harmonics).
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

const D_MINOR_ARP_HZ = [293.66, 349.23, 440.00, 523.25, 659.25]; // D4, F4, A4, C5, E5

export function createAmbientTechnoAudio() {
  let muted = true;
  let ctx = null;
  let timer = null;
  let step = 0;
  let currentAct = 0;

  const ensureCtx = () => {
    if (!ctx && typeof window !== "undefined") {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (Ctor) ctx = new Ctor();
    }
    if (ctx && ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const playSynthVoice = (freq, type, peak, attack, decay, cutoff = 620) => {
    const ac = ensureCtx();
    if (!ac || muted) return;

    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const filter = ac.createBiquadFilter();
    const gain = ac.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(cutoff, now);
    filter.frequency.exponentialRampToValueAtTime(160, now + decay);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + decay + 0.05);
  };

  // 114 BPM sixteenth-note step = ~131.5 ms
  const tickTechno = () => {
    if (!muted) {
      // Soft, warm minimal-techno sub-heartbeat on quarter notes (steps 0, 4, 8, 12)
      if (step % 4 === 0) {
        playSynthVoice(73.42, "sine", 0.075, 0.015, 0.42, 190); // D2 warm sub
      }

      // Hypnotic dub-techno Dm9 chord stab on off-beats (steps 2, 10)
      if (step % 8 === 2) {
        playSynthVoice(146.83, "triangle", 0.025, 0.06, 0.85, 520); // D3
        playSynthVoice(220.00, "sine", 0.022, 0.06, 0.85, 520); // A3
        if (currentAct >= 1) {
          playSynthVoice(261.63, "sine", 0.018, 0.08, 0.95, 580); // C4
        }
      }

      // Liquid minimal arpeggio (Acts III-V)
      if (currentAct >= 2 && step % 2 === 0) {
        const arpNote = D_MINOR_ARP_HZ.at((step / 2) % D_MINOR_ARP_HZ.length);
        playSynthVoice(arpNote, "sine", 0.024, 0.02, 0.55, 840);
      }

      // Act V Rebirth Major-Lydian F#4 shimmer
      if (currentAct === 4 && step % 8 === 6) {
        playSynthVoice(369.99, "sine", 0.028, 0.1, 1.4, 1100); // F#4
      }
    }
    step = (step + 1) % 16;
  };

  return {
    isMuted: () => muted,
    setAct: (actIndex) => {
      currentAct = Math.max(0, Math.min(4, actIndex | 0));
    },
    toggleMute: () => {
      muted = !muted;
      if (!muted) {
        ensureCtx();
        if (!timer && typeof window !== "undefined") {
          timer = window.setInterval(tickTechno, 132);
        }
        tickTechno();
      }
      return muted;
    },
    playTunnelingSpark: () => {
      if (muted) return;
      playSynthVoice(587.33, "sine", 0.055, 0.01, 1.3, 1500); // D5
      playSynthVoice(880.00, "sine", 0.03, 0.02, 1.5, 1600); // A5
    },
  };
}
