import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import FoodIcon from '../components/FoodIcon'
import { burst, heartsRain } from '../lib/celebrate'
import { sfx, say } from '../lib/sound'
import { formatDate, formatTime } from '../lib/format'
import { FOODS } from './PickFood'
import { config } from '../config'

export default function Done({ answers, onRestart }) {
  const food = FOODS.find((f) => f.id === answers.food)
  const name = config.recipientName

  useEffect(() => {
    heartsRain(3200)
    burst()
    const t = setTimeout(() => say(name ? `It's a date, ${name}! See you soon.` : "It's a date! See you soon.", { pitch: 1.65 }), 500)
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
      <h1 className="title">
        It's a date{name ? ', ' : ''}
        {name && <span className="name name-shimmer">{name}</span>}!
      </h1>
      <p className="subtitle">
        {formatDate(answers.date)} at {formatTime(answers.time)}
        {food && (
          <>
            {' · '}
            {food.label} <FoodIcon food={food} />
          </>
        )}
      </p>
      {config.endMessage && (
        <motion.div
          className="note"
          initial={{ opacity: 0, y: 14, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 14 }}
        >
          <span className="note-to">for {name || 'you'} 💌</span>
          {config.endMessage}
        </motion.div>
      )}
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
