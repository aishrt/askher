// All sounds are synthesised with the Web Audio API — no audio files needed.
// Cute "voices" use the browser's built-in speech synthesis with a high, sweet pitch.

let ctx = null
let muted = false
try {
  muted = localStorage.getItem('lovely-date-muted') === '1'
} catch {
  /* ignore */
}

export const isMuted = () => muted

export function setMuted(value) {
  muted = value
  try {
    localStorage.setItem('lovely-date-muted', value ? '1' : '0')
  } catch {
    /* ignore */
  }
  if (value) {
    stopMusic()
    window.speechSynthesis?.cancel()
  }
}

function audio() {
  if (!ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return null
    ctx = new Ctx()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone({ freq, to, type = 'sine', dur = 0.15, vol = 0.18, delay = 0 }) {
  if (muted) return
  const c = audio()
  if (!c) return
  const t = c.currentTime + delay
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + dur + 0.05)
}

export const sfx = {
  pop: () => tone({ freq: 520, to: 1100, dur: 0.09, vol: 0.12 }),
  tap: () => {
    tone({ freq: 880, dur: 0.12, vol: 0.1 })
    tone({ freq: 1320, dur: 0.16, vol: 0.08, delay: 0.06 })
  },
  boing: () => {
    tone({ freq: 620, to: 140, type: 'triangle', dur: 0.32, vol: 0.18 })
    tone({ freq: 300, to: 520, type: 'sine', dur: 0.12, vol: 0.06, delay: 0.3 })
  },
  chime: () =>
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) =>
      tone({ freq: f, dur: 0.5, vol: 0.12, delay: i * 0.08 }),
    ),
  sparkle: () => {
    for (let i = 0; i < 7; i++) {
      tone({ freq: 1400 + Math.random() * 1600, dur: 0.18, vol: 0.05, delay: i * 0.05 })
    }
  },
  heartbeat: () => {
    tone({ freq: 90, to: 60, dur: 0.14, vol: 0.35 })
    tone({ freq: 90, to: 60, dur: 0.16, vol: 0.3, delay: 0.2 })
  },
  fanfare: () => {
    const notes = [523.25, 659.25, 783.99, 659.25, 783.99, 1046.5]
    const times = [0, 0.12, 0.24, 0.42, 0.54, 0.7]
    notes.forEach((f, i) => {
      tone({ freq: f, type: 'triangle', dur: 0.35, vol: 0.12, delay: times[i] })
      tone({ freq: f * 2, dur: 0.25, vol: 0.03, delay: times[i] })
    })
  },
}

/* ---------- sweet voice ---------- */

let voice = null
function pickVoice() {
  const synth = window.speechSynthesis
  if (!synth) return null
  const voices = synth.getVoices()
  if (!voices.length) return null
  const english = voices.filter((v) => v.lang?.toLowerCase().startsWith('en'))
  const pool = english.length ? english : voices
  return (
    pool.find((v) =>
      /samantha|zira|aria|jenny|female|karen|victoria|moira|tessa|google uk english female|serena/i.test(v.name),
    ) || pool[0]
  )
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => (voice = pickVoice())
}

export function say(text, { pitch = 1.55, rate = 1.05 } = {}) {
  const synth = window.speechSynthesis
  if (muted || !synth) return
  const u = new SpeechSynthesisUtterance(text)
  voice = voice || pickVoice()
  if (voice) u.voice = voice
  u.pitch = pitch
  u.rate = rate
  u.volume = 0.9
  synth.cancel()
  synth.speak(u)
}

/* ---------- music box loop ---------- */

// C – Am – F – G arpeggios, played like a little music box
const MELODY = [
  523.25, 659.25, 783.99, 659.25,
  440.0, 523.25, 659.25, 523.25,
  349.23, 440.0, 523.25, 440.0,
  392.0, 493.88, 587.33, 783.99,
]
let musicTimer = null

export function startMusic() {
  if (musicTimer || muted) return
  let i = 0
  const play = () => {
    const f = MELODY[i % MELODY.length]
    tone({ freq: f, dur: 1.1, vol: 0.045 })
    tone({ freq: f * 2, dur: 0.5, vol: 0.012 })
    if (i % 4 === 0) tone({ freq: f / 2, dur: 1.4, vol: 0.03 })
    i++
  }
  play()
  musicTimer = setInterval(play, 360)
}

export function stopMusic() {
  clearInterval(musicTimer)
  musicTimer = null
}
