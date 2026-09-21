import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/Card'
import { sfx, say } from '../lib/sound'
import { pick } from '../lib/format'

const NO_TEXTS = [
  'No',
  'Are you sure?',
  'Really sure?? 🥺',
  'Think again!',
  'Last chance!',
  'Surely not?',
  "You're breaking my heart 💔",
  'Pleaseee 🥹',
  "I'll buy snacks 🍫",
  'Okay now you\'re just playing',
  'Not happening 😌',
  'Error 404: No not found',
  'Just press yes 👉',
  'I can do this all day',
  'Wrong button, cutie 🙈',
  'Is that your final answer?',
  'My mom already likes you 🥲',
  "I'll let you pick the movie 🎬",
  'Pretty please with sprinkles 🍩',
  'You clicked this by accident, right?',
  'I even ironed my shirt 👔',
  "I'll hold your bag while you shop 🛍️",
  'Dessert is on me 🍰',
  "You're really testing me huh 😤",
  'The button is getting tired 😮‍💨',
  "I'm not crying, you're crying 😭",
  "I'll share my fries 🍟",
  'Fine, I will ask again… will you? 👉👈',
  'Plot twist: there is no No 🌀',
  'This button is on strike ✋',
  "Okay but think how cute we'd look 📸",
  'I practiced this in the mirror 🪞',
  'My heart can only take so much 💘',
  'Almost there… just say yes 🥹',
]
const SUBTITLES = [
  "I promise it'll be fun 🥹",
  'hmm, that button seems shy 👀',
  'it really does not want to be clicked',
  'the yes button is right there tho ✨',
  'you can keep trying… it keeps running 🏃‍♂️',
  'look how big the yes button is getting 😌',
]
const TAUNTS = ['nope!', 'nice try!', 'too slow!', 'hehe, missed me!', 'not that one!', 'catch me if you can!']
const SURRENDER_AT = NO_TEXTS.length
const HOVER_DELAY = 280 // ms the pointer can rest on "No" before it runs
const MIN_HOP = 90 // px — shortest jump, enough to slip away from the pointer
const MAX_HOP = 170 // px — longest jump, so it stays close by

export default function Ask({ recipient, onYes }) {
  const [count, setCount] = useState(0)
  const [pos, setPos] = useState(null) // null → button sits in its normal spot
  const [tilt, setTilt] = useState(0)
  const [answered, setAnswered] = useState(false)
  const btnRef = useRef(null)
  const origin = useRef(null)
  const lastDodge = useRef(0)
  const hoverTimer = useRef(null)
  useEffect(() => () => clearTimeout(hoverTimer.current), [])
  const surrendered = count >= SURRENDER_AT

  // on resize put the button back so it never ends up off-screen
  useEffect(() => {
    const reset = () => setPos(null)
    window.addEventListener('resize', reset)
    return () => window.removeEventListener('resize', reset)
  }, [])

  function dodge(e) {
    if (surrendered) return
    e?.preventDefault?.()
    const now = Date.now()
    if (now - lastDodge.current < 400) return
    lastDodge.current = now

    const el = btnRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (!pos) origin.current = { left: r.left, top: r.top }

    const vw = window.innerWidth
    const vh = window.innerHeight
    const pad = 14
    const w = Math.max(r.width, 210) // text may grow, leave room
    const h = Math.max(r.height, 56)
    const maxX = Math.max(pad, vw - w - pad)
    const maxY = Math.max(pad, vh - h - pad)
    const clamp = (v, max) => Math.min(Math.max(v, pad), max)
    // hop a short distance in a random direction (just enough to escape the pointer)
    let x = r.left
    let y = r.top
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = MIN_HOP + Math.random() * (MAX_HOP - MIN_HOP)
      x = clamp(r.left + Math.cos(angle) * dist, maxX)
      y = clamp(r.top + Math.sin(angle) * dist, maxY)
      // near a screen edge the clamp can shrink the hop; retry until it really moved
      if (Math.hypot(x - r.left, y - r.top) >= MIN_HOP * 0.8) break
    }

    setPos({ x, y })
    setTilt((Math.random() - 0.5) * 30)
    setCount((c) => c + 1)
    sfx.boing()
    if ((count + 1) % 3 === 0) say(pick(TAUNTS), { pitch: 1.8, rate: 1.15 })
  }

  function handleYes() {
    setAnswered(true)
    sfx.chime()
    onYes(count)
  }

  const noText = surrendered ? 'okay fine, YES 💖' : NO_TEXTS[Math.min(count, NO_TEXTS.length - 1)]
  const yesScale = 1 + Math.min(count * 0.09, 0.9)
  const noScale = surrendered ? 1 : Math.max(0.7, 1 - count * 0.025)
  const subtitle = count === 0 ? SUBTITLES[0] : SUBTITLES[Math.min(Math.ceil(count / 2), SUBTITLES.length - 1)]

  // On hover, wait a moment before running away so it feels teasing, not instant
  function hoverDodge(e) {
    if (e.pointerType !== 'mouse' || surrendered) return
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => dodge(), HOVER_DELAY)
  }

  const noHandlers = {
    onPointerEnter: hoverDodge,
    onPointerDown: (e) => !surrendered && dodge(e),
    onFocus: () => !surrendered && dodge(),
    onClick: (e) => (surrendered ? handleYes() : dodge(e)),
  }

  return (
    <Card className="card-ask">
      <motion.div
        className="hero-emoji"
        animate={{ y: [0, -10, 0], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {count > 6 ? '🥺' : count > 2 ? '😳' : '👉👈'}
      </motion.div>

      {recipient && <p className="eyebrow">hey {recipient} ✨</p>}
      <h1 className="title">Will you go on a date with me?</h1>

      <AnimatePresence mode="wait">
        <motion.p
          key={subtitle}
          className="subtitle"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
        >
          {subtitle}
        </motion.p>
      </AnimatePresence>

      <div className="ask-actions">
        <motion.div animate={{ scale: yesScale }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          <motion.button
            className="btn btn-primary btn-yes"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleYes}
          >
            Yes 💖
          </motion.button>
        </motion.div>

        {!pos && (
          <button ref={btnRef} className="btn btn-ghost btn-no" {...noHandlers}>
            {noText}
          </button>
        )}
      </div>

      {count > 0 && (
        <motion.p className="counter" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          no-button escapes: {count} 🏃
        </motion.p>
      )}

      {pos &&
        !answered &&
        createPortal(
          <motion.button
            ref={btnRef}
            className="btn btn-ghost btn-no is-floating"
            style={{ position: 'fixed' }}
            initial={origin.current ?? false}
            animate={{ left: pos.x, top: pos.y, scale: noScale, rotate: tilt }}
            transition={{ type: 'spring', stiffness: 90, damping: 16, mass: 1.1 }}
            {...noHandlers}
          >
            {noText}
          </motion.button>,
          document.body,
        )}
    </Card>
  )
}
