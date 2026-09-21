import { useState } from 'react'
import { motion } from 'framer-motion'
import Popover from './Popover'
import { sfx } from '../lib/sound'
import { formatTime } from '../lib/format'

const slots = (fromMins, toMins) => {
  const out = []
  for (let m = fromMins; m <= toMins; m += 30) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`)
  }
  return out
}

const GROUPS = [
  { label: 'Lunch ☀️', times: slots(11 * 60, 14 * 60) },
  { label: 'Afternoon 🌤️', times: slots(14 * 60 + 30, 17 * 60) },
  { label: 'Evening 🌙', times: slots(17 * 60 + 30, 21 * 60 + 30) },
]

export default function TimePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)

  function select(t) {
    sfx.tap()
    onChange(t)
    setTimeout(() => setOpen(false), 180)
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      className="time-pop"
      trigger={
        <button type="button" className="picker-trigger" onClick={() => setOpen(!open)}>
          <span>{formatTime(value)}</span>
          <span className="picker-icon" aria-hidden="true">⏰</span>
        </button>
      }
    >
      {GROUPS.map((g) => (
        <div key={g.label} className="time-group">
          <p className="time-group-label">{g.label}</p>
          <div className="time-grid">
            {g.times.map((t) => (
              <motion.button
                key={t}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`time-chip ${t === value ? 'is-selected' : ''}`}
                onClick={() => select(t)}
                aria-pressed={t === value}
              >
                {formatTime(t)}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </Popover>
  )
}
