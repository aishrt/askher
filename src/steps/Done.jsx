import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import { burst, heartsRain } from '../lib/celebrate'
import { sfx, say } from '../lib/sound'
import { formatDate, formatTime } from '../lib/format'
import { FOODS } from './PickFood'

export default function Done({ answers, onRestart }) {
  const food = FOODS.find((f) => f.id === answers.food)

  useEffect(() => {
    heartsRain(3200)
    burst()
    const t = setTimeout(() => say("It's a date! See you soon.", { pitch: 1.65 }), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <Card className="card-done">
      <motion.div
        className="big-heart"
        animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
        transition={{ duration: 1.3, repeat: Infinity }}
        onClick={() => {
          sfx.heartbeat()
          heartsRain(900)
        }}
        role="button"
        aria-label="Tap the heart"
      >
        💞
      </motion.div>
      <h1 className="title">It's a date!</h1>
      <p className="subtitle">
        {formatDate(answers.date)} at {formatTime(answers.time)}
        {food ? ` · ${food.label} ${food.emoji}` : ''}
      </p>
      <p className="ps">screenshot this & send it to me 📸 (tap the heart 😉)</p>

      <button
        className="link-btn"
        onClick={() => {
          sfx.tap()
          onRestart()
        }}
      >
        ↺ play it again
      </button>
    </Card>
  )
}
