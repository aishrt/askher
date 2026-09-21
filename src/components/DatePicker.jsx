import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Popover from './Popover'
import { sfx } from '../lib/sound'
import { formatDate, toISODate } from '../lib/format'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const monthStart = (iso) => {
  const d = iso ? new Date(`${iso}T00:00`) : new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export default function DatePicker({ value, min, onChange }) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => monthStart(value))
  const [dir, setDir] = useState(0)
  const today = toISODate(new Date())

  const minMonth = monthStart(min)
  const canGoBack = view > minMonth

  function toggle(next) {
    if (next) setView(monthStart(value || min))
    setOpen(next)
  }

  function shift(delta) {
    sfx.pop()
    setDir(delta)
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1))
  }

  function select(iso) {
    sfx.tap()
    onChange(iso)
    setTimeout(() => setOpen(false), 180)
  }

  // 6 rows × 7 days, starting on the Sunday on/before the 1st
  const first = new Date(view)
  first.setDate(1 - view.getDay())
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(first)
    d.setDate(first.getDate() + i)
    const iso = toISODate(d)
    return { iso, day: d.getDate(), inMonth: d.getMonth() === view.getMonth(), disabled: min && iso < min }
  })

  const label = view.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

  return (
    <Popover
      open={open}
      onOpenChange={toggle}
      className="cal"
      trigger={
        <button type="button" className={`picker-trigger ${value ? '' : 'is-empty'}`} onClick={() => toggle(!open)}>
          <span>{value ? formatDate(value) : 'choose a day 💕'}</span>
          <span className="picker-icon" aria-hidden="true">📅</span>
        </button>
      }
    >
      <div className="cal-head">
        <button type="button" className="cal-nav" onClick={() => shift(-1)} disabled={!canGoBack} aria-label="Previous month">
          ‹
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            className="cal-title"
            initial={{ opacity: 0, x: dir * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -20 }}
            transition={{ duration: 0.18 }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
        <button type="button" className="cal-nav" onClick={() => shift(1)} aria-label="Next month">
          ›
        </button>
      </div>

      <div className="cal-grid cal-weekdays">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={label}
          className="cal-grid"
          initial={{ opacity: 0, x: dir * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -30 }}
          transition={{ duration: 0.2 }}
        >
          {days.map((d) => {
            const selected = d.iso === value
            return (
              <motion.button
                key={d.iso}
                type="button"
                disabled={d.disabled}
                whileHover={d.disabled ? undefined : { scale: 1.12 }}
                whileTap={d.disabled ? undefined : { scale: 0.9 }}
                className={[
                  'cal-day',
                  !d.inMonth && 'is-out',
                  d.iso === today && 'is-today',
                  selected && 'is-selected',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => select(d.iso)}
                aria-pressed={selected}
              >
                {selected ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
                    {d.day}
                  </motion.span>
                ) : (
                  d.day
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </AnimatePresence>

      <div className="cal-foot">
        <button
          type="button"
          className="cal-link"
          onClick={() => {
            sfx.pop()
            onChange('')
          }}
        >
          Clear
        </button>
        <button type="button" className="cal-link" onClick={() => select(today)}>
          Today ✨
        </button>
      </div>
    </Popover>
  )
}
