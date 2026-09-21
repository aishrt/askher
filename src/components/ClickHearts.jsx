import { useEffect, useState } from 'react'
import { sfx } from '../lib/sound'

const EMOJIS = ['💖', '💕', '✨', '💗', '🌸', '💞']
let uid = 0

/** Little hearts burst out wherever you tap or click. */
export default function ClickHearts() {
  const [parts, setParts] = useState([])

  useEffect(() => {
    function onDown(e) {
      const batch = Array.from({ length: 7 }, () => ({
        id: ++uid,
        x: e.clientX,
        y: e.clientY,
        dx: (Math.random() - 0.5) * 150,
        dy: -30 - Math.random() * 100,
        r: (Math.random() - 0.5) * 80,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      }))
      const ids = new Set(batch.map((b) => b.id))
      setParts((p) => [...p, ...batch])
      setTimeout(() => setParts((p) => p.filter((q) => !ids.has(q.id))), 950)
      if (!e.target.closest?.('button, input, select, label, a')) sfx.pop()
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [])

  return (
    <div className="click-layer" aria-hidden="true">
      {parts.map((p) => (
        <span
          key={p.id}
          className="click-heart"
          style={{ left: p.x, top: p.y, '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--r': `${p.r}deg` }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
