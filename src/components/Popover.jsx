import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * A trigger button plus a panel that expands *inside* the card (pushing content down),
 * so it never spills off small screens. Closes on outside click / Escape.
 */
export default function Popover({ open, onOpenChange, trigger, children, className = '' }) {
  const ref = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !ref.current?.contains(e.target) && onOpenChange(false)
    const onKey = (e) => e.key === 'Escape' && onOpenChange(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    // once expanded, make sure the whole panel is visible (mainly for phones)
    const t = setTimeout(() => panelRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 320)
    return () => {
      clearTimeout(t)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onOpenChange])

  return (
    <div className={`popover-wrap ${open ? 'is-open' : ''}`} ref={ref}>
      {trigger}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="popover"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div ref={panelRef} className={`popover-inner ${className}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
