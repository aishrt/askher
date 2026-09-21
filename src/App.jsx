import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import ClickHearts from './components/ClickHearts'
import SoundControls from './components/SoundControls'
import Progress from './components/Progress'
import Ask from './steps/Ask'
import SaidYes from './steps/SaidYes'
import PickDate from './steps/PickDate'
import PickFood from './steps/PickFood'
import Final from './steps/Final'
import Done from './steps/Done'
import { config } from './config'
import { saveDateResponse } from './lib/firebase'
import { startMusic, stopMusic, isMuted } from './lib/sound'

const STEPS = ['ask', 'yes', 'date', 'food', 'final', 'done']

const initialAnswers = () => ({
  date: '',
  time: config.defaultTime,
  food: null,
  noAttempts: 0,
})

export default function App() {
  const [step, setStep] = useState('ask')
  const [answers, setAnswers] = useState(initialAnswers)
  const [music, setMusic] = useState(false)
  const startedAt = useRef(new Date().toISOString())

  useEffect(() => {
    if (music) startMusic()
    else stopMusic()
    return stopMusic
  }, [music])

  const update = (patch) => setAnswers((a) => ({ ...a, ...patch }))
  const index = STEPS.indexOf(step)

  async function accept() {
    await saveDateResponse({
      recipient: config.recipientName || null,
      date: answers.date,
      time: answers.time,
      food: answers.food,
      noAttempts: answers.noAttempts,
      startedAt: startedAt.current,
      acceptedAt: new Date().toISOString(),
    })
    setStep('done')
  }

  return (
    <div className="app">
      <Background />
      <ClickHearts />
      <SoundControls music={music} onMusicChange={setMusic} />

      <main className="stage">
        {step !== 'done' && <Progress index={index} total={STEPS.length - 1} />}

        <AnimatePresence mode="wait">
          {step === 'ask' && (
            <Ask
              key="ask"
              recipient={config.recipientName}
              onYes={(noAttempts) => {
                update({ noAttempts })
                if (!isMuted()) setMusic(true)
                setStep('yes')
              }}
            />
          )}
          {step === 'yes' && <SaidYes key="yes" noAttempts={answers.noAttempts} onNext={() => setStep('date')} />}
          {step === 'date' && (
            <PickDate key="date" date={answers.date} time={answers.time} onChange={update} onNext={() => setStep('food')} />
          )}
          {step === 'food' && (
            <PickFood key="food" food={answers.food} onPick={(food) => update({ food })} onNext={() => setStep('final')} />
          )}
          {step === 'final' && <Final key="final" answers={answers} onAccept={accept} />}
          {step === 'done' && (
            <Done
              key="done"
              answers={answers}
              onRestart={() => {
                setAnswers(initialAnswers())
                startedAt.current = new Date().toISOString()
                setStep('ask')
              }}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="footer">made with ♥ just for you</footer>
    </div>
  )
}
