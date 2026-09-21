import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Card({ children, className = '' }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 160, damping: 16 })
  const rotateY = useSpring(ry, { stiffness: 160, damping: 16 })

  // gentle 3D tilt that follows the mouse (desktop only)
  function onMove(e) {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }
  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.section
      className={`card ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.94, filter: 'blur(6px)' }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.section>
  )
}
