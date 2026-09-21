import confetti from 'canvas-confetti'

const colors = ['#ff8fab', '#fb6f92', '#ffc2d1', '#ffb3c6', '#c77dff', '#ffd166', '#9bf6ff']
const base = { colors, disableForReducedMotion: true, zIndex: 60 }

export function burst() {
  confetti({ ...base, particleCount: 130, spread: 100, startVelocity: 45, origin: { y: 0.6 } })
  setTimeout(() => confetti({ ...base, particleCount: 70, angle: 60, spread: 70, origin: { x: 0, y: 0.75 } }), 180)
  setTimeout(() => confetti({ ...base, particleCount: 70, angle: 120, spread: 70, origin: { x: 1, y: 0.75 } }), 320)
}

let heartShape = null
function heart() {
  if (!heartShape && confetti.shapeFromText) heartShape = confetti.shapeFromText({ text: '💖', scalar: 2 })
  return heartShape
}

export function heartsRain(duration = 2600) {
  const shape = heart()
  const extra = shape ? { shapes: [shape], scalar: 2 } : {}
  const end = Date.now() + duration
  const frame = () => {
    confetti({ ...base, ...extra, particleCount: 2, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } })
    confetti({ ...base, ...extra, particleCount: 2, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}
