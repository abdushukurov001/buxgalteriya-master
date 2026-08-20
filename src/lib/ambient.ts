/**
 * Lo-fi Study Beats — procedural ambient music for test-taking.
 *
 * Creates a calm, warm "lo-fi hip-hop beats to study to" vibe using:
 *  • Soft sine-wave "piano" chords with gentle attack/decay
 *  • A muffled vinyl-crackle layer (filtered noise)
 *  • A subtle slow kick/snare pattern for rhythm
 *  • Occasional soft bell chimes
 *
 * Everything runs through a master compressor + warm filter for that
 * classic lo-fi warmth.
 */

class LofiPlayer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private warmFilter: BiquadFilterNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private chordInterval: any = null;
  private beatInterval: any = null;
  private isPlaying = false;
  private chordIndex = 0;

  // Jazzy lo-fi chord voicings — each chord is an array of frequencies
  // Cmaj7, Am7, Fmaj7, G7 — classic lo-fi progression
  private chords = [
    [130.81, 261.63, 329.63, 392.00, 493.88], // Cmaj7  (C3, C4, E4, G4, B4)
    [110.00, 220.00, 261.63, 329.63, 440.00], // Am7   (A2, A3, C4, E4, A4)
    [87.31, 174.61, 261.63, 329.63, 415.30],  // Fmaj7 (F2, F3, C4, E4, Ab4)
    [98.00, 196.00, 246.94, 293.66, 349.23],  // G7    (G2, G3, B3, D4, F4)
  ];

  private init() {
    if (this.ctx) return;
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();

    // Compressor for smooth, even volume
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-20, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.01, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

    // Warm lo-fi filter — cuts harsh highs
    this.warmFilter = this.ctx.createBiquadFilter();
    this.warmFilter.type = "lowpass";
    this.warmFilter.frequency.setValueAtTime(2800, this.ctx.currentTime);
    this.warmFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.30, this.ctx.currentTime);

    // Chain: source → compressor → warm filter → master gain → output
    this.compressor.connect(this.warmFilter);
    this.warmFilter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  start() {
    if (this.isPlaying) return;
    this.init();
    if (!this.ctx || !this.compressor) return;

    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }

    this.isPlaying = true;
    this.chordIndex = 0;

    // Start vinyl crackle noise layer
    this.startNoise();

    // Play first chord immediately
    this.playChord();

    // Chord changes every 4 seconds
    this.chordInterval = setInterval(() => {
      if (this.isPlaying) this.playChord();
    }, 4000);

    // Subtle beat pattern every 1 second (kick-hat-snare-hat)
    let beatStep = 0;
    this.beatInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const step = beatStep % 4;
      if (step === 0) this.playKick();
      else if (step === 2) this.playSnare();
      else this.playHiHat();
      beatStep++;
    }, 500);
  }

  stop() {
    this.isPlaying = false;

    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
    if (this.beatInterval) {
      clearInterval(this.beatInterval);
      this.beatInterval = null;
    }

    // Stop noise
    if (this.noiseSource) {
      try { this.noiseSource.stop(); } catch (_) { /* */ }
      this.noiseSource = null;
    }

    // Fade out master
    if (this.ctx && this.masterGain) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      // Reset gain for next start
      this.masterGain.gain.setValueAtTime(0.30, t + 0.35);
    }
  }

  /** Vinyl crackle: very quiet filtered noise loop */
  private startNoise() {
    if (!this.ctx || !this.compressor) return;

    const sr = this.ctx.sampleRate;
    const buf = this.ctx.createBuffer(1, sr * 2, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      // Sparse crackle — mostly silence with occasional pops
      data[i] = Math.random() > 0.997 ? (Math.random() - 0.5) * 0.8 : (Math.random() - 0.5) * 0.005;
    }

    this.noiseSource = this.ctx.createBufferSource();
    this.noiseSource.buffer = buf;
    this.noiseSource.loop = true;

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    noiseFilter.Q.setValueAtTime(0.5, this.ctx.currentTime);

    this.noiseSource.connect(noiseFilter);
    noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.compressor);
    this.noiseSource.start();
  }

  /** Soft "piano" chord — sine waves with quick attack and gentle decay */
  private playChord() {
    if (!this.ctx || !this.compressor || !this.isPlaying) return;

    const chord = this.chords[this.chordIndex];
    if (!chord) return;
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;
    const t0 = this.ctx.currentTime;

    chord.forEach((freq, i) => {
      if (!this.ctx || !this.compressor) return;

      const delay = i * 0.06; // Slight strum effect
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t0 + delay);

      // Piano-like envelope: quick attack, gentle sustain, slow release
      env.gain.setValueAtTime(0.0001, t0 + delay);
      env.gain.linearRampToValueAtTime(0.12, t0 + delay + 0.05);    // Quick attack
      env.gain.setValueAtTime(0.12, t0 + delay + 0.08);
      env.gain.exponentialRampToValueAtTime(0.04, t0 + delay + 1.5); // Gentle sustain
      env.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + 3.5); // Slow release

      osc.connect(env).connect(this.compressor);
      osc.start(t0 + delay);
      osc.stop(t0 + delay + 3.6);
    });

    // Occasional soft bell chime on top (40% chance)
    if (Math.random() > 0.6) {
      this.playChime(t0 + 1.5 + Math.random() * 1.5);
    }
  }

  /** Subtle bell chime */
  private playChime(time: number) {
    if (!this.ctx || !this.compressor) return;

    const notes = [523.25, 659.25, 783.99, 880.00, 1046.50];
    const freq = notes[Math.floor(Math.random() * notes.length)] ?? 523.25;

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(0.06, time + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

    osc.connect(env).connect(this.compressor);
    osc.start(time);
    osc.stop(time + 1.9);
  }

  /** Soft kick drum — low sine wave with fast decay */
  private playKick() {
    if (!this.ctx || !this.compressor) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.12);

    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.15, t + 0.005);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

    osc.connect(env).connect(this.compressor);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  /** Soft snare — filtered noise burst */
  private playSnare() {
    if (!this.ctx || !this.compressor) return;
    const t = this.ctx.currentTime;
    const sr = this.ctx.sampleRate;

    const buf = this.ctx.createBuffer(1, sr * 0.1, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() - 0.5) * 2;
    }

    const src = this.ctx.createBufferSource();
    src.buffer = buf;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.07, t + 0.003);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(2000, t);

    src.connect(filter).connect(env).connect(this.compressor);
    src.start(t);
    src.stop(t + 0.15);
  }

  /** Soft hi-hat — very quiet high-frequency noise tick */
  private playHiHat() {
    if (!this.ctx || !this.compressor) return;
    const t = this.ctx.currentTime;
    const sr = this.ctx.sampleRate;

    const buf = this.ctx.createBuffer(1, sr * 0.03, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() - 0.5) * 2;
    }

    const src = this.ctx.createBufferSource();
    src.buffer = buf;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.03, t + 0.001);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(6000, t);

    src.connect(filter).connect(env).connect(this.compressor);
    src.start(t);
    src.stop(t + 0.05);
  }
}

export const ambientPlayer = new LofiPlayer();
