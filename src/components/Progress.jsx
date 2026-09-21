import { motion } from 'framer-motion'

export default function Progress({ index, total }) {
  return (
    <div className="progress" aria-label={`Step ${index + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <motion.span
          key={i}
          className={`progress-dot ${i <= index ? 'is-done' : ''}`}
          animate={{ scale: i === index ? [1, 1.35, 1] : 1 }}
          transition={{ duration: 1.1, repeat: i === index ? Infinity : 0 }}
        >
          {i <= index ? '♥' : '♡'}
        </motion.span>
      ))}
    </div>
  )
}
