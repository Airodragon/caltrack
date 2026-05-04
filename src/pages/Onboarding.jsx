import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ChevronLeft, Salad } from 'lucide-react'

export default function Onboarding() {
  const { setProfile, setSyncKey } = useApp()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [syncKey, setSyncKeyLocal] = useState('')
  const [error, setError] = useState('')

  const next = () => {
    if (!name.trim()) { setError('Enter your name'); return }
    setError(''); setStep(1)
  }

  const finish = () => {
    if (!calories || Number(calories) < 500) { setError('Enter a valid calorie goal'); return }
    setError('')
    setProfile({
      name: name.trim(),
      calorieGoal: Number(calories),
      proteinGoal: Number(protein) || 0,
      carbsGoal: Number(carbs) || 0,
      fatGoal: Number(fat) || 0,
    })
    if (syncKey.trim()) setSyncKey(syncKey.trim().toLowerCase().replace(/\s+/g, '-'))
  }

  return (
    <div style={S.wrap}>
      <div style={S.glow} />

      {step === 0 && (
        <div style={S.card} className="anim-pop">
          <div style={S.logoArea}>
            <div style={S.ring}>
              <svg width={72} height={72} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={36} cy={36} r={28} fill="none" stroke="#1C1C1E" strokeWidth={8} />
                <circle cx={36} cy={36} r={28} fill="none" stroke="var(--green)" strokeWidth={8}
                  strokeLinecap="round" strokeDasharray={175.9} strokeDashoffset={44} />
              </svg>
              <span style={S.ringEmoji}><Salad size={24} color="var(--green)" /></span>
            </div>
            <h1 style={S.logo}>CalTrack</h1>
            <p style={S.tagline}>Your personal health companion</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
            <div className="input-group">
              <label className="input-label">Your name</label>
              <input className="input" placeholder="e.g. Mihir" value={name}
                onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && next()}
                style={{ textAlign: 'center', fontSize: 18 }} autoFocus />
            </div>
          </div>

          {error && <p style={S.err}>{error}</p>}

          <button className="btn btn-primary w-full" style={{ marginTop: 20 }} onClick={next}>
            Get Started
          </button>
        </div>
      )}

      {step === 1 && (
        <div style={S.card} className="anim-pop">
          <div style={S.stepHead}>
            <button style={S.back} onClick={() => setStep(0)}>
              <ChevronLeft size={16} />
            </button>
            <h2 style={S.stepTitle}>Set your goals</h2>
            <div style={{ width: 32 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
            <div className="input-group">
              <label className="input-label" style={{ color: 'var(--green)' }}>Daily Calorie Goal (kcal) *</label>
              <input className="input" type="number" placeholder="e.g. 1800" value={calories}
                onChange={e => setCalories(e.target.value)} style={{ textAlign: 'center', fontSize: 22, fontWeight: 700 }} />
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}>Macro targets (optional)</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { label: 'Protein (g)', placeholder: '150', value: protein, set: setProtein, color: 'var(--blue)' },
                { label: 'Carbs (g)', placeholder: '200', value: carbs, set: setCarbs, color: 'var(--orange)' },
                { label: 'Fat (g)', placeholder: '60', value: fat, set: setFat, color: 'var(--red)' },
              ].map(f => (
                <div className="input-group" key={f.label}>
                  <label className="input-label" style={{ color: f.color }}>{f.label}</label>
                  <input className="input" type="number" placeholder={f.placeholder}
                    value={f.value} onChange={e => f.set(e.target.value)}
                    style={{ textAlign: 'center', padding: '11px 6px' }} />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 8, padding: '16px', background: 'var(--surface-3)', borderRadius: 12 }}>
              <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8, fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                Multi-device Sync Key (optional)
              </p>
              <input className="input" placeholder="e.g. mihir-personal" value={syncKey}
                onChange={e => setSyncKeyLocal(e.target.value)}
                style={{ fontSize: 14 }} />
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, lineHeight: 1.5 }}>
                Use the same key on all devices to sync data via Firebase.
              </p>
            </div>
          </div>

          {error && <p style={S.err}>{error}</p>}

          <button className="btn btn-primary w-full" style={{ marginTop: 20 }} onClick={finish}>
            Start Tracking
          </button>
        </div>
      )}
    </div>
  )
}

const S = {
  wrap: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height: '60vw',
    maxWidth: 320,
    maxHeight: 320,
    background: 'radial-gradient(circle, rgba(48,209,88,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 24,
    padding: '28px 24px 32px',
    width: '100%',
    maxWidth: 390,
  },
  logoArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  ring: {
    position: 'relative',
    width: 72,
    height: 72,
  },
  ringEmoji: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
  },
  logo: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: '-0.8px',
    color: 'var(--text-1)',
    marginTop: 4,
  },
  tagline: {
    fontSize: 14,
    color: 'var(--text-3)',
  },
  stepHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text-1)',
    letterSpacing: '-0.3px',
  },
  back: {
    width: 32,
    height: 32,
    borderRadius: 16,
    background: 'var(--surface-3)',
    border: 'none',
    color: 'var(--text-2)',
    fontSize: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  err: {
    color: 'var(--red)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
}
