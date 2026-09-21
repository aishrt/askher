import { useState } from 'react'
import { motion } from 'framer-motion'
import { isMuted, setMuted, sfx } from '../lib/sound'

export default function SoundControls({ music, onMusicChange }) {
  const [muted, setMutedState] = useState(isMuted())

  function toggleMute() {
    const next = !muted
    setMuted(next)
    setMutedState(next)
    if (next) onMusicChange(false)
    else sfx.tap()
  }

  function toggleMusic() {
    if (muted) {
      setMuted(false)
      setMutedState(false)
    }
    onMusicChange(!music)
  }

  return (
    <div className="sound-controls">
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1, rotate: -8 }}
        className="icon-btn"
        onClick={toggleMute}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
        title={muted ? 'Sound off' : 'Sound on'}
      >
        {muted ? '🔇' : '🔊'}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1, rotate: 8 }}
        className={`icon-btn ${music ? 'is-on' : ''}`}
        onClick={toggleMusic}
        aria-label={music ? 'Stop music' : 'Play music'}
        title={music ? 'Music on' : 'Music off'}
      >
        {music ? '🎶' : '🎵'}
      </motion.button>
    </div>
  )
}
