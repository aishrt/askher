import { useMemo } from 'react'

const GLYPHS = ['♥', '💗', '♡', '💕', '🌸', '♥']
const DOTS = ['#ffd6e0', '#c9b6ff', '#ffe29a', '#a0e7e5', '#ffadc6', '#b4f8c8']

export default function Background() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: Math.random() * 100,
        size: 12 + Math.random() * 22,
        dur: 11 + Math.random() * 12,
        delay: -Math.random() * 22,
        sway: 20 + Math.random() * 40,
        glyph: GLYPHS[i % GLYPHS.length],
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [],
  )
  const dots = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 4 + Math.random() * 7,
        color: DOTS[i % DOTS.length],
        delay: -Math.random() * 6,
      })),
    [],
  )

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      {dots.map((d, i) => (
        <span
          key={`d${i}`}
          className="bg-dot"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
      {hearts.map((h, i) => (
        <span
          key={`h${i}`}
          className="bg-heart"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            opacity: h.opacity,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            '--sway': `${h.sway}px`,
          }}
        >
          {h.glyph}
        </span>
      ))}
    </div>
  )
}
