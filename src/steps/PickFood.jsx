import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import { sfx, say } from '../lib/sound'

export const FOODS = [
  { id: 'pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'sushi', label: 'Sushi', emoji: '🍣' },
  { id: 'burgers', label: 'Burgers', emoji: '🍔' },
  { id: 'pasta', label: 'Pasta', emoji: '🍝' },
  { id: 'tacos', label: 'Tacos', emoji: '🌮' },
  { id: 'ramen', label: 'Ramen', emoji: '🍜' },
]

export default function PickFood({ food, onPick, onNext }) {
  const [chosen, setChosen] = useState(food)
  const timer = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => say('What are we feeling?', { pitch: 1.55 }), 300)
    return () => {
      clearTimeout(t)
      clearTimeout(timer.current)
    }
  }, [])

  function choose(f) {
    setChosen(f.id)
    onPick(f.id)
    sfx.sparkle()
    say(`${f.label}! Great choice.`, { pitch: 1.6 })
    clearTimeout(timer.current)
    timer.current = setTimeout(onNext, 1100)
  }

  return (
    <Card>
      <h1 className="title">What are we feeling? 🍽️✨</h1>
      <p className="subtitle">pick your vibe</p>

      <div className="food-grid">
        {FOODS.map((f, i) => (
          <motion.button
            key={f.id}
            type="button"
            className={`food ${chosen === f.id ? 'is-active' : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: chosen === f.id ? 1.06 : 1 }}
            transition={{ delay: chosen ? 0 : 0.1 + i * 0.06, type: 'spring', stiffness: 300, damping: 18 }}
            whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
            whileTap={{ scale: 0.92 }}
            onPointerEnter={(e) => e.pointerType === 'mouse' && sfx.pop()}
            onClick={() => choose(f)}
          >
            <motion.span
              className="food-emoji"
              animate={chosen === f.id ? { rotate: [0, -15, 15, -10, 0], scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.6 }}
            >
              {f.emoji}
            </motion.span>
            <span className="food-label">{f.label}</span>
          </motion.button>
        ))}
      </div>
    </Card>
  )
}
