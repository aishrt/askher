import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import { sfx, say } from '../lib/sound'
import { formatDate, formatTime } from '../lib/format'
import { config } from '../config'
import { FOODS } from './PickFood'

export default function Final({ answers, onAccept }) {
  const [saving, setSaving] = useState(false)
  const food = FOODS.find((f) => f.id === answers.food)
  const line = config.pickupLine.replace('{time}', formatTime(answers.time))

  useEffect(() => {
    sfx.heartbeat()
    const t = setTimeout(() => say("Glad you didn't say no!", { pitch: 1.6 }), 400)
    return () => clearTimeout(t)
  }, [])

  async function accept() {
    if (saving) return
    setSaving(true)
    sfx.fanfare()
    await onAccept()
  }

  return (
    <Card>
      <h1 className="title title-final">{line}</h1>
      <p className="ps">{config.psLine}</p>

      <div className="summary">
        <span>📅 {formatDate(answers.date)}</span>
        <span>⏰ {formatTime(answers.time)}</span>
        {food && (
          <span>
            {food.emoji} {food.label}
          </span>
        )}
      </div>

      <div className="heart-row" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.4, 1], y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      <motion.button
        className="btn btn-hot btn-block"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0 10px 30px rgba(224,25,122,.35)', '0 14px 44px rgba(224,25,122,.6)', '0 10px 30px rgba(224,25,122,.35)'] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        onClick={accept}
        disabled={saving}
      >
        {saving ? 'sealing it with a kiss… 💋' : 'ok I accept 💝'}
      </motion.button>
    </Card>
  )
}
