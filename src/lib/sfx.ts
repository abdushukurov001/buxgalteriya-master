let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, dur: number, gain = 0.12, type: OscillatorType = "sine") {
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

/** Unlock audio on first user gesture (iOS/Safari). */
export function primeAudio() {
  audio();
}

export function playCorrect() {
  tone(880, 0, 0.12);
  tone(1320, 0.09, 0.16);
}

export function playWrong() {
  tone(220, 0, 0.18, 0.14, "sawtooth");
  tone(160, 0.12, 0.22, 0.12, "sawtooth");
}

export function playTick() {
  tone(1200, 0, 0.07, 0.1, "square");
}

export function playSuccess() {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => tone(f, i * 0.13, 0.3, 0.11, "triangle"));
  tone(1318.5, 0.55, 0.5, 0.09, "triangle");
}

export function playTimeUp() {
  tone(400, 0, 0.25, 0.14, "sawtooth");
  tone(300, 0.2, 0.35, 0.14, "sawtooth");
}
