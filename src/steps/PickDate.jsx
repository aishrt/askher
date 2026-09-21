import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import { sfx, say } from '../lib/sound'
import { formatTime, toISODate } from '../lib/format'

const TIMES = Array.from({ length: 21 }, (_, i) => {
  const mins = 11 * 60 + i * 30 // 11:00 → 21:00
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
})

function nextWeekday(target) {
  const d = new Date()
  const diff = (target - d.getDay() + 7) % 7 || 7
  d.setDate(d.getDate() + diff)
  return d
}

export default function PickDate({ date, time, onChange, onNext }) {
  const today = toISODate(new Date())

  useEffect(() => {
    const t = setTimeout(() => say('So... when are you free?', { pitch: 1.5 }), 300)
    return () => clearTimeout(t)
  }, [])

  const quick = useMemo(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return [
      { label: 'Tomorrow', value: toISODate(tomorrow) },
      { label: 'This Friday', value: toISODate(nextWeekday(5)) },
      { label: 'This Saturday', value: toISODate(nextWeekday(6)) },
    ]
  }, [])

  return (
    <Card>
      <motion.div
        className="hero-emoji small"
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        📅🐾
      </motion.div>
      <h1 className="title">So… when are you free?</h1>

      <div className="chips">
        {quick.map((q) => (
          <motion.button
            key={q.label}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            className={`chip ${date === q.value ? 'is-active' : ''}`}
            onClick={() => {
              sfx.tap()
              onChange({ date: q.value })
            }}
          >
            {q.label}
          </motion.button>
        ))}
      </div>

      <label className="field">
        <span className="field-label">Pick a Day 📆</span>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => {
            sfx.tap()
            onChange({ date: e.target.value })
          }}
        />
      </label>

      <label className="field">
        <span className="field-label">What time? ⏰</span>
        <select
          value={time}
          onChange={(e) => {
            sfx.tap()
            onChange({ time: e.target.value })
          }}
        >
          {TIMES.map((t) => (
            <option key={t} value={t}>
              {formatTime(t)}
            </option>
          ))}
        </select>
      </label>

      <motion.button
        className="btn btn-primary btn-block"
        disabled={!date}
        whileHover={date ? { scale: 1.03, y: -2 } : undefined}
        whileTap={date ? { scale: 0.96 } : undefined}
        onClick={() => {
          sfx.chime()
          onNext()
        }}
      >
        {date ? 'Lock in the date! ♥' : 'pick a day first 🙈'}
      </motion.button>
    </Card>
  )
}
