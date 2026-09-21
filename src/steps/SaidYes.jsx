import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import { burst } from '../lib/celebrate'
import { sfx, say } from '../lib/sound'

export default function SaidYes({ noAttempts, onNext }) {
  useEffect(() => {
    burst()
    sfx.fanfare()
    const t = setTimeout(() => say('Yaaay! You actually said yes!', { pitch: 1.7 }), 350)
    return () => clearTimeout(t)
  }, [])

  return (
    <Card>
      <motion.div
        className="emoji-tile"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.15 }}
      >
        <motion.span
          animate={{ scale: [1, 1.18, 1], rotate: [0, -8, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
        >
          🥹
        </motion.span>
      </motion.div>

      <h1 className="title title-caps">
        {'WAIT YOU ACTUALLY SAID YES?? 😭'.split(' ').map((word, i) => (
          <motion.span
            key={i}
            className="word"
            initial={{ opacity: 0, y: 20, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.25 + i * 0.08, type: 'spring', stiffness: 300, damping: 14 }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </h1>

      <p className="subtitle">
        {noAttempts > 0
          ? `after chasing that no button ${noAttempts} time${noAttempts === 1 ? '' : 's'}… I knew it 😌`
          : 'I was so ready for you to say no 😅'}
      </p>

      <motion.button
        className="btn btn-primary"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          sfx.tap()
          onNext()
        }}
      >
        okay okay! →
      </motion.button>
    </Card>
  )
}
