import { useState } from 'react'
import { motion } from 'framer-motion'
import RPMAvatar from './components/RPMAvatar.jsx'

/* --------------------- SPEECH FUNCTION --------------------- */
function speak(text) {
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-IN'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}

/* --------------------- BRAND ANIMATION --------------------- */
function AnimatedBrand({ text }) {
  const letters = text.split('')
  return (
    <h1 style={{ fontSize: '56px', letterSpacing: '0.04em', margin: 0 }} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: -10, rotate: i % 2 === 0 ? -6 : 6 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          transition={{ delay: i * 0.06, type: 'spring', stiffness: 320, damping: 22 }}
          style={{ display: 'inline-block' }}
        >
          {ch}
        </motion.span>
      ))}
    </h1>
  )
}

/* ----------------------- MAIN APP ------------------------ */
export default function App() {
  const [started, setStarted] = useState(false)

  // 1) Read from .env (Vite loads it automatically at startup)
  const envUrl = import.meta.env.VITE_RPM_AVATAR_URL

  // 2) Fallback to your GLB so it works even if .env wasn't picked up
  const FALLBACK_GLb = 'https://models.readyplayer.me/69157879f8382d41f5757fda.glb'

  // 3) Final URL used by the app
  const AVATAR_URL = (envUrl && String(envUrl).trim().length > 0) ? envUrl : FALLBACK_GLb

  const handleStart = () => {
    if (!started) {
      speak('Namaskar! Welcome to Aniston.')
      setStarted(true)
    }
  }

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: '#000',
        color: '#fff',
        position: 'relative'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 640 }}>
        <AnimatedBrand text="Aniston" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ margin: '18px 0 24px', fontSize: 18, opacity: 0.9 }}
        >
          Tap “Start” to hear the welcome.
        </motion.p>

        <div style={{ marginTop: 16, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <motion.button
            onClick={handleStart}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              padding: '12px 18px',
              fontSize: 16,
              background: '#fff',
              color: '#000',
              border: 0,
              borderRadius: 10,
              cursor: 'pointer'
            }}
          >
            Start
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          style={{ marginTop: 28, fontSize: 12, opacity: 0.6 }}
        >
          PWA shell is ready — installable on supported browsers.
        </motion.p>
      </div>

      {/* Always-on transparent avatar */}
      <RPMAvatar url={AVATAR_URL} />
    </main>
  )
}
